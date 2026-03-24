// Default Data
if (!localStorage.getItem("members")) {
    let defaultMembers = [
        { name: "Rahul Sharma", age: 25, plan: "Monthly", fee: 1000 },
        { name: "Amit Singh", age: 28, plan: "Quarterly", fee: 2500 },
        { name: "Priya Verma", age: 22, plan: "Monthly", fee: 1200 }
    ];

    let defaultAttendance = {
        "Rahul Sharma": [],
        "Amit Singh": [],
        "Priya Verma": []
    };

    let defaultFeedback = [];

    localStorage.setItem("members", JSON.stringify(defaultMembers));
    localStorage.setItem("attendance", JSON.stringify(defaultAttendance));
    localStorage.setItem("feedback", JSON.stringify(defaultFeedback));
}

let members = JSON.parse(localStorage.getItem("members"));
let attendance = JSON.parse(localStorage.getItem("attendance"));
let feedbacks = JSON.parse(localStorage.getItem("feedback"));

let currentUser = "";

// Save
function saveData() {
    localStorage.setItem("members", JSON.stringify(members));
    localStorage.setItem("attendance", JSON.stringify(attendance));
    localStorage.setItem("feedback", JSON.stringify(feedbacks));
}

// Login
function login() {
    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value;

    if (!username) return alert("Enter name");

    document.getElementById("loginPage").classList.add("hidden");

    if (role === "admin") {
        document.getElementById("adminPanel").classList.remove("hidden");
        updateAll();
    } else {
        currentUser = username;
        document.getElementById("userPanel").classList.remove("hidden");
        document.getElementById("userName").innerText = username;
        loadUserData();
    }
}

// Logout
function logout() {
    location.reload();
}

// Navigation
function show(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// Add Member
function addMember() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let plan = document.getElementById("plan").value;
    let fee = document.getElementById("fee").value;

    members.push({ name, age, plan, fee });
    attendance[name] = [];

    saveData();
    updateAll();
}

// Update All
function updateAll() {
    updateMembers();
    updateAttendance();
    updateFees();
    updateFeedback();

    document.getElementById("total").innerText = members.length;

    let totalRevenue = members.reduce((sum, m) => sum + Number(m.fee), 0);
    document.getElementById("revenue").innerText = totalRevenue;
}

// Members
function updateMembers() {
    let list = document.getElementById("memberList");
    list.innerHTML = "";

    members.forEach(m => {
        list.innerHTML += `<li class="card">${m.name} - ${m.plan} - ₹${m.fee}</li>`;
    });
}

// Attendance (Admin)
function updateAttendance() {
    let list = document.getElementById("attendanceList");
    list.innerHTML = "";

    members.forEach(m => {
        list.innerHTML += `
        <li class="card">
            ${m.name}
            <button onclick="markAttendance('${m.name}')">Present</button>
        </li>`;
    });
}

// Mark Attendance (Admin)
function markAttendance(name) {
    let date = new Date().toLocaleDateString();

    if (!attendance[name].includes(date)) {
        attendance[name].push(date);
        saveData();
        alert("Marked!");
    }
}

// Fees
function updateFees() {
    let list = document.getElementById("feesList");
    list.innerHTML = "";

    members.forEach(m => {
        list.innerHTML += `<li class="card">${m.name} - ₹${m.fee}</li>`;
    });
}

// Feedback (Admin)
function updateFeedback() {
    let list = document.getElementById("feedbackList");
    list.innerHTML = "";

    feedbacks.forEach(f => {
        list.innerHTML += `<li class="card">👤 ${f.user}: ${f.text}</li>`;
    });
}

// USER SIDE
function loadUserData() {
    let attList = document.getElementById("userAttendance");
    attList.innerHTML = "";

    if (attendance[currentUser]) {
        attendance[currentUser].forEach(d => {
            attList.innerHTML += `<li class="card">${d}</li>`;
        });
    }

    let user = members.find(m => m.name === currentUser);
    document.getElementById("userFee").innerText =
        user ? "₹" + user.fee : "Not Found";
}

// User Attendance
function userMarkAttendance() {
    let date = new Date().toLocaleDateString();

    if (!attendance[currentUser]) attendance[currentUser] = [];

    if (!attendance[currentUser].includes(date)) {
        attendance[currentUser].push(date);
        saveData();
        loadUserData();
        alert("Attendance Marked!");
    }
}

// Feedback
function submitFeedback() {
    let text = document.getElementById("feedbackInput").value;

    if (!text) return;

    feedbacks.push({ user: currentUser, text });

    saveData();
    document.getElementById("feedbackInput").value = "";
    alert("Feedback Submitted!");
}