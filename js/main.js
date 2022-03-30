
function copyToClipboard(el) {

  // resolve the element
  el = (typeof el === 'string') ? document.querySelector(el) : el;

  // handle iOS as a special case
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

    // save current contentEditable/readOnly status
    var editable = el.contentEditable;
    var readOnly = el.readOnly;

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true;
    el.readOnly = true;

    // create a selectable range
    var range = document.createRange();
    range.selectNodeContents(el);

    // select the range
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {
    navigator.clipboard.writeText(el.value)
      .then(() => {

      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
    el.select();
  }

  // execute copy command
  document.execCommand('copy');
}

const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  header = document.querySelector('.header');


const select = document.querySelectorAll('._select');

select.forEach(thisElement => {
  NiceSelect.bind(thisElement, {
    searchable: false
  });
})

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
  if (themeLink) {
    event.preventDefault();

    if (themeLink.classList.contains('_light-theme')) {

      themeLink.classList.remove('_light-theme');
      themeLink.classList.remove('_icon-dark-theme');
      themeLink.classList.add('_dark-theme');
      themeLink.classList.add('_icon-light-theme');

      localStorage.setItem('theme', 'dark');
      body.classList.add('_dark-theme');

      /* let themeIcon = themeLink.querySelector('._icon-theme-to-dark');
      themeIcon.classList.remove('_icon-theme-to-dark');
      themeIcon.classList.add('_icon-theme-to-light'); */

    } else if (themeLink.classList.contains('_dark-theme')) {

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



  let copyBtn = thisTarget.closest('._copy-input-btn');
  if (copyBtn) {
    event.preventDefault();

    let input = copyBtn.parentNode.querySelector('._copy-input');

    if (input) {

      copyToClipboard(input)

    }

  }


})


// =-=-=-=-=-=-=-=-=-=-=-=- <change header on scroll> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function scrollPage() {

  const offsetCheckJs = document.querySelector('.offset-check-js');
  let top = [getCoords(offsetCheckJs).top, false];

  header.classList.add('_loaded');

  function scrollPageFunc() {
    top[0] = getCoords(offsetCheckJs).top;

    if (top[0] >= 300 && top[1] == false) {

      top[1] = true;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function () {
        header.classList.add('_active');
        header.style.setProperty('--pos', '0%');
      }, 200);

    } else if (top[0] <= 300 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function () {
        header.style.setProperty('--pos', '0%');
        header.classList.remove('_active');

      }, 200);

    }
  }

  scrollPageFunc();

  window.onscroll = scrollPageFunc;

}

scrollPage();

// =-=-=-=-=-=-=-=-=-=-=-=- </change header on scroll> -=-=-=-=-=-=-=-=-=-=-=-=

