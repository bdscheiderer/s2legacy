const targetDate = new Date("2026-05-15T18:00:00-05:00");

let prevValues = { days: null, hours: null, minutes: null, seconds: null };

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.querySelector(".footer").textContent = "Session has ended";
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

  // Update only changed values + trigger flicker
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

setInterval(updateCountdown, 1000);
updateCountdown(); // initial run