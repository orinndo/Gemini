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
});
