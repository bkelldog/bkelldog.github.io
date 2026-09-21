(() => {
  const toggle = document.querySelector("[data-lang-toggle]");
  if (!toggle) return;

  const options = Array.from(toggle.querySelectorAll("[data-lang]"));
  const underline = toggle.querySelector(".underline");
  const sections = Array.from(document.querySelectorAll(".lang"));

  const DEFAULT_LANG = "en";

  function showLanguage(lang) {
    // Toggle content visibility
    sections.forEach(section => {
      section.hidden = !section.classList.contains(`lang-${lang}`);
    });

    // Toggle active state
    options.forEach(option => {
      option.classList.toggle("active", option.dataset.lang === lang);
    });

    // Move underline
    const active = options.find(o => o.dataset.lang === lang);
    if (active) moveUnderline(active);
  }

  function moveUnderline(el) {
    underline.style.width = `${el.offsetWidth}px`;
    underline.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  // Event delegation (one listener instead of many)
  toggle.addEventListener("click", e => {
    const target = e.target.closest("[data-lang]");
    if (!target) return;
    showLanguage(target.dataset.lang);
  });

  // Keyboard accessibility
  toggle.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target.closest("[data-lang]");
      if (target) {
        e.preventDefault();
        showLanguage(target.dataset.lang);
      }
    }
  });
  
  showLanguage(DEFAULT_LANG);
})();