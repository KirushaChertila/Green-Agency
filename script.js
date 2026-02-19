document.addEventListener('DOMContentLoaded', () => {
  
  /* -Menu Modal- */

  const modal = document.getElementById('info_modal');
  const openBtns = document.querySelectorAll('.info_modal-open_btn');
  const closeBtn = document.getElementById('modal_close_btn');

  if (openBtns.length > 0 && modal) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.classList.add('modal_open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal_open');
      document.body.style.overflow = 'auto';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal_open');
        document.body.style.overflow = 'auto';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.classList.remove('modal_open');
      document.body.style.overflow = 'auto';
    }
  });

  /* -Slider- */

  const track = document.querySelector('.blog_item_container');
  const items = document.querySelectorAll('.blog_item');
  const dotsContainer = document.querySelector('.slider_dots');
  const prevBtn = document.querySelector('.btn_prev');
  const nextBtn = document.querySelector('.btn_next');
  
  const itemWidth = 360;
  const gap = 20;
  let currentIndex = 0;
  let isMobileView = window.innerWidth <= 960;

  function initDots() {
    dotsContainer.innerHTML = '';
    items.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.dataset.index = index;
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });
  }

  function checkViewMode() {
  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );
  isMobileView = screenWidth <= 960;
}

  function updateView() {
    checkViewMode();
    
    if (dotsContainer) {
      dotsContainer.style.display = isMobileView ? 'flex' : 'none';
    }
  }

  function goToSlide(index) {
    index = Math.max(0, Math.min(index, items.length - 1));
    
    track.scrollTo({
      left: (itemWidth + gap) * index,
      behavior: 'smooth'
    });
    
    currentIndex = index;
    updateActiveDot();
  }

  function updateActiveDot() {
    const dots = document.querySelectorAll('.dot');
    if (dots.length === 0) return;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  initDots();
  updateView();
  
  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    goToSlide(currentIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    goToSlide(currentIndex + 1);
  });

  dotsContainer?.addEventListener('click', (e) => {
    if (!isMobileView) return;
    
    if (e.target.classList.contains('dot')) {
      const index = parseInt(e.target.dataset.index);
      goToSlide(index);
    }
  });

  track.addEventListener('scroll', () => {
    const scrollPosition = track.scrollLeft;
    const newIndex = Math.round(scrollPosition / (itemWidth + gap));
    
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateActiveDot();
    }
  });

  window.addEventListener('resize', () => {
    updateView();
    
    if (isMobileView) {
      const newIndex = Math.round(track.scrollLeft / (itemWidth + gap));
      currentIndex = Math.max(0, Math.min(newIndex, items.length - 1));
      updateActiveDot();
    }
  });

  updateActiveDot();

})