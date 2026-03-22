const profiles = {
  reef: {
    id: "P-001",
    name: "Alex Reef",
    password: "reef123",
    bio: "Profile ID: P-001 (placeholder).",
    messages: ["Welcome to Alex’s message board!"],
  },
  marina: {
    id: "P-002",
    name: "Marina Shore",
    password: "shore456",
    bio: "Profile ID: P-002 (placeholder).",
    messages: ["Say hi to Marina here!"],
  },
};

const selectEl = document.getElementById("profile-select");
const pwdEl = document.getElementById("profile-password");
const loginBtn = document.getElementById("login-btn");
const loginStatusEl = document.getElementById("login-status");
const loginSection = document.getElementById("login-section");
const messageSection = document.getElementById("message-section");
const profileTitleEl = document.getElementById("profile-title");
const profileMetaEl = document.getElementById("profile-meta");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const logoutBtn = document.getElementById("logout-btn");
const messageListEl = document.getElementById("message-list");

let activeProfile = null;

function populateProfileChoice() {
  selectEl.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "-- Select profile --";
  selectEl.appendChild(placeholder);

  Object.keys(profiles).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${profiles[key].name} (${profiles[key].id})`;
    selectEl.appendChild(option);
  });
}

function renderMessages() {
  messageListEl.innerHTML = "";
  activeProfile.messages.forEach((text, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${text}`;
    messageListEl.appendChild(li);
  });
}

function showError(msg) {
  loginStatusEl.textContent = msg;
  loginStatusEl.classList.add("error");
}

function clearStatus() {
  loginStatusEl.textContent = "";
  loginStatusEl.classList.remove("error");
}

loginBtn.addEventListener("click", () => {
  const selected = selectEl.value;
  const password = pwdEl.value.trim();

  if (!selected) {
    showError("Please select a profile.");
    return;
  }

  if (!password) {
    showError("Please enter the password.");
    return;
  }

  const profile = profiles[selected];
  if (!profile) {
    showError("Unknown profile selected.");
    return;
  }

  if (password !== profile.password) {
    showError("Incorrect password. Try again.");
    return;
  }

  activeProfile = profile;
  clearStatus();
  loginSection.classList.add("hidden");
  messageSection.classList.remove("hidden");

  profileTitleEl.textContent = `${profile.name} (ID: ${profile.id})`;
  profileMetaEl.textContent = profile.bio;
  messageInput.value = "";
  renderMessages();
});

sendBtn.addEventListener("click", () => {
  if (!activeProfile) return;
  const text = messageInput.value.trim();
  if (!text) {
    alert("Enter a message before sending.");
    return;
  }

  activeProfile.messages.push(text);
  messageInput.value = "";
  renderMessages();
});

logoutBtn.addEventListener("click", () => {
  activeProfile = null;
  pwdEl.value = "";
  messageInput.value = "";
  clearStatus();
  messageSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

populateProfileChoice();
