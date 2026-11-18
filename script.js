// Countdown, birthday background music, scroll reveals and WhatsApp sharing.
(() => {
  // 22 November 2026, 5:00 PM in India (UTC+05:30).
  const target = new Date('2026-11-22T17:00:00+05:30').getTime();
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes')
  };
  const note = document.getElementById('countdown-note');

  function updateCountdown() {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => { field.textContent = '00'; });
      note.textContent = "It's celebration time! Happy birthday, Atharv!";
      return;
    }
    const totalMinutes = Math.floor(remaining / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    fields.days.textContent = String(days).padStart(2, '0');
    fields.hours.textContent = String(hours).padStart(2, '0');
    fields.minutes.textContent = String(minutes).padStart(2, '0');
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Browsers may block sound until a visitor interacts with the page.
  const music = document.getElementById('birthday-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  const musicIcon = document.getElementById('music-icon');

  function reflectMusicState(isPlaying) {
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicLabel.textContent = isPlaying ? 'Pause birthday music' : 'Play birthday music';
    musicIcon.textContent = isPlaying ? 'Ⅱ' : '♫';
  }

  async function startMusic() {
    try {
      await music.play();
      reflectMusicState(true);
    } catch (error) {
      reflectMusicState(false);
      musicLabel.textContent = 'Tap to play birthday music';
    }
  }

  music.volume = 0.35;
  musicToggle.addEventListener('click', async () => {
    if (music.paused) {
      await startMusic();
    } else {
      music.pause();
      reflectMusicState(false);
    }
  });
  music.addEventListener('play', () => reflectMusicState(true));
  music.addEventListener('pause', () => reflectMusicState(false));
  music.addEventListener('error', () => {
    musicLabel.textContent = 'Music unavailable — tap to retry';
    reflectMusicState(false);
  });
  // Try autoplay; if the browser blocks it, the visible button remains available.
  startMusic();

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Share a ready-to-send invitation using WhatsApp.
  const shareButton = document.getElementById('share-button');
  const feedback = document.getElementById('share-feedback');
  shareButton.addEventListener('click', () => {
    const message = [
      "You're invited to celebrate Atharv's 1st Birthday! 🎂🐘",
      '',
      '📅 22 November 2026',
      '🙏 Katha: 8:00 AM to 11:00 AM',
      '🎂 Cake cutting: 5:00 PM',
      '🍽️ Food: 5:00 PM to 8:00 PM',
      '',
      '📍 House No. 59, Gali No. 2, Mohan Garden, Tilak Enclave',
      '📞 93109 50741',
      '',
      'Aap sabka swagat hai!',
      'With love, Nisha & Prem'
    ].join('\\n');
    const url = 'https://wa.me/?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    feedback.textContent = 'Your invitation is ready to share on WhatsApp.';
  });
})();
