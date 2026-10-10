const nameInput = document.getElementById("nameInput");
const dobInput = document.getElementById("dobInput");
const checkBtn = document.getElementById("checkBtn");
const resultCard = document.getElementById("resultCard");
const errorEl = document.getElementById("error");

checkBtn.addEventListener("click", validateAge);
dobInput.addEventListener("keypress", e => { if(e.key==="Enter") validateAge() });

function validateAge() {
  const name = nameInput.value.trim();
  const dobValue = dobInput.value;

  if (!name) {
    errorEl.innerText = "Please enter your name";
    return;
  }
  if (!dobValue) {
    errorEl.innerText = "Please select your date of birth";
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  if (dob > today) {
    errorEl.innerText = "Date of birth cannot be in the future";
    return;
  }

  errorEl.innerText = "";

  // Calculate age accurately
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  // Total days lived
  const diffTime = today - dob;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Next birthday
  let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
  const daysToBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));

  // Category
  let category = "";
  if (age < 13) category = "👶 Child";
  else if (age < 18) category = "🧑‍🎓 Teenager";
  else if (age < 35) category = "💼 Young Adult";
  else if (age < 60) category = "🧑‍💼 Adult";
  else category = "👴 Senior Citizen";

  // Update UI
  document.getElementById("ageNumber").innerText = age;
  document.getElementById("greeting").innerText = `Hello, ${name}!`;
  document.getElementById("category").innerText = category;
  document.getElementById("bornOn").innerText = dob.toLocaleDateString("en-NG", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  document.getElementById("totalDays").innerText = totalDays.toLocaleString() + " days";
  document.getElementById("nextBirthday").innerText = daysToBday === 0? "Today! 🎉" : `${daysToBday} days`;

  // Eligibility Checks (Nigeria standards)
  setCheck("voteCheck", age >= 18);
  setCheck("driveCheck", age >= 18);
  setCheck("ninCheck", age >= 16);
  setCheck("socialCheck", age >= 13);

  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth" });
}

function setCheck(id, allowed) {
  const el = document.getElementById(id).querySelector("b");
  if (allowed) {
    el.innerText = "✓ Allowed";
    el.className = "allowed";
  } else {
    el.innerText = "✕ Not Allowed";
    el.className = "denied";
  }
}

// Set max date to today
document.getElementById("dobInput").max = new Date().toISOString().split("T")[0];