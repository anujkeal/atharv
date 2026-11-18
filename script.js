// Countdown, scroll reveals and WhatsApp invitation sharing.
(() => {
  // 22 November 2026, 5:00 PM in India (UTC+05:30).
  const target = new Date('2026-11-22T17:00:00+05:30').getTime();
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  const note = document.getElementById('countdown-note');

  function updateCountdown() {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => { field.textContent = '00'; });
      note.textContent = remaining > -60_000
        ? "It's celebration time! Happy birthday, Atharv!"
        : 'The celebration has begun — thank you for being part of it!';
      return;
    }
    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);
    fields.days.textContent = String(days).padStart(2, '0');
    fields.hours.textContent = String(hours).padStart(2, '0');
    fields.minutes.textContent = String(minutes).padStart(2, '0');
    fields.seconds.textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Reveal sections as they enter the viewport; keep content visible if unsupported.
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
    ].join('\n');
    const url = 'https://wa.me/?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    feedback.textContent = 'Your invitation is ready to share on WhatsApp.';
  });
})();
