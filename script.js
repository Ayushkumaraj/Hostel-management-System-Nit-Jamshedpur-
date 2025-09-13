let complaints = [];
let currentUser = null;
let complaintId = 1;

function login() {
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;

  if (userId === 'S123' && password === 'student123') {
    currentUser = 'student';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('student-section').style.display = 'block';
  } else if (userId === 'W001' && password === 'warden123') {
    currentUser = 'warden';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('warden-section').style.display = 'block';
    renderAllComplaints();
  } else {
    alert('❌ Invalid credentials!');
  }
}

function submitComplaint() {
  const text = document.getElementById('complaintText').value.trim();
  if (text === '') {
    alert('Please enter a complaint!');
    return;
  }

  const newComplaint = {
    id: complaintId++,
    text,
    status: 'pending'
  };

  complaints.push(newComplaint);
  document.getElementById('complaintText').value = '';
  alert('✅ Complaint submitted successfully!');
  renderStudentComplaints();
}

function renderStudentComplaints() {
  const tbody = document.querySelector('#studentComplaints tbody');
  tbody.innerHTML = '';
  complaints.forEach(c => {
    const row = `<tr>
      <td>${c.id}</td>
      <td>${c.text}</td>
      <td><span class="status ${c.status}">${c.status}</span></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function renderAllComplaints() {
  const tbody = document.querySelector('#allComplaints tbody');
  tbody.innerHTML = '';
  complaints.forEach(c => {
    const row = `<tr>
      <td>${c.id}</td>
      <td>${c.text}</td>
      <td><span class="status ${c.status}">${c.status}</span></td>
      <td>
        <button onclick="updateComplaint(${c.id}, 'inprogress')">In Progress</button>
        <button onclick="updateComplaint(${c.id}, 'resolved')">Resolved</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function updateComplaint(id, status) {
  const complaint = complaints.find(c => c.id === id);
  if (complaint) {
    complaint.status = status;
    renderStudentComplaints();
    renderAllComplaints();
  }
}
