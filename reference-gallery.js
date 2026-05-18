(function () {
  document.querySelectorAll("[data-reference-gallery]").forEach((gallery) => {
    const slides = Array.from(
      gallery.querySelectorAll(".reference-gallery-slide")
    );
    if (slides.length < 2) return;

    const prevButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    const counter = gallery.querySelector("[data-gallery-counter]");
    let index = 0;

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === index;
        slide.classList.toggle("is-active", isActive);
        slide.hidden = !isActive;
      });
      if (counter) {
        counter.textContent = `${index + 1} / ${slides.length}`;
      }
    }

    prevButton?.addEventListener("click", () => show(index - 1));
    nextButton?.addEventListener("click", () => show(index + 1));

    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });

    show(0);
  });
})();
