// Phase 1 target
let targetDate = new Date("2026-05-15T18:00:00-05:00"); // CDT

// Phase 2 target & text
const nextTargetDate = new Date("2027-01-06T12:00:00-06:00"); // CST
const nextMainTitle   = "Countdown to Start of Session";
const nextSubTitle    = "104th General Assembly";
const nextFooter      = "Counting down to Wednesday, January 6, 2027, 12 PM CST";

let prevValues = { days: null, hours: null, minutes: null, seconds: null };
let isPhaseTwo = false;
let finishedTimer = null;

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    // Lock at zero
    document.getElementById("days").textContent    = "000";
    document.getElementById("hours").textContent   = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    // Apply red slow flicker to numbers only
    document.querySelectorAll(".number").forEach(el => {
      el.classList.add("finished");
    });

    // If first time hitting zero, start 15-second timer
    if (!isPhaseTwo && !finishedTimer) {
      finishedTimer = setTimeout(switchToPhaseTwo, 15000);
    }

    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const updates = {
    days: String(days).padStart(3, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0")
  };

  Object.keys(updates).forEach(key => {
    const el = document.getElementById(key);
    if (updates[key] !== prevValues[key]) {
      el.textContent = updates[key];
      el.classList.remove("updated");
      void el.offsetWidth; // force reflow to restart animation
      el.classList.add("updated");
    }
  });

  prevValues = updates;
}

function switchToPhaseTwo() {
  // Remove red flicker
  document.querySelectorAll(".number").forEach(el => {
    el.classList.remove("finished");
  });

  // Switch to next phase
  isPhaseTwo = true;
  targetDate = nextTargetDate;

  // Update text
  document.querySelector(".main-title").textContent = nextMainTitle;
  document.querySelector(".sub-title").textContent  = nextSubTitle;
  document.querySelector(".footer").textContent     = nextFooter;

  // Restart countdown immediately
  updateCountdown();
}

setInterval(updateCountdown, 1000);
updateCountdown(); // initial run