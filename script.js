
const students = {
  "2024UGPI001": "student123",
  "2024UGPI002": "student123",
  "2024UGME001": "student123",
  "2024UGME002": "student123"
};

const warden = { "W001": "warden123" };

function login() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  if (students[id] && students[id] === pass) {
    localStorage.setItem('currentUser', id);
    localStorage.setItem('currentUserType', 'student');
    window.location.href = 'complaint.html';
  } else if (warden[id] && warden[id] === pass) {
    localStorage.setItem('currentUser', id);
    localStorage.setItem('currentUserType', 'warden');
    window.location.href = 'complaint.html';
  } else {
    error.textContent = "Invalid ID or Password!";
  }
}

function submitComplaint() {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserType = localStorage.getItem('currentUserType');

  if (currentUserType !== 'student') {
    alert('Only students can submit complaints!');
    return;
  }

  const name = document.getElementById("studentName").value;
  const room = document.getElementById("studentRoom").value;
  const floor = document.getElementById("studentFloor").value;
  const type = document.getElementById("complaintType").value;
  const text = document.getElementById("complaintText").value;

  if (!name || !room || !text) {
    alert("Please fill all fields");
    return;
  }

  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

  const complaint = {
    id: complaints.length + 1,
    user: currentUser,
    name,
    room,
    floor,
    type,
    text,
    status: "Pending"
  };

  complaints.push(complaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));
  loadStudentComplaints();
  document.getElementById("complaintText").value = "";
}

function loadStudentComplaints() {
  const currentUser = localStorage.getItem('currentUser');
  const currentUserType = localStorage.getItem('currentUserType');
  const table = document.getElementById("studentComplaints");
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Room</th>
      <th>Floor</th>
      <th>Type</th>
      <th>Complaint</th>
      <th>Status</th>
    </tr>`;

  const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

  const dataToShow = currentUserType === 'warden' ? complaints : complaints.filter(c => c.user === currentUser);

  dataToShow.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.room}</td>
        <td>${c.floor}</td>
        <td>${c.type}</td>
        <td>${c.text}</td>
        <td>${c.status}</td>
      </tr>`;
  });
}

function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentUserType');
  window.location.href = 'index.html';
}

window.onload = function () {
  if (document.getElementById("studentComplaints")) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
    loadStudentComplaints();
  }
};
