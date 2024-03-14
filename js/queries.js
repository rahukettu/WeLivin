$(function() {
    $(window).resize(
       function() {
           if ( ($('.row').css('display') == 'block') && ($('.cell').parent().hasClass('row')) ) {
             $(".cell").unwrap(".row");
           } else if (!$(".cell").parent().hasClass('row')) {
             $(".cell").slice(0,1).wrap("<div class='row'></div>");
             $(".cell").slice(2,3).wrap("<div class='row'></div>");
           }
       }
    ).resize();
 });
