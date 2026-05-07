const form = document.getElementById("my-form");
const status = document.getElementById("my-form-status");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.textContent =
      "Template ready. Add your real email, social links, and form endpoint when you want to start receiving messages.";

    form.reset();
  });
}
