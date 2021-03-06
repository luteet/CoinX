// =-=-=-=-=-=-=-=-=-=-=-=- <copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=
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
// =-=-=-=-=-=-=-=-=-=-=-=- </copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <custome select> -=-=-=-=-=-=-=-=-=-=-=-=
const select = document.querySelectorAll('._select');

select.forEach(thisElement => {
  NiceSelect.bind(thisElement, {
    searchable: false
  });
  
})

// =-=-=-=-=-=-=-=-=-=-=-=- </custome select> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <promote-elem init> -=-=-=-=-=-=-=-=-=-=-=-=

let promoteInput = document.querySelectorAll('.promote-elem__input');

promoteInput.forEach(thisPromoteInput => {
  if(thisPromoteInput.checked) {
    let parent = thisPromoteInput.parentElement;
    parent.classList.add('_active');
  }
})


// =-=-=-=-=-=-=-=-=-=-=-=- </promote-elem init> -=-=-=-=-=-=-=-=-=-=-=-=


const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  header = document.querySelector('.header');



let thisTarget;
body.addEventListener('click', function (event) {

  thisTarget = event.target;

  // =-=-=-=-=-=-=-=-=-=-=-=- <header menu> -=-=-=-=-=-=-=-=-=-=-=-=
  if (thisTarget.closest('._burger')) {
    menu.forEach(elem => {
      elem.classList.toggle('_active')
    })
  }
  // =-=-=-=-=-=-=-=-=-=-=-=- </header menu> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- <change theme (dark, light)> -=-=-=-=-=-=-=-=-=-=-=-=
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
  // =-=-=-=-=-=-=-=-=-=-=-=- </change theme (dark, light)> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- <copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=
  let copyBtn = thisTarget.closest('._copy-input-btn');
  if (copyBtn) {
    event.preventDefault();

    let input = copyBtn.parentNode.querySelector('._copy-input');

    if (input) {

      copyToClipboard(input)

    }

  }
  // =-=-=-=-=-=-=-=-=-=-=-=- </copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- <drop-down list> -=-=-=-=-=-=-=-=-=-=-=-=
  let dropDownCurrent = thisTarget.closest('._drop-down-current'),
    dropDownParent = (dropDownCurrent) ? dropDownCurrent.closest('._drop-down') : false;
    
  if (dropDownCurrent) {
    let click = true;
    if (dropDownParent.classList.contains('_active') && click) {
      dropDownParent.classList.remove('_active');
      click = false;
    }

    if (!dropDownParent.classList.contains('_active') && click) {
        dropDownParent.classList.add('_active');
        click = false;
    } 


  } else if (!thisTarget.closest('._drop-down')) {

      document.querySelectorAll('._drop-down').forEach(element => {
          element.classList.remove('_active');
      })

  }
  // =-=-=-=-=-=-=-=-=-=-=-=- </drop-down list> -=-=-=-=-=-=-=-=-=-=-=-=


  // =-=-=-=-=-=-=-=-=-=-=-=- <copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=
  let checkboxLabel = thisTarget.closest('._checkbox-label');
  if (checkboxLabel) {
    event.preventDefault();

    let input = checkboxLabel.querySelector('._checkbox-input');

    if (input) {
      
      if(input.checked) {
        input.checked = !input.checked;
        checkboxLabel.classList.remove('_active');
      } else {
        input.checked = !input.checked;
        checkboxLabel.classList.add('_active');
      }

    }

  }
  // =-=-=-=-=-=-=-=-=-=-=-=- </copy text from input> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- <change color on select> -=-=-=-=-=-=-=-=-=-=-=-=

  let niceSelect = thisTarget.closest('.nice-select');
  if(niceSelect) {

    document.querySelectorAll('.nice-select').forEach(thisElement => {
      let list = thisElement.querySelector('.list');
      list.classList.remove('_active');
    })

    let list = niceSelect.querySelector('.list');
        list.classList.add('_active');

    if(!niceSelect.classList.contains('open')) {
      
      setTimeout(() => {
        list.classList.remove('_active');
        list.classList.add('_hidden');
      },500)
    }
  } else {
    document.querySelectorAll('.nice-select').forEach(thisElement => {
      let list = thisElement.querySelector('.list');

      setTimeout(() => {
        list.classList.remove('_active');
        list.classList.add('_hidden');
      },500)
    })
  }

  // =-=-=-=-=-=-=-=-=-=-=-=- </change color on select> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- <edit input btn> -=-=-=-=-=-=-=-=-=-=-=-=

  let editInputBtn = thisTarget.closest('._edit-mode-btn');
  if(editInputBtn) {
    event.preventDefault();
    
    let parent  = editInputBtn.closest('._edit-mode'),
        input   = (parent) ? parent.querySelector('._edit-mode-input') : false;

    if(input) {
      input.removeAttribute('readonly');
    }

  }

  // =-=-=-=-=-=-=-=-=-=-=-=- </edit input btn> -=-=-=-=-=-=-=-=-=-=-=-=



  // =-=-=-=-=-=-=-=-=-=-=-=- </edit input btn> -=-=-=-=-=-=-=-=-=-=-=-=

  let promoteBtn = thisTarget.closest('.promote-elem__btn');
  if(promoteBtn) {
    event.preventDefault();
    let input = promoteBtn.querySelector('.promote-elem__input');

    if(input) {

      input.checked = !input.checked;
      
      if(input.checked) {
        promoteBtn.classList.add('_active');
      } else {
        promoteBtn.classList.remove('_active');
      }

    }
  }

  // =-=-=-=-=-=-=-=-=-=-=-=- </edit input btn> -=-=-=-=-=-=-=-=-=-=-=-=
  

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

    if (top[0] >= 200 && top[1] == false) {

      top[1] = true;
      header.style.setProperty('--pos', '-100%');
      header.style.setProperty('--opacity', '0');

      setTimeout(function () {
        header.classList.add('_active');
        header.style.setProperty('--pos', '0%');
        header.style.setProperty('--opacity', '1');
      }, 200);

    } else if (top[0] <= 100 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');
      header.style.setProperty('--opacity', '0');

      setTimeout(function () {
        header.style.setProperty('--pos', '0%');
        header.classList.remove('_active');
        header.style.setProperty('--opacity', '1');
      }, 200);

    }
  }

  scrollPageFunc();

  window.onscroll = scrollPageFunc;

}

