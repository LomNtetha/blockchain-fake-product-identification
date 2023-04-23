// (function($) {

// 	"use strict";

// 	$('nav .dropdown').hover(function(){
// 		var $this = $(this);
// 		$this.addClass('show');
// 		$this.find('> a').attr('aria-expanded', true);
// 		$this.find('.dropdown-menu').addClass('show');
// 	}, function(){
// 		var $this = $(this);
// 			$this.removeClass('show');
// 			$this.find('> a').attr('aria-expanded', false);
// 			$this.find('.dropdown-menu').removeClass('show');
// 	});

// })(jQuery);

// const accessToken = window.localStorage.getItem("accessToken");
// const refreshToken = window.localStorage.getItem("refreshToken");

// const resultElement = document.getElementById("getResult");
// resultElement.innerHTML =
//   "<pre>" + JSON.stringify({ accessToken, refreshToken }, null, 2) + "</pre>";
// // 


(function($) {
	"use strict";
  
	$('nav .dropdown').hover(function(){
	  var $this = $(this);
	  $this.addClass('show');
	  $this.find('> a').attr('aria-expanded', true);
	  $this.find('.dropdown-menu').addClass('show');
	}, function(){
	  var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});
  })(jQuery);
  
//   const accessToken = window.localStorage.getItem("accessToken");
//   const refreshToken = window.localStorage.getItem("refreshToken");
  
//   const resultElement = document.getElementById("getResult");
//   resultElement.innerHTML =
// 	"<pre>" + JSON.stringify({ accessToken, refreshToken }, null, 2) + "</pre>";
  
const accessToken = window.localStorage.getItem("accessToken");
const refreshToken = window.localStorage.getItem("refreshToken");

if (!accessToken || !refreshToken) {
  // redirect to signin page
  window.location.href = "signin.html";
}

const resultElement = document.getElementById("getResult");
resultElement.innerHTML =
  "<pre>" + JSON.stringify({ accessToken, refreshToken }, null, 2) + "</pre>";
