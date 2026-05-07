// Grab the contact form and the text area where feedback is shown.
const form = document.getElementById("my-form");
const status = document.getElementById("my-form-status");

if (form && status) {
  // Stop the page from trying to really submit anywhere for now.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Show a friendly message until a real backend or form service is added.
    status.textContent =
      "Template ready. Add your real email, social links, and form endpoint when you want to start receiving messages.";

    // Clear the form after the message appears.
    form.reset();
  });
}
