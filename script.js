document.getElementById('year').textContent = new Date().getFullYear();

// ---- Tooltips on bold "term" words ----
const tooltip = document.getElementById('tooltip');
let activeTerm = null;

function showTip(term) {
  tooltip.textContent = term.dataset.tip;
  tooltip.classList.add('visible');
  positionTip(term);
  activeTerm = term;
}

function hideTip() {
  tooltip.classList.remove('visible');
  activeTerm = null;
}

function positionTip(term) {
  const rect = term.getBoundingClientRect();
  const tipWidth = 260;
  let left = rect.left + rect.width / 2 - tipWidth / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - tipWidth - 12));
  tooltip.style.left = left + 'px';
  tooltip.style.top = (rect.top - 12) + 'px';
  tooltip.style.transform = 'translateY(calc(-100% - 4px))';
}

document.querySelectorAll('.term').forEach((term) => {
  term.addEventListener('mouseenter', () => showTip(term));
  term.addEventListener('mouseleave', hideTip);
  term.addEventListener('focus', () => showTip(term));
  term.addEventListener('blur', hideTip);
  term.addEventListener('click', (e) => {
    e.preventDefault();
    if (activeTerm === term) { hideTip(); } else { showTip(term); }
  });
});

document.addEventListener('click', (e) => {
  if (activeTerm && !e.target.classList.contains('term')) hideTip();
});