scrollPage();

// =-=-=-=-=-=-=-=-=-=-=-=- </change header on scroll> -=-=-=-=-=-=-=-=-=-=-=-=

const wrapper = document.querySelector('.wrapper');

function resize() {

  wrapper.style.setProperty('--header-height', header.offsetHeight + 'px');

}

resize();

window.onresize = resize;


let changeSelect = document.querySelectorAll('._change-select');


changeSelect.forEach(thisElement => {

  function changeSelect(eventTarget) {
    let thisSelect  = eventTarget,
        parent      = thisSelect.closest('._change-select-parent'),
        option      = thisSelect.querySelector(`option[value="${thisSelect.value}"]`),
        optionBg    = (option) ? option.dataset.typeBg : false,
        optionTheme = (option) ? option.dataset.typeTheme : false;
  
        
    if(option && optionTheme) {
      parent.classList.remove('_dark');
      parent.classList.remove('_light');
  
      if(optionTheme == 'dark') {
        parent.classList.add('_dark');
      } else if(optionTheme == 'light') {
        parent.classList.add('_light');
      }
  
      parent.style.setProperty('--bg', (optionBg) ? optionBg : '');
  
    }
  }  

  changeSelect(thisElement)

  thisElement.addEventListener('change', function(event) {
    
    changeSelect(event.target)  
  
  })

})


function timer() {

  const timerElems = document.querySelectorAll('._timer');

  let deadline;

  timerElems.forEach(timerElem => {

    deadline = new Date(

      timerElem.getAttribute('data-timer-year'),
      timerElem.getAttribute('data-timer-month') - 1,
      timerElem.getAttribute('data-timer-day'),
      timerElem.getAttribute('data-timer-hour'),
      timerElem.getAttribute('data-timer-minute'));

      let timerDays = timerElem.querySelector('._timer-days'),
      timerHours = timerElem.querySelector('._timer-hours'),
      timerMinutes = timerElem.querySelector('._timer-minutes'),
      timerSeconds = timerElem.querySelector('._timer-seconds');
  
      setInterval(() => {

        const diff = deadline - new Date(),
  
          days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
          hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
          seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0,
          minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  
          timerDays.textContent = days;
          timerHours.textContent = hours;
          timerMinutes.textContent = minutes;
          timerSeconds.textContent = seconds;

          if(days) {
            timerDays.parentElement.classList.add('_active');
          } 
          else if(hours) {
            timerDays.parentElement.classList.remove('_active');
            timerHours.parentElement.classList.add('_active');
          }
          else if(minutes) {
            timerHours.parentElement.classList.remove('_active');
            timerMinutes.parentElement.classList.add('_active');
          }
          else if(seconds) {
            timerMinutes.parentElement.classList.remove('_active');
            timerSeconds.parentElement.classList.add('_active');
          }
  
      }, 1000);

  });

  

}

timer();

