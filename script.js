const form = document.getElementById("my-form");
const status = document.getElementById("my-form-status");
const submitButton = document.getElementById("my-form-button");

const CONTACT_EMAIL = "junye.zhou@mail.utoronto.ca";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

function setStatus(message, type) {
  if (!status) return;
  status.textContent = message;
  status.classList.remove("is-success", "is-error");
  if (type) status.classList.add(type);
}

function showSentFromRedirect() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") !== "1" || !status) return;
  setStatus("Thanks! Your message was sent. I'll reply to the email you provided.", "is-success");
  params.delete("sent");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${window.location.hash}${
    nextQuery ? `?${nextQuery}` : ""
  }`;
  window.history.replaceState({}, "", nextUrl);
}

showSentFromRedirect();

if (form && status) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) {
      setStatus("", null);
      form.reset();
      return;
    }

    const formData = new FormData(form);
    const originalLabel = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }
    setStatus("Sending your message…", null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Form submit failed (${response.status})`);
      }

      setStatus(
        "Thanks! Your message was sent. I'll reply to the email you provided.",
        "is-success"
      );
      form.reset();
    } catch {
      setStatus(
        `Something went wrong. Please email me at ${CONTACT_EMAIL} instead.`,
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
