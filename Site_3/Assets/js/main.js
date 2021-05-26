;(function(){
	
	var canUseWebP = function()
{
 var elem = document.createElement('canvas');

 if (!!(elem.getContext && elem.getContext('2d')))
 {
  // was able or not to get WebP representation
  return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
 }
 else
 {
  // very old browser like IE 8, canvas not supported
  return false;
 }
};
	
	var isWebpSupported = canUseWebP();
	
	if (isWebpSupported === false) {
		var lazyItems = document.querySelectorAll('data-bg-replace-webp');
		
		for (var i = 0; i < lazyItems.length; i+= 1) {
			var item = lazyItems[i];
			
		
		var dataBgReplaceWebp = item.getAttribute('data-bg-replace-webp');
		if (dataBgReplaceWebp !== null) {
			item.setAttribute('data-bg', dataBgReplaceWebp);
		}
	}
}
	
	var lazyLoadInstance = new LazyLoad ({
		elements_selector: ".lazy"
});
})();


/*MyLib--start*/
;(function() {
  window.myLib = {};
  
  window.myLib.body = document.querySelector('body');
	
	
	window.myLib.closesAttr = function(item, attr) {
		
		var node = item;
		
		while (node) {
			var attrValue = node.getAttribute(attr);
			if (attrValue) {
				return attrValue;
			}
			
			node = node.parentElement;
			
		}
		
		return null;
	};
	
	window.myLib.closestItemByClass = function(item, className) {
		
		var node = item;
		
		while (node) {
			if (node.classList.contains(className)) {
				return node;
			}
			
			node = node.parentElement;
			
		}
		
		return null;
	};
	
	window.myLib.toggleScroll = function () {
		myLib.body.classList.toggle('no-scroll');
	};
	
	
  })();
/*MyLib--end*/

/*Header--start*/
;(function() {

	if (window.matchMedia('(max-width:993px)').matches) {
		return;
	}
	
var headerPage = document.querySelector('.header-page');
	
	window.addEventListener('scroll', function(){
		if (window.pageYOffset > 0 ){ 
	headerPage.classList.add('is-active');
		}
		else { 
		headerPage.classList.remove('is-active'); }
	});
	
	
})();
/*Header--end*/

/*Popup--start*/
;(function() {
	
	var showPopup = function(target) {
		target.classList.add('is-active');
		
	};
	
	var closePopup = function(target) {
		target.classList.remove('is-active');
		
	};
	
	myLib.body.addEventListener('click', function(e) {
		var target = e.target;
		var popupClass = myLib.closesAttr(target, 'data-popup');
		
		if (popupClass === null) {
			return;
		}
		
		e.preventDefault();
		var popup = document.querySelector('.' + popupClass);
		
		if (popup) {
			showPopup (popup);
			myLib.toggleScroll ();
		}
		
	});
	
	myLib.body.addEventListener('click', function(e) {
	
		var target = e.target;
		
		if (target.classList.contains('popup-close') || 		target.classList.contains('popup_inner')) {
			
			var popup = myLib.closestItemByClass(target, 'popup');
			
			closePopup(popup);
			myLib.toggleScroll();
		} 
	});
	
	
	myLib.body.addEventListener('keydown', function(e){
		console.log(e.keyCode);
		if (e.keyCode !== 27) {
			return;
		}
		
		var popup = document.querySelector ('.popup.is-active');
		
		if (popup) {
			closePopup(popup);
			myLib.toggleScroll ();
		}
	});
	
})();
/*Popup--end*/

/*ScrollTo--start*/
;(function() {
	
	var scroll = function(target) {
		var targetTop = target.getBoundingClientRect().top;
		var scrollTop = window.pageYOffset;
		var tagetOffsetTop = targetTop + scrollTop;
		var headerOffset = document.querySelector('.header-page').clientHeight;
		
		
		window.scrollTo(0, tagetOffsetTop - headerOffset);
	}
	
	myLib.body.addEventListener('click', function(e) {
		var target = e.target;
		var scrollToItemClass = myLib.closesAttr(target, 'data-scroll-to');
		
		if (scrollToItemClass === null) {
			return;
		}
		
		e.preventDefault();
		var scrollToItem = document.querySelector('.' + scrollToItemClass);
		
		if (scrollToItem) {
			scroll(scrollToItem);
		}
		
	});
	
	
	
})();
/*ScrollTo--start*/

