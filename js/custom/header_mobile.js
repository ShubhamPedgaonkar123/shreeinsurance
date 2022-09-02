$(document).ready(function() {
    $(".logo").html('<img src="images/logo/logo_.png" alt="logo" />');
    var mobile_menu  = ' '; 

    mobile_menu +='<ul class="navbar-mobile__list list-unstyled">'
    mobile_menu +='<li>'
    mobile_menu +='<a href="chart.html">'
    mobile_menu +='<i class="fas fa-chart-bar"></i>Charts</a>'
    mobile_menu +='</li>'
    mobile_menu +='</ul>'
    $(".navbar-mobile__list").html(mobile_menu);
});