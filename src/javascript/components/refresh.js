const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', function() {
  refreshBtn.classList.add('rotate-center');
  setTimeout(() => {
    window.location.reload(true);
  }, 600);
});
refreshBtn.addEventListener('animationend', function() {
  refreshBtn.classList.remove('rotate-center');
});
