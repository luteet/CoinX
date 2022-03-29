
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');

/* NiceSelect.bind(document.getElementById("example"),{
  searchable: false
}); */

let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }

    let themeLink = thisTarget.closest('._theme-btn');
    if(themeLink) {
      event.preventDefault();

      if(themeLink.classList.contains('_light-theme')) {

        themeLink.classList.remove('_light-theme');
        themeLink.classList.remove('_icon-dark-theme');
        themeLink.classList.add('_dark-theme');
        themeLink.classList.add('_icon-light-theme');

        localStorage.setItem('theme', 'dark');
        body.classList.add('_dark-theme');

        /* let themeIcon = themeLink.querySelector('._icon-theme-to-dark');
        themeIcon.classList.remove('_icon-theme-to-dark');
        themeIcon.classList.add('_icon-theme-to-light'); */
        
      } else if(themeLink.classList.contains('_dark-theme')) {

        themeLink.classList.remove('_dark-theme');
        themeLink.classList.remove('_icon-light-theme');
        themeLink.classList.add('_light-theme');
        themeLink.classList.add('_icon-dark-theme');

        localStorage.setItem('theme', 'light');
        body.classList.remove('_dark-theme');

        /* let themeIcon = themeLink.querySelector('._icon-theme-to-light');
        themeIcon.classList.remove('_icon-theme-to-light');
        themeIcon.classList.add('_icon-theme-to-dark'); */

      }
    }


})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
/*
let slider = new Swiper('.__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
}); 
*/
// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
