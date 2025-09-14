
const students = {
  "2024UGPI001": "student123",
  "2024UGPI002": "student123",
  "2024UGME001": "student123",
  "2024UGME002": "student123"
};

const warden = { "W001": "warden123" };

let currentUser = null;
let complaints = [];
let activeComplaints = [];

// Login
function login() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");
  const debugDiv = document.getElementById("debugLog");

  debugDiv.textContent = `Login Attempted with ID: ${id}, Password: ${pass}`;

  if (students[id] && students[id] === pass) {
    debugDiv.textContent += "\nStudent Login Successful";
    currentUser = id;
    window.location.href = "complaint.html";
    localStorage.setItem("currentUser", currentUser);
  } else if (warden[id] && warden[id] === pass) {
    debugDiv.textContent += "\nWarden Login Successful";
    currentUser = id;
    window.location.href = "complaint.html";
    localStorage.setItem("currentUser", currentUser);
  } else {
    debugDiv.textContent += "\nLogin Failed: Invalid ID or Password";
    error.textContent = "Invalid ID or Password!";
  }
}

window.onload = function () {
  if (window.location.pathname.endsWith('complaint.html')) {
    currentUser = localStorage.getItem("currentUser");
    if (currentUser in warden) {
      document.getElementById("wardenPage").classList.remove("hidden");
      loadWardenComplaints();
    } else {
      document.getElementById("studentPage").classList.remove("hidden");
      loadStudentComplaints();
    }
  }
};

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
  activeComplaints.push({ ...complaint });
  loadStudentComplaints();
  document.getElementById("complaintText").value = "";
}

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

  activeComplaints
    .filter(c => c.user === currentUser)
    .forEach(c => {
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
        <td>${c.name}</td>
        <td>${c.room}</td>
        <td>${c.floor}</td>
        <td>${c.type}</td>
        <td>${c.text}</td>
        <td>${c.status}</td>
        <td>
          <button onclick="updateStatus(${c.id}, 'In Progress')">In Progress</button>
          <button onclick="updateStatus(${c.id}, 'Completed')">Completed</button>
        </td>
      </tr>`;
  });
}

function updateStatus(id, status) {
  const complaint = complaints.find(c => c.id === id);
  if (complaint) {
    complaint.status = status;
  }

  if (status === 'Completed') {
    activeComplaints = activeComplaints.filter(c => c.id !== id);
  } else {
    const activeComplaint = activeComplaints.find(c => c.id === id);
    if (activeComplaint) {
      activeComplaint.status = status;
    }
  }

  loadWardenComplaints();
  loadStudentComplaints();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