/*Menu--start*/
;(function() {
	var menuSection = document.querySelector('.section-menu');
	
	if(menuSection === null) {
		return;
	}
	
	var removeChildren = function (item) {
		while(item.firstChild) {
			item.removeChild (item.firstChild);
		}
	}
	
	var updateChildren = function (item, children) {
		removeChildren (item);
		
		for (var i = 0; i < children.length; i+=1) {
			item.appendChild(children[i]);
		}
	}
	
	var menu = menuSection.querySelector ('.menu');
	var menuNav = menuSection.querySelector ('.menu-nav');
	var menuItems = menuSection.querySelectorAll ('.menu_item');
	
	menuNav.addEventListener('click', function(e) {
	var target = e.target;
	var item = myLib.closestItemByClass(target, 'menu-nav_btn')	
	
	if (item === null || item.classList.contains('is-active')) {
		return;
	}
		
	e.preventDefault();
	var filterValue = item.getAttribute('data-filter');
	var previousBtnActive = menuNav.querySelector('.menu-nav_btn.is-active');
	
	previousBtnActive.classList.remove('is-active');
	item.classList.add('is-active');	
		
	if (filterValue === 'all') {
		updateChildren(menu, menuItems);
		return;
	}
		
	var filteredItems = [];
	for (var i = 0; i<menuItems.length; i+=1) {
		var current = menuItems[i];
		if (current.getAttribute('data-category') === filterValue) {
			filteredItems.push(current);
		}
	}	
		
	updateChildren (menu,filteredItems);	
							 
	
							 						 
	});
})();
/*Menu--end*/

/*Product--start*/
;(function () {
	var menu = document.querySelector('.menu');

	if (menu === null) {
		return;
	}
	
	var updateProductPrice = function (product,price) {
		var productPrice = product.querySelector ('.product_price-value');
		productPrice.textContent = price;
	};

	var changeProductSize = function (target) {
		var product = myLib.closestItemByClass(target, 'product');
		var previousBtnActive = product.querySelector('.product_size.is-active');
		var newPrice = target.getAttribute('data-product-size-price');

		previousBtnActive.classList.remove('is-active');
		target.classList.add('is-active');
		updateProductPrice(product, newPrice);
		

	};

	var changeProductOrderInfo = function (target) {
		var product = myLib.closestItemByClass(target, 'product');
		var order = document.querySelector('.popup-order');

		var productTitle = product.querySelector('.product_title').textContent;

		var productSize = product.querySelector('.product_size.is-active').textContent;

		var productPrice = product.querySelector('.product_price-value').textContent;

		var productImgSrc = product.querySelector('.product_img').getAttribute('src');

		order.querySelector('.order-info-title').setAttribute('value', productSize);
		
		order.querySelector('.order-info-title').setAttribute('value', productPrice);
		
		order.querySelector('.order-info-title').setAttribute('value', productImgSrc);

		order.querySelector('.order-product-title').textContent = productTitle;
		order.querySelector('.order-product-price').textContent = productPrice;
		order.querySelector('.order_subtitle').textContent = productSize;
		order.querySelector('.order_img').setAttribute('src', productImgSrc);

		

	}

	menu.addEventListener('click', function (e) {
		var target = e.target;

		if (target.classList.contains('product_size') && !target.classList.contains('is-active')) {
			e.preventDefault();
			changeProductSize(target);
		}

		if (target.classList.contains('product_btn')) {
			e.preventDefault();
			changeProductOrderInfo(target);
		}


	})

})();
/*Product--end*/

/*Form--start*/
;(function() {
	var forms = document.querySelectorAll('.form-send');
	
	if (forms.lenght === 0) {
		return;
	}
	
	var serialize = function(form) {
		var items = form.querySelectorAll('input, select, textarea');
		var str = '';
		for (var i = 0; i < items.length; i += 1) {
			var item = items[i];
			var name = item.name;
			var value = item.value;
			var separator = i === 0 ? '' : '&';
			
			
			if (value) {
				str += separator + name + '=' + value;
			}
		}
		
		return str;
	}
	
	var formSend = function(form){	
	var data = serialize(form);	
		
	var xhr = new XMLHttpRequest();
	var url = 'mail/mail.php';
	
		
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');	
		
	xhr.onload = function() {
	console.log(xhr.response);
	var activePopup = document.querySelector('.popup.is-active');
		if (activePopup) {
			activePopup.classList.remove('is-active');
		}
		
		else {
			myLib.toggleScroll();
		}
		
		if (xhr.response === 'success') {
			document.querySelector('.popup-thanks').classList.add('is-active');
		}
		else {
			document.querySelector('.popup-error').classList.add('is-active');
			
		}
		
		form.reset();
	};
		
	xhr.send(data);	
};
	for (var i = 0; i < forms.length; i+=1) {
		forms [i].addEventListener ('submit', function(e) {
		e.preventDefault();
		var form = e.currentTarget;
		formSend(form);	
		});
	}
})();
/*Form--start*/