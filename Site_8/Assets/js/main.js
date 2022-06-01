/*HEADER*/
$(document).ready(function() {
$('.header__burger').click(function(event){
  $('.header__burger,.header__nav').toggleClass('active');
  $('body').toggleClass('lock');
});

$('.header__nav a').click(function() {

  $('.header__burger,.header__nav').removeClass('active');

});



$("[data-scroll]").on("click", function(event) {
  event.preventDefault ();
  
  var $this = $(this),
      blockId = $this.data('scroll'),
      blockOffset = $(blockId).offset().top;
  
  $("#nav a").removeClass("active");
  $this.addClass("active");
  
  $("html, body").animate({
     scrollTop: blockOffset 
  }, 600);
});
});


/*TIMELINE*/
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  var items = document.querySelectorAll(".timeline li");
 
// code for the isElementInViewport function
 
function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);


/*3D CARD*/
const cards = document.querySelectorAll('.card__parent');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener ('mousemove', startRotate);
    card.addEventListener ('mouseout', stopRotate);
    card.addEventListener ('click', imgText);
    
    

}
function startRotate(event) {
   var cardItem = this.querySelector('.card__img');
   var halfHeight = cardItem.offsetHeight / 2;
   cardItem.style.transform = 'rotateX('+-(event.offsetY - halfHeight)/10 +'deg) rotateY(' + (event.offsetX - halfHeight) / 10 + 'deg)';
}

function stopRotate(event) {
    var cardItem = this.querySelector('.card__img');
    cardItem.style.transform = 'rotate(0)';
} 


/*img-click*/

function imgText () {
  acc_click.call(this.nextElementSibling.firstElementChild);
};


/*ACCORDION*/
let container = document.querySelector('.card');
let acc = container.querySelectorAll('.accordion');
 
for (let a of acc) a.addEventListener('click', acc_click);
 
function acc_click() {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    panel.style.maxHeight = !panel.style.maxHeight ? panel.scrollHeight + 'px' : '';
}



/* SLIDER*/
     
$("[data-slider]").slick({
    infinite:true,
    fade:false,
    slidesToShow: 1,
    slidesToScroll: 1
});


/*POPUP*/

;(function(){
  var body = document.querySelector('body');

  var closestItemByClass = function(item, className){
    var node = item;

    while(node) {
      if (node.classList.contains(className)) {
        return node;
      }

      node = node.parentElement;
    }

    return null;
  };

  
  var closestAttr = function(item, attr){
    var node = item;

    while(node) {
      var attrValue = node.getAttribute(attr);
      if (attrValue) {
        return attrValue;
      }

      node = node.parentElement;
    }

    return null;
  };

  var showPopup = function(target) {
target.classList.add('is-active');
  };

  var closePopup = function(target) {
    target.classList.remove('is-active');
      };
  var toggleScroll = function () {
    body.classList.toggle('no-scroll');
  };

  body.addEventListener("click", function(e){
    var target = e.target;
    var popupClass = closestAttr(target, 'data-popup');

if(popupClass === null) {
  return;
}

e.preventDefault();
var popup = document.querySelector('.' + popupClass);

if(popup) {
  showPopup(popup);
  toggleScroll();
}


console.log(popup);
  });

  body.addEventListener("click", function(e){ 
    
    var target = e.target;

    if(target.classList.contains('popup__btn-close') ||target.classList.contains('popup__inner')) {

      var popup = closestItemByClass(target, 'popup');

      closePopup(popup);
      toggleScroll();
          }
      });

  body.addEventListener("keydown", function(e){ 
    
    if (e.keyCode !== 27) {
      return;
    }

    var popup = document.querySelector('.popup.is-active');

    if(popup) {
      closePopup(popup);
      toggleScroll();
    }
      });

})();


/*ОТПРАВКА ФОРМЫ */
;(function(){

  var forms = document.querySelectorAll('.form-send');
  if (forms.length === 0 ) {
    return;
  }

  var serialize = function(form) {
    var items = form.querySelectorAll('input,select, textarea');
    var str = '';
for (var i = 0; i <items.length; i++) {
  var item = items[i];
  var name = item.name;
  var value = item.value;
  var separator = i === 0 ? '' : '&';

  if(value) {
    str += separator + name + '=' + value;
  }
}
    return str;
  };

  var formSend = function(form) {

      var data = serialize(form);
    
      var data = 'name=value&name2=value2';

      var xhr = new XMLHttpRequest();
      var url = 'mail/mail.php';

      xhr.open('POST',url);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


      xhr.onload = function() {

        var activePopup = document.querySelector('.popup.is-active'); 

        if(activePopup) {
          activePopup.classList.remove('is-active');
        }
        else {
          myLib.toggleScroll();
        }

        if(xhr.response === 'success') {
          document.querySelector('.popup-thanks').classList.add('is-active');
        }
        else {
          document.querySelector('.popup-error').classList.add('is-active');
        }

        form.reset();
      };

      xhr.send(data);
  };

  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function(e){
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
})();

function readMore() {
  const more = document.getElementById('more');
  const hide = document.getElementById('hide');
if (hide.style.display === "block") {
  hide.style.display = "none";
  more.innerHTML = "Подробнее";
}
else {
  hide.style.display = "block";
  more.innerHTML = "Скрыть";
}
  
}

function readMore2() {
  const more2 = document.getElementById('more2');
  const hide2 = document.getElementById('hide2');
if (hide2.style.display === "block") {
  hide2.style.display = "none";
  more2.innerHTML = "Подробнее";
}
else {
  hide2.style.display = "block";
  more2.innerHTML = "Скрыть";
}
  
}

