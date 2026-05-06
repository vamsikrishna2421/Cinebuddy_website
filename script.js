const requestForm = document.querySelector("#request");
const quickWhatsApp = document.querySelector("#quickWhatsApp");
const cineBuddyWhatsApp = "17743141427";
const feedbackCards = [...document.querySelectorAll(".feedback-card")];
const feedbackProgress = document.querySelector(".feedback-progress");
const counterEls = [...document.querySelectorAll("[data-count-to]")];
let feedbackIndex = 0;
let feedbackTimer;
const feedbackDuration = 5200;

const buildMessage = (data) => {
  const lines = [
    "Hi CineBuddy USA, I want to request discounted Regal movie tickets.",
    "",
    `Movie: ${data.get("movie")}`,
    `Regal theater: ${data.get("theater")}`,
    `Date: ${data.get("date")}`,
    `Showtime: ${data.get("time")}`,
    `Tickets: ${data.get("tickets")}`,
    `Contact: ${data.get("contact")}`,
  ];

  const notes = data.get("notes")?.trim();
  if (notes) {
    lines.push(`Notes: ${notes}`);
  }

  return lines.join("\n");
};

requestForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!requestForm.reportValidity()) {
    return;
  }

  const data = new FormData(requestForm);
  const message = encodeURIComponent(buildMessage(data));
  window.open(`https://wa.me/${cineBuddyWhatsApp}?text=${message}`, "_blank", "noopener,noreferrer");
});

quickWhatsApp?.addEventListener("click", () => {
  quickWhatsApp.blur();
});

const restartProgress = () => {
  if (!feedbackProgress) {
    return;
  }

  feedbackProgress.classList.remove("is-running");
  void feedbackProgress.offsetWidth;
  feedbackProgress.classList.add("is-running");
};

const restartFeedbackTimer = () => {
  window.clearTimeout(feedbackTimer);
  restartProgress();
  feedbackTimer = window.setTimeout(() => {
    showFeedback(feedbackIndex + 1);
  }, feedbackDuration);
};

const showFeedback = (nextIndex) => {
  if (!feedbackCards.length) {
    return;
  }

  feedbackCards[feedbackIndex].classList.remove("is-active");
  feedbackIndex = (nextIndex + feedbackCards.length) % feedbackCards.length;
  feedbackCards[feedbackIndex].classList.add("is-active");
  restartFeedbackTimer();
};

document.querySelectorAll("[data-feedback]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.feedback === "next" ? 1 : -1;
    showFeedback(feedbackIndex + direction);
  });
});

if (feedbackCards.length) {
  feedbackProgress?.style.setProperty("--feedback-duration", `${feedbackDuration}ms`);
  restartFeedbackTimer();
}

const animateCounter = (element) => {
  const target = Number(element.dataset.countTo);
  const duration = 950;
  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    }
  };

  window.requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count-to]").forEach((counter) => {
          if (!counter.dataset.counted) {
            counter.dataset.counted = "true";
            animateCounter(counter);
          }
        });
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((section) => {
    revealObserver.observe(section);
  });
} else {
  document.querySelectorAll(".reveal-on-scroll").forEach((section) => {
    section.classList.add("is-visible");
  });
  counterEls.forEach(animateCounter);
}
