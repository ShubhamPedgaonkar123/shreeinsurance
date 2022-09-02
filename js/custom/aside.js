$(document).ready(function() {
    $("#logo").html('<img src="images/logo/logo_.png" alt="Shree" />');
    var mobile_menu = ' ';

    mobile_menu += '<div class="menu-sidebar__content js-scrollbar1">'
    mobile_menu += '<nav class="navbar-sidebar">'
    mobile_menu += '<ul class="list-unstyled navbar__list">'

    mobile_menu += '<li class="active"><a href="insurancecategory.html"><i class="fas fa-chart-bar"></i>Insurance Category</a></li>'
    mobile_menu += '<li ><a href="scheme.html"><i class="fas fa-chart-bar"></i>Scheme</a></li>'
    mobile_menu += '<li ><a href="scheme_referral.html"><i class="fas fa-chart-bar"></i>Scheme Referral</a></li>'
    mobile_menu += '<li ><a href="eligible.html"><i class="fas fa-chart-bar"></i>All Eligible Users </a></li>'
    mobile_menu += '<li ><a href="reward.html"><i class="fas fa-chart-bar"></i>Reward</a></li>'
    mobile_menu += '<li ><a href="admin_report.html"><i class="fas fa-chart-bar"></i>Admin Report</a></li>'
    mobile_menu += '</ul>'
    mobile_menu += '</nav>'
    mobile_menu += '</div>'
    $(".d-lg-block").append(mobile_menu)
});