/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('guide-audio');
    const playBtn = document.getElementById('play-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const statusText = document.getElementById('status-text');

    if (audio && playBtn) {
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                updateUI(true);
            } else {
                audio.pause();
                updateUI(false);
            }
        });

        // 音声終了時にUIをリセット
        audio.addEventListener('ended', function() {
            updateUI(false);
            statusText.textContent = "再生終了 / Finished";
        });
    }

    function updateUI(isPlaying) {
        if (isPlaying) {
            btnText.textContent = "一時停止 / Pause";
            btnIcon.textContent = "⏸";
            statusText.textContent = "再生中 / Playing...";
            playBtn.style.backgroundColor = "#e74c3c"; // 停止時は赤系で注意喚起
        } else {
            btnText.textContent = "音声を再生 / Play Audio";
            btnIcon.textContent = "▶";
            statusText.textContent = "待機中 / Ready";
            playBtn.style.backgroundColor = "#005eb8"; // 再生可能時は青
        }
    }

    // Sentence-level playback (per line)
    const sentenceButtons = document.querySelectorAll('.sentence-play');
    let sentenceAudio = null;

    sentenceButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const li = btn.closest('.script-item');
            const src = li ? li.getAttribute('data-audio') : null;
            if (!src) return;

            // Stop main audio if playing
            if (audio && !audio.paused) {
                audio.pause();
                updateUI(false);
            }

            // Stop previous sentence audio
            if (sentenceAudio) {
                sentenceAudio.pause();
                sentenceAudio.currentTime = 0;
            }

            sentenceAudio = new Audio(src);
            sentenceAudio.play();
        });
    });

});
