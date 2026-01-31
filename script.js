/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    // --- Sentence-level playback (per line) ---
    // Use a single reusable <audio> element for better iOS Safari compatibility.
    const sentenceAudio = document.createElement('audio');
    sentenceAudio.id = 'sentence-audio';
    sentenceAudio.preload = 'auto';
    sentenceAudio.style.display = 'none';
    document.body.appendChild(sentenceAudio);

    // Visual feedback: highlight the last played line
    let lastActive = null;
    function setActive(li) {
        if (lastActive) lastActive.classList.remove('active');
        lastActive = li;
        if (lastActive) lastActive.classList.add('active');
    }

    function playSentence(src, li) {
        if (!src) return;
        // Stop current sentence audio
        sentenceAudio.pause();
        sentenceAudio.currentTime = 0;

        // Swap source and play
        sentenceAudio.src = src;
        const p = sentenceAudio.play();
        setActive(li);

        // If play() is blocked or file missing, give a clear hint.
        if (p && typeof p.catch === 'function') {
            p.catch(() => {
                alert('音声が再生できません。\nGitHub Pagesに audio フォルダが正しくアップロードされているか、ファイル名が一致しているか確認してください。');
            });
        }
    }

    document.querySelectorAll('.sentence-play').forEach((btn) => {
        btn.addEventListener('click', () => {
            const li = btn.closest('.script-item');
            const src = li ? li.getAttribute('data-audio') : null;
            playSentence(src, li);
        });
    });

    // Reset highlight when finished
    sentenceAudio.addEventListener('ended', () => {
        setActive(null);
    });
});
