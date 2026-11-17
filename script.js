const BOOKING_EMAIL = "resa.maumad@gmail.com";

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Enquiry form: opens the visitor's email app with the details filled in
const form = document.getElementById("enquiry-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.className = "form-status";

  const f = form.elements;
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = "Please enter your name and a valid email address.";
    status.classList.add("error");
    return;
  }

  const subject = `Trip enquiry: ${f.trip.value}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Trip: ${f.trip.value}`,
    `Travellers: ${f.travellers.value}`,
    `Preferred dates: ${f.dates.value.trim() || "-"}`,
    "",
    f.message.value.trim(),
  ].join("\n");

  window.location.href =
    `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = `Your email app should open now. If it doesn't, write to ${BOOKING_EMAIL}.`;
  status.classList.add("ok");
});
