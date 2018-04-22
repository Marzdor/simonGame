import SmoothScroll from "./modules/SmoothScroll";

var about = document.querySelectorAll("a[href='#about']");
var portfolio = document.querySelector("a[href='#portfolio']");
var contact = document.querySelector("a[href='#contact']");


about.forEach(function(element) {
  element.addEventListener("click", function() {
    var target = document.querySelector(".section_about");
    var topPos = target.offsetTop - 40;
    SmoothScroll(document.body, topPos, 1000);
  });
});
portfolio.addEventListener("click", function() {
  var target = document.querySelector(".section_portfolio");
  var topPos = target.offsetTop - 40;
  SmoothScroll(document.body, topPos, 1000);
});
contact.addEventListener("click", function() {
  var target = document.querySelector(".section_contact");
  var topPos = target.offsetTop - 40;
  SmoothScroll(document.body, topPos, 1000);
});