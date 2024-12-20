// Get the DOM elements
const nameInput = document.getElementById("name-input");
const submitButton = document.getElementById("submit-button");
const welcomeMessage = document.getElementById("welcome-message");
const userScore = document.getElementById("user-score");
const leaderboardList = document.getElementById("leaderboard");

// Check if a user has already entered their name
document.addEventListener("DOMContentLoaded", () => {
  const storedName = localStorage.getItem("userName");

  if (storedName) {
    // If user is stored, show their info and fetch their score
    welcomeMessage.textContent = `Welcome back, ${storedName}`;
    fetchUserData(storedName);
  }
  fetchLeaderboard();
});

// Submit button event
submitButton.addEventListener("click", () => {
  const userName = nameInput.value.trim();

  if (userName) {
    // Store name in localStorage for future visits
    localStorage.setItem("userName", userName);
    welcomeMessage.textContent = `Welcome, ${userName}`;
    fetchUserData(userName);
  } else {
    alert("Please enter your name.");
  }
});

// Fetch user data from the backend
function fetchUserData(userName) {
  fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      userScore.textContent = data.score;
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

// Fetch leaderboard data from the backend
function fetchLeaderboard() {
  fetch("http://localhost:5000/leaderboard")
    .then((response) => response.json())
    .then((data) => {
      leaderboardList.innerHTML = ""; // Clear the leaderboard
      data.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name} - ${user.score}`;
        leaderboardList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching leaderboard:", error));
}
