const form = document.getElementById("my-form");
const status = document.getElementById("my-form-status");
const submitButton = document.getElementById("my-form-button");

const CONTACT_EMAIL = "junye.zhou@mail.utoronto.ca";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

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

function formSubmitSucceeded(response, data) {
  if (!response.ok) return false;
  if (data && typeof data === "object") {
    if (data.success) return true;
    if (typeof data.message === "string" && /thank/i.test(data.message)) return true;
  }
  return response.status >= 200 && response.status < 300;
}

setNextRedirectUrl();
showSentFromRedirect();

if (form && status) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value.trim()) {
      setStatus("", null);
      form.reset();
      return;
    }

    const email = form.email?.value?.trim() || "";
    const message = form.message?.value?.trim() || "";

    if (!email || !message) {
      setStatus("Failed to send. Fill in both fields.", "is-error");
      return;
    }

    const formData = new FormData(form);
    formData.set("_replyto", email);

    const originalLabel = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }
    setStatus("Sending…", "is-sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (formSubmitSucceeded(response, data)) {
        setStatus("Email sent.", "is-success");
        form.reset();
        return;
      }

      const serverMessage =
        typeof data.message === "string" ? data.message : "";

      if (/activate/i.test(serverMessage)) {
        setStatus(
          "Almost ready: check junye.zhou@mail.utoronto.ca for a FormSubmit activation link, click it once, then try again.",
          "is-error"
        );
        return;
      }

      throw new Error(serverMessage || "Form submit rejected");
    } catch {
      setStatus(
        "Failed to send. Use the email link above, or try again in a moment.",
        "is-error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}
