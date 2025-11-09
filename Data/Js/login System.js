// Login Page Styling System
function LoginStyling() {
  let form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value;

    if (username === "" || password === "" || role === "") {
      alert("من فضلك املأ جميع الحقول!");
      return;
    }

    alert(`مرحبًا بعودتك يا ${role} ${username}!`);
    localStorage.setItem("loggedInUser", role);

    setTimeout(() => {
      window.location.replace("../Html/PEP.html");
    }, 1000);
  });
};

// Helper: show specific navbar buttons by ID
function showTabs(ids) {
  ids.forEach((id) => {
    let el = document.getElementById(id);
    if (el) el.style.display = "inline-block";
  });
}

// Animate visible buttons
function animateButtons() {
  const visibleButtons = document.querySelectorAll(".tab-btn:not([style*='display: none'])");

  visibleButtons.forEach((btn, index) => {
    btn.style.opacity = 0;
    btn.style.transform = "translateY(-10px)";
    setTimeout(() => {
      btn.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease";
      btn.style.opacity = 1;
      btn.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Role-based Navbar Visibility
function InnerPEPSetting() {
  const role = localStorage.getItem("loggedInUser");
  const allButtons = document.querySelectorAll(".tab-btn");

  const rolesTabs = {
    Doctor: ["Main", "Doctor", "Doctor-File", "Pharmacy", "Radiology", "Appointments", "Dashboard", "logout-btn"],
    Patient: ["Main", "patient", "Appointments", "Doctor-On_call", "Wait-Times", "logout-btn"],
    Admin: ["Main", "Reception", "Doctor", "Pharmacy", "Radiology", "Billing", "Dashboard", "logout-btn"],
  };

  // Hide all first
  allButtons.forEach((btn) => (btn.style.display = "none"));

  // Show according to role
  showTabs(rolesTabs[role] || ["Main"]);

  animateButtons();
}

// Auto-run on PEP page
if (window.location.pathname.toLowerCase().includes("pep.html")) {
  window.addEventListener("DOMContentLoaded", InnerPEPSetting);
}

// Logout System
function LogoutSystem() {
  localStorage.removeItem("loggedInUser");
  window.location.replace("../Html/Login-Form.html");
}
