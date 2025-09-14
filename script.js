let complaints = [];
let currentUser = null;

// Allowed credentials
const students = [
  "2024UGPI001","2024UGPI002","2024UGPI003",
  "2024UGME001","2024UGME002","2024UGME003"
];
const studentPassword = "student123";
const warden = { id: "W001", password: "warden123" };

function login() {
  const id = document.getElementById('userId').value.trim();
  const pw = document.getElementById('password').value.trim();

  if (students.includes(id) && pw === studentPassword) {
    currentUser = id;
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('student-section').classList.remove('hidden');
    renderStudentComplaints();
  } else if (id === warden.id && pw === warden.password) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('warden-section').classList.remove('hidden');
    renderWardenComplaints();
  } else {
    alert("Invalid credentials!");
  }
}

function submitComplaint() {
  const name = document.getElementById('studentName').value.trim();
  const room = document.getElementById('roomNo').value.trim();
  const block = document.getElementById('block').value;
  const type = document.getElementById('complaintType').value;
  const text = document.getElementById('complaintText').value.trim();

  if (!name || !room || !block || !type || !text) {
    alert("Please fill all fields!");
    return;
  }

  const complaint = {
    id: complaints.length + 1,
    name, room, block, type, text,
    status: "Pending",
    student: currentUser
  };
  complaints.push(complaint);
  renderStudentComplaints();
  renderWardenComplaints();
  document.getElementById('complaintText').value = "";
}

function renderStudentComplaints() {
  const tbody = document.getElementById('studentComplaints');
  tbody.innerHTML = "";
  complaints.filter(c => c.student === currentUser).forEach(c => {
    tbody.innerHTML += `<tr>
      <td>${c.id}</td><td>${c.name}</td><td>${c.room}</td><td>${c.block}</td>
      <td>${c.type}</td><td>${c.text}</td><td>${c.status}</td>
    </tr>`;
  });
}

function renderWardenComplaints() {
  const tbody = document.getElementById('wardenComplaints');
  tbody.innerHTML = "";
  complaints.forEach(c => {
    tbody.innerHTML += `<tr>
      <td>${c.id}</td><td>${c.name}</td><td>${c.room}</td><td>${c.block}</td>
      <td>${c.type}</td><td>${c.text}</td><td>${c.status}</td>
      <td>
        <button onclick="updateStatus(${c.id}, 'In Progress')">In Progress</button>
        <button onclick="updateStatus(${c.id}, 'Resolved')">Resolved</button>
      </td>
    </tr>`;
  });
}

function updateStatus(id, status) {
  const comp = complaints.find(c => c.id === id);
  if (comp) comp.status = status;
  renderWardenComplaints();
  renderStudentComplaints();
}