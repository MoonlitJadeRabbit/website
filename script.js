const form = document.getElementById("my-form");
const status = document.getElementById("my-form-status");
const submitButton = document.getElementById("my-form-button");

function setStatus(message, type) {
  if (!status) return;
  status.textContent = message;
  status.classList.remove("is-success", "is-error", "is-sending");
  if (type) status.classList.add(type);
}

function setNextRedirectUrl() {
  const nextInput = document.getElementById("form-next-url");
  if (!nextInput) return;
  const base = `${window.location.origin}${window.location.pathname}`;
  nextInput.value = `${base}?sent=1#contact`;
}

function showSentFromRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") !== "1") return;
  setStatus("Email sent.", "is-success");
  params.delete("sent");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${window.location.hash}${
    nextQuery ? `?${nextQuery}` : ""
  }`;
  window.history.replaceState({}, "", nextUrl);
}

setNextRedirectUrl();
showSentFromRedirect();

if (form) {
  form.addEventListener("submit", (event) => {
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value.trim()) {
      event.preventDefault();
      setStatus("", null);
      form.reset();
      return;
    }

    setNextRedirectUrl();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }
    setStatus("Sending…", "is-sending");

    // Let the browser POST to FormSubmit (works on GitHub Pages; fetch/AJAX often does not).
  });
}
