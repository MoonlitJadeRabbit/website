(function () {
  const arrowPrev =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 6l-6 6 6 6"></path></svg>';
  const arrowNext =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6l6 6-6 6"></path></svg>';

  function convertFigureGrids() {
    document.querySelectorAll(".figure-grid").forEach((grid) => {
      const figures = Array.from(
        grid.querySelectorAll(":scope > figure, :scope > .portfolio-figure")
      );
      if (figures.length < 2) {
        return;
      }

      const label =
        grid.dataset.galleryLabel ||
        grid.getAttribute("aria-label") ||
        "Figures";

      const gallery = document.createElement("section");
      gallery.className = "reference-gallery";
      gallery.setAttribute("data-reference-gallery", "");
      gallery.tabIndex = 0;
      gallery.setAttribute("aria-roledescription", "carousel");
      gallery.setAttribute("aria-label", label);

      const toolbar = document.createElement("div");
      toolbar.className = "reference-gallery-toolbar";
      toolbar.innerHTML =
        '<p class="reference-gallery-label"></p><p class="reference-gallery-counter" data-gallery-counter>1 / ' +
        figures.length +
        "</p>";
      toolbar.querySelector(".reference-gallery-label").textContent = label;

      const frame = document.createElement("div");
      frame.className = "reference-gallery-frame";

      const prevButton = document.createElement("button");
      prevButton.type = "button";
      prevButton.className = "reference-gallery-arrow";
      prevButton.setAttribute("data-gallery-prev", "");
      prevButton.setAttribute("aria-label", "Previous figure");
      prevButton.innerHTML = arrowPrev;

      const viewport = document.createElement("div");
      viewport.className = "reference-gallery-viewport";

      figures.forEach((figure, index) => {
        const img = figure.querySelector("img");
        if (!img) {
          return;
        }

        const slide = document.createElement("figure");
        slide.className = "reference-gallery-slide";
        if (index === 0) {
          slide.classList.add("is-active");
        } else {
          slide.hidden = true;
        }

        const media = document.createElement("div");
        media.className = "reference-gallery-media";
        const slideImg = img.cloneNode(true);
        if (!slideImg.getAttribute("loading")) {
          slideImg.loading = "lazy";
        }
        media.appendChild(slideImg);

        slide.appendChild(media);

        const caption = figure.querySelector("figcaption");
        if (caption) {
          const slideCaption = document.createElement("figcaption");
          slideCaption.innerHTML = caption.innerHTML;
          slide.appendChild(slideCaption);
        }

        viewport.appendChild(slide);
      });

      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "reference-gallery-arrow";
      nextButton.setAttribute("data-gallery-next", "");
      nextButton.setAttribute("aria-label", "Next figure");
      nextButton.innerHTML = arrowNext;

      frame.append(prevButton, viewport, nextButton);

      const hint = document.createElement("p");
      hint.className = "reference-gallery-hint";
      hint.textContent =
        "Arrow keys work when the gallery is focused. Click an image to zoom.";

      gallery.append(toolbar, frame, hint);
      grid.replaceWith(gallery);
    });
  }

  function initGalleries() {
    document.querySelectorAll("[data-reference-gallery]").forEach((gallery) => {
      const slides = Array.from(
        gallery.querySelectorAll(".reference-gallery-slide")
      );
      if (slides.length < 2) {
        return;
      }

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
  }

  convertFigureGrids();
  initGalleries();
})();
