/**
 * Simple audio controller:
 * - Tap a phrase card to play its audio.
 * - Stops any other playing audio before starting a new one.
 */
let currentAudio = null;

function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (!audio) return;

  // If tapping the same item, toggle play/pause.
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  if (audio.paused) {
    audio.play().catch(() => {
      // Autoplay might be blocked; user interaction is required.
      // Since this is called by a click, it should generally work.
    });
    currentAudio = audio;
  } else {
    audio.pause();
    currentAudio = null;
  }
}

// Optional: stop tracking when finished
document.addEventListener("ended", (e) => {
  if (e.target && e.target.tagName === "AUDIO" && e.target === currentAudio) {
    currentAudio = null;
  }
}, true);
