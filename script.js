document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("complaintForm");
  const tableBody = document.querySelector("#complaintsTable tbody");

  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  function renderTable() {
    tableBody.innerHTML = "";
    complaints.forEach((c, index) => {
      const row = `<tr>
        <td>${index + 1}</td>
        <td>${c.name}</td>
        <td>${c.roomNo}</td>
        <td>${c.block}</td>
        <td>${c.type}</td>
        <td>${c.details}</td>
        <td><span class="status pending">${c.status}</span></td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roomNo = document.getElementById("roomNo").value.trim();
    const block = document.getElementById("block").value;
    let type = document.getElementById("complaintType").value;
    const custom = document.getElementById("customComplaint").value.trim();
    const details = document.getElementById("complaintDetails").value.trim();

    if (type === "Other" && custom) {
      type = custom;
    }

    const complaint = {
      name,
      roomNo,
      block,
      type,
      details,
      status: "Pending"
    };

    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    renderTable();
    form.reset();
  });

  renderTable();
});
