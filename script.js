let members = [];

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Add Member
document.getElementById("memberForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let plan = document.getElementById("plan").value;

    members.push({ name, age, plan });

    updateTable();
    updateDashboard();

    this.reset();
    alert("Member Added Successfully!");
});

function updateTable() {
    let table = document.getElementById("memberTable");
    table.innerHTML = "";

    members.forEach(member => {
        let row = `<tr>
            <td>${member.name}</td>
            <td>${member.age}</td>
            <td>${member.plan}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function updateDashboard() {
    document.getElementById("totalMembers").innerText = members.length;
}