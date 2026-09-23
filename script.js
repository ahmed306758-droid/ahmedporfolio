document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Hero code panel: type out the snippet once on load */
const codeEl = document.getElementById('hero-code');
if (codeEl) {
  const snippet = [
    'def keep_learning():',
    '    skills = [',
    '        "Python",',
    '        "SQL",',
    '        "Pandas",',
    '        "MongoDB",',
    '        "Data Visualization"',
    '    ]',
    '    return skills'
  ].join('\n');

  if (reduceMotion) {
    codeEl.textContent = snippet;
  } else {
    let i = 0;
    const caret = document.createElement('span');
    caret.className = 'caret';
    const typer = () => {
      codeEl.textContent = snippet.slice(0, i);
      codeEl.appendChild(caret);
      i++;
      if (i <= snippet.length) {
        requestAnimationFrame(() => setTimeout(typer, 14));
      } else {
        caret.remove();
      }
    };
    setTimeout(typer, 650);
  }
}

/* Scroll reveal: fade each section's content in once, the first time it's visible */
const revealTargets = document.querySelectorAll('main section > *:not(.eyebrow)');
revealTargets.forEach(el => el.classList.add('reveal'));

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach(el => el.classList.add('in-view'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => io.observe(el));
}
