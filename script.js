document.addEventListener('DOMContentLoaded', () => {

  /* -Menu Services Dropout- */

  const menuItem = document.querySelector('.menu_item_with_dropdown');
  const menuBtn = document.getElementById('menu_panel_btn');
  
  function closeMenu() {
    menuItem.classList.remove('active');
  }
  
  function openMenu() {
    menuItem.classList.add('active');
  }
  
  menuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (menuItem.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  document.addEventListener('click', function(event) {
    if (!menuItem.contains(event.target)) {
      closeMenu();
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
  
  const dropdown = document.querySelector('.dropdown_menu');
  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
  /* -Menu Modal- */

  const modal = document.getElementById('info_modal');
  const openBtns = document.querySelectorAll('.info_modal-open_btn');
  const closeBtn = document.getElementById('modal_close_btn');
  const modalMenuItem = document.querySelector('.modal_menu_item_with_dropdown');

  function resetDropdownMenu() {
    if (modalMenuItem) {
      modalMenuItem.classList.remove('active');
    }
  }

  if (openBtns.length > 0 && modal) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        resetDropdownMenu();
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
      resetDropdownMenu();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal_open');
        document.body.style.overflow = 'auto';
        resetDropdownMenu();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.classList.remove('modal_open');
      document.body.style.overflow = 'auto';
      resetDropdownMenu();
    }
  });

  const modalMenuBtn = document.getElementById('modal_menu_btn');

  if (modalMenuItem && modalMenuBtn) {
    modalMenuBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    
    const otherItems = document.querySelectorAll('.modal_menu_item:not(#modal_menu_btn)');
    otherItems.forEach(item => {
      item.addEventListener('click', function() {
        modalMenuItem.classList.remove('active');
      });
    });
    
    const dropdownItems = document.querySelectorAll('.modal_dropdown_item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        modalMenuItem.classList.remove('active');
      });
    });
    
    const modalDropdown = document.querySelector('.modal_dropdown_menu');
    if (modalDropdown) {
      modalDropdown.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
    
    document.addEventListener('click', function(e) {
      if (modal.style.display === 'block') {
        if (!modalMenuItem.contains(e.target) && 
            e.target !== modalMenuBtn && 
            !e.target.closest('.modal_dropdown_item')) {
          modalMenuItem.classList.remove('active');
        }
      }
    });
  }

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