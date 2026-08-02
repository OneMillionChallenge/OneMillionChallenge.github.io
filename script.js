// ---------------------------------------------------------------
// 1. Configure your social links here — replace the placeholder
//    URLs below with your real Instagram / TikTok / YouTube pages.
// ---------------------------------------------------------------
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/million_numbers_challenge",
  tiktok: "https://tiktok.com/@one_million_challenge",
  youtube: "https://youtube.com/@One.Million.Challenge"
};

document.querySelectorAll("[data-social]").forEach((link) => {
  const key = link.getAttribute("data-social");
  if (SOCIAL_LINKS[key]) {
    link.setAttribute("href", SOCIAL_LINKS[key]);
  }
});

// ---------------------------------------------------------------
// 2. Footer year
// ---------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------
// 3. Odometer hero animation — ticks digits up to 1,000,000 once,
//    then settles. Runs on load, respects reduced-motion.
// ---------------------------------------------------------------
(function animateOdometer() {
  const el = document.getElementById("odometer");
  if (!el) return;

  const digitsEls = Array.from(el.querySelectorAll(".odometer__digit"));
  const target = "1000000";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    target.split("").forEach((d, i) => (digitsEls[i].textContent = d));
    return;
  }

  const duration = 1800; // ms
  const start = performance.now();

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const current = Math.floor(eased * 1000000);
    const str = String(current).padStart(7, "0");

    str.split("").forEach((d, i) => {
      digitsEls[i].textContent = d;
    });

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      target.split("").forEach((d, i) => (digitsEls[i].textContent = d));
    }
  }

  requestAnimationFrame(frame);
})();
