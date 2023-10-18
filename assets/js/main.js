document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


/* Typing section */
const textToType = "Beyond Ideas & Imagination";
let currentIndex = 0;
const typingSpeed = 50; // Adjust the speed here (milliseconds per character)
const repeatInterval = 1000; // Adjust the interval between repetitions (milliseconds)

function typeText() {
  const typingElement = document.getElementById("typing-text");
  if (currentIndex < textToType.length) {
    typingElement.innerHTML += textToType.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    // Wait for the repeatInterval before starting over
    setTimeout(startOver, repeatInterval);
  }
}

function startOver() {
  const typingElement = document.getElementById("typing-text");
  typingElement.innerHTML = "";
  currentIndex = 0;
  setTimeout(typeText, typingSpeed);
}

// Start typing when the page loads
window.onload = typeText;

/*-------------nav scrol -----------
--------------------------------*/
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("header");

  if (window.scrollY > 50) {
      navbar.classList.remove("transparent");
      navbar.classList.add("scrolled");
  } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("transparent");
  }
});


/*----------------------------------------
---------slider logic--------------------
--------------------------------------*/
$(window).on('load', function(){
  // Please run it with window.onload, not with document.ready
  initSmoothScrolling('.block','smoothscroll');
});

function initSmoothScrolling(container,animation){
 /*
	* @param {String} container Class or ID of the animation container
	* @param {String} animation Name of the animation, e.g. smoothscroll
	*/
	var sliderWidth = 0;	
	var animationWidth = 0;	
	var sliderHeight = $('>div>div:first-of-type',container).outerHeight(false);

	$('>div>div', container).each(function(){				
		animationWidth += $(this).outerWidth(false);		
	});
	
	// detect number of visible slides
	var slidesVisible = $(container).width() / $('>div>div:first-of-type',container).outerWidth(false);	
	slidesVisible = Math.ceil(slidesVisible);

  // count slides to determine animation speed
	var slidesNumber = $('>div>div', container).length;
	var speed = slidesNumber*2;
	
// append the tail	
	$('>div>div',container).slice(0,slidesVisible).clone().appendTo($('>div',container));	

	// Detect the slider width with appended tail
	$('>div>div', container).each(function(){
		sliderWidth += $(this).outerWidth(false);
	});

	// set slider dimensions
	$('>div',container).css({'width':sliderWidth,'height':sliderHeight});
  
// Insert styles to html
	$("<style type='text/css'>@keyframes "+animation+" { 0% { margin-left: 0px; } 100% { margin-left: -"+animationWidth+"px; } } "+$('>div>div:first-of-type',container).selector+" { -webkit-animation: "+animation+" "+speed+"s linear infinite; -moz-animation: "+animation+" "+speed+"s linear infinite; -ms-animation: "+animation+" "+speed+"s linear infinite; -o-animation: "+animation+" "+speed+"s linear infinite; animation: "+animation+" "+speed+"s linear infinite; }</style>").appendTo("head");	

	// restart the animation (e.g. for safari & ie)	
	var cl = $(container).attr("class");
	$(container).removeClass(cl).animate({'nothing':null}, 1, function () {
		$(this).addClass(cl);
	});
}

/*---------------------------------
back to top------------------------
-----------------------------*/
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var backButton = document.getElementById("back-to-top-button");
  var chatButton = document.querySelector('.whatsapp-chat-button');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backButton.style.display = "block";
    chatButton.style.display = "block";
  } else {
    backButton.style.display = "none";
    chatButton.style.display = "none";
  }
}

document.getElementById("back-to-top-button").addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/*-----------------------------------
--------gallery page ----------------
------------------------------------*/
const galleryWrapper = document.getElementById('galleryWrapper');

const firstGalleryItem = galleryWrapper.querySelector('.gallery-item');
const clonedItem = firstGalleryItem.cloneNode(true);
galleryWrapper.appendChild(clonedItem);
galleryWrapper.style.animationDuration = '20s';


console.clear();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

const additionalY = { val: 0 };
let additionalYAnim;
let offset = 0;
const cols = gsap.utils.toArray(".col");

cols.forEach((col, i) => {
  const images = col.childNodes;

  // DUPLICATE IMAGES FOR LOOP
  images.forEach((image) => {
    var clone = image.cloneNode(true);
    col.appendChild(clone);
  });

  // SET ANIMATION
  images.forEach((item) => {
    let columnHeight = item.parentElement.clientHeight;
    let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

    gsap.to(item, {
      y: direction + Number(columnHeight / 2),
      duration: 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        y: gsap.utils.unitize((y) => {
          if (direction == "+=") {
            offset += additionalY.val;
            y = (parseFloat(y) - offset) % (columnHeight * 0.5);
          } else {
            offset += additionalY.val;
            y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
          }

          return y;
        })
      }
    });
  });
});

const imagesScrollerTrigger = ScrollTrigger.create({
  trigger: "section",
  start: "top 50%",
  end: "bottom 50%",
  onUpdate: function (self) {
    const velocity = self.getVelocity();
    if (velocity > 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 2000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
    if (velocity < 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 3000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
  }
});
