const loginForm = document.getElementById('loginForm');
const loginDiv = document.getElementById('loginDiv');
const studentDiv = document.getElementById('studentDiv');
const wardenDiv = document.getElementById('wardenDiv');
const tabs = studentDiv.querySelectorAll('.tab');
const tabContents = studentDiv.querySelectorAll('.tab-content');

let complaints = [];

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(tc => tc.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Login logic
loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const pwd = document.getElementById('password').value;

    if(id==='S123' && pwd==='student123'){
        loginDiv.style.display='none';
        studentDiv.style.display='block';
        renderStudentTable();
    } else if(id==='W001' && pwd==='warden123'){
        loginDiv.style.display='none';
        wardenDiv.style.display='block';
        renderWardenTable();
    } else alert('Invalid credentials');
});

// Submit complaint
document.getElementById('complaintForm').addEventListener('submit', e=>{
    e.preventDefault();
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value;
    const room = document.getElementById('room').value;

    complaints.push({id:Date.now(), student:'S123', room, type, desc, status:'Pending'});
    e.target.reset();
    renderStudentTable();
    renderWardenTable();
});

// Render student table
function renderStudentTable(){
    const tbody = document.getElementById('studentTable').querySelector('tbody');
    tbody.innerHTML = '';
    complaints.filter(c=>c.student==='S123').forEach(c=>{
        const statusClass = getStatusClass(c.status);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${c.type}</td><td>${c.desc}</td><td><span class="${statusClass}">${c.status}</span></td>`;
        tbody.appendChild(tr);
    });
}

// Render warden table
function renderWardenTable(){
    const tbody = document.getElementById('wardenTable').querySelector('tbody');
    tbody.innerHTML = '';

    const filterType = document.getElementById('filterType').value;
    const filterStatus = document.getElementById('filterStatus').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    complaints.filter(c=>{
        return (filterType==='' || c.type===filterType) &&
               (filterStatus==='' || c.status===filterStatus) &&
               (c.student.toLowerCase().includes(search) || c.room.toLowerCase().includes(search));
    }).forEach(c=>{
        const statusClass = getStatusClass(c.status);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${c.student}</td><td>${c.room}</td><td>${c.type}</td><td>${c.desc}</td><td><span class="${statusClass}">${c.status}</span></td>
        <td>
            ${c.status!=='In Progress'?'<button class="btn progress" onclick="updateStatus('+c.id+','In Progress')">In Progress</button>':''}
            ${c.status!=='Resolved'?'<button class="btn resolve" onclick="updateStatus('+c.id+','Resolved')">Resolve</button>':''}
        </td>`;
        tbody.appendChild(tr);
    });
}

// Update status
function updateStatus(id, newStatus){
    const c = complaints.find(c=>c.id===id);
    if(c) c.status=newStatus;
    renderStudentTable();
    renderWardenTable();
}

// Get status CSS class
function getStatusClass(status){
    if(status==='Pending') return 'status-pending';
    if(status==='In Progress') return 'status-progress';
    if(status==='Resolved') return 'status-resolved';
    return '';
}

// Filters
document.getElementById('filterType').addEventListener('change', renderWardenTable);
document.getElementById('filterStatus').addEventListener('change', renderWardenTable);
document.getElementById('searchInput').addEventListener('input', renderWardenTable);
