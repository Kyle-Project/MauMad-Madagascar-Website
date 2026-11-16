// Set this to a form service URL (e.g. Formspree) to receive enquiries by email.
const FORM_ENDPOINT = "";

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

// "Ask about this tour" pre-selects the tour in the form
const tourSelect = document.getElementById("tour-select");
document.querySelectorAll(".card-link[data-tour]").forEach((link) => {
  link.addEventListener("click", () => {
    tourSelect.value = link.dataset.tour;
  });
});

// Enquiry form
const form = document.getElementById("enquiry-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = "Please enter your name and a valid email address.";
    status.classList.add("error");
    return;
  }

  if (!FORM_ENDPOINT) {
    status.textContent = "Enquiries aren't connected yet. Please check back soon.";
    status.classList.add("error");
    return;
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    status.textContent = `Thanks, ${name}! We'll reply within two working days.`;
    status.classList.add("ok");
  } catch {
    status.textContent = "Something went wrong sending your enquiry. Please try again.";
    status.classList.add("error");
  }
});
