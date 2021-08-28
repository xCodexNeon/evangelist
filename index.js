$(document).ready(function() {

    // declare variable
    var scrollTop = $("#anastasia-chatbot-popup");


    if ($(window).scrollTop() < 400) {
        $(scrollTop).fadeOut();
    }

    // scroll event
    $(window).scroll(function() {

        // if for top button
        if ($(window).scrollTop() > 400) {
            $(scrollTop).fadeIn();
        } else {
            $(scrollTop).fadeOut();
        }


    });



});

$(function() {
    $('[data-toggle="popover-hover"]').popover()
})

// Tooltips Initialization
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

// initialize scrollspy
$('body').scrollspy({
    target: '.dotted-scrollspy'
});