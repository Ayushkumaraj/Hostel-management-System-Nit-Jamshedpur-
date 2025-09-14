
const students = {
  "2024UGPI001": "student123",
  "2024UGPI002": "student123",
  "2024UGPI003": "student123",
  "2024UGPI004": "student123",
  "2024UGPI005": "student123",
  "2024UGPI006": "student123",
  "2024UGPI007": "student123",
  "2024UGPI008": "student123",
  "2024UGPI009": "student123",
  "2024UGPI010": "student123",
  "2024UGPI011": "student123",
  "2024UGPI012": "student123",
  "2024UGPI013": "student123",
  "2024UGPI014": "student123",
  "2024UGPI015": "student123",
  "2024UGPI016": "student123",
  "2024UGPI017": "student123",
  "2024UGPI018": "student123",
  "2024UGPI019": "student123",
  "2024UGPI020": "student123",
  "2024UGPI021": "student123",
  "2024UGPI022": "student123",
  "2024UGPI023": "student123",
  "2024UGPI024": "student123",
  "2024UGPI025": "student123",
  "2024UGPI026": "student123",
  "2024UGPI027": "student123",
  "2024UGPI028": "student123",
  "2024UGPI029": "student123",
  "2024UGPI030": "student123",
  "2024UGPI031": "student123",
  "2024UGPI032": "student123",
  "2024UGPI033": "student123",
  "2024UGPI034": "student123",
  "2024UGPI035": "student123",
  "2024UGPI036": "student123",
  "2024UGPI037": "student123",
  "2024UGPI038": "student123",
  "2024UGPI039": "student123",
  "2024UGPI040": "student123",
  "2024UGPI041": "student123",
  "2024UGPI042": "student123",
  "2024UGPI043": "student123",
  "2024UGPI044": "student123",
  "2024UGPI045": "student123",
  "2024UGPI046": "student123",
  "2024UGPI047": "student123",
  "2024UGPI048": "student123",
  "2024UGPI049": "student123",
  "2024UGPI050": "student123",
  "2024UGPI051": "student123",
  "2024UGPI052": "student123",
  "2024UGPI053": "student123",
  "2024UGPI054": "student123",
  "2024UGPI055": "student123",
  "2024UGPI056": "student123",
  "2024UGPI057": "student123",
  "2024UGPI058": "student123",
  "2024UGPI059": "student123",
  "2024UGPI060": "student123",
  "2024UGPI061": "student123",
  "2024UGPI062": "student123"
};

const warden = { "W001": "warden123" };

let currentUser = null;
let complaints = [];

// Load complaints from localStorage
function loadData() {
  complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
}

// Save complaints to localStorage
function saveData() {
  localStorage.setItem('complaints', JSON.stringify(complaints));
}

// Login logic
function login() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  if (students[id] && students[id] === pass) {
    currentUser = id;
    localStorage.setItem("currentUser", currentUser);
    window.location.href = "complaint.html";
  } else if (warden[id] && warden[id] === pass) {
    currentUser = id;
    localStorage.setItem("currentUser", currentUser);
    window.location.href = "complaint.html";
  } else {
    error.textContent = "Invalid ID or Password!";
  }
}

window.onload = function () {
  if (window.location.pathname.endsWith('complaint.html')) {
    currentUser = localStorage.getItem("currentUser");
    loadData();

    if (warden[currentUser]) {
      document.getElementById("wardenPage").classList.remove("hidden");
      loadWardenComplaints();
    } else {
      document.getElementById("studentPage").classList.remove("hidden");
      loadStudentComplaints();
    }
  }
};

// Submit a complaint
function submitComplaint() {
  const name = document.getElementById("studentName").value;
  const room = document.getElementById("studentRoom").value;
  const floor = document.getElementById("studentFloor").value;
  const type = document.getElementById("complaintType").value;
  const text = document.getElementById("complaintText").value;

  if (!name || !room || !text) {
    alert("Please fill all fields");
    return;
  }

  const complaint = {
    id: Date.now(),
    user: currentUser,
    name,
    room,
    floor,
    type,
    text,
    status: "Pending"
  };

  complaints.push(complaint);
  saveData();
  loadStudentComplaints();
  document.getElementById("complaintText").value = "";
}

// Display student complaints
function loadStudentComplaints() {
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

  complaints
    .filter(c => c.user === currentUser && c.status !== 'Completed')
    .forEach(c => {
      table.innerHTML += `
        <tr>
          <td>\${c.name}</td>
          <td>\${c.room}</td>
          <td>\${c.floor}</td>
          <td>\${c.type}</td>
          <td>\${c.text}</td>
          <td>\${c.status}</td>
        </tr>`;
    });
}

// Display all complaints for warden
function loadWardenComplaints() {
  const table = document.getElementById("wardenComplaints");
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Room</th>
      <th>Floor</th>
      <th>Type</th>
      <th>Complaint</th>
      <th>Status</th>
      <th>Action</th>
    </tr>`;

  complaints.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>\${c.name}</td>
        <td>\${c.room}</td>
        <td>\${c.floor}</td>
        <td>\${c.type}</td>
        <td>\${c.text}</td>
        <td>\${c.status}</td>
        <td>
          <button onclick="updateStatus(\${c.id}, 'In Progress')">In Progress</button>
          <button onclick="updateStatus(\${c.id}, 'Completed')">Completed</button>
        </td>
      </tr>`;
  });
}

// Update complaint status
function updateStatus(id, status) {
  const complaint = complaints.find(c => c.id === id);
  if (complaint) {
    complaint.status = status;
  }

  saveData();
  loadWardenComplaints();
  loadStudentComplaints();
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
