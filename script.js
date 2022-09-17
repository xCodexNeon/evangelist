jQuery(document).ready(function($){
	isFacebook();
	
	var target = $('#pcontainer');
	$('.p1').zlayer({canvas:'#pcontainer',mass:6,force:'pull'});
	$('.p2').zlayer({canvas:'#pcontainer',mass:8,force:'pull'});
	$('.p3').zlayer({canvas:'#pcontainer',mass:12,force:'pull'});	
	$('.p4').zlayer({canvas:'#pcontainer',mass:22,force:'pull'});
	$('.p5').zlayer({canvas:'#pcontainer',mass:100,force:'pull'});	
	
	$('a[href$=".mp3"]').each(function() {
		if ( ($(this).attr('title') == 'download') || ($(this).hasClass('threesixty-exclude')) ) {
			$(this).addClass('threesixty-exclude');
		} else {
			$(this).wrap('<div class="ui360" />');
		}
	});
	
	if ( $('div.news-wall').length ) {
		setMasonry();
	};

	$('div.news-wall').masonry({
		singleMode: true, 
		itemSelector: '.post',
		isAnimated: true,
		animationOptions: {
			queue: false,
			duration: 250,
			complete: mComplete
		}
	});
		
	// Grid switch
	$('.sw').click(function() {
		$('#g').toggleClass('grid');
		return false;
	});
	// jScrollPane
	var scroller = $('.scrollable').jScrollPane({
		verticalGutter: -8
	});
	// Autoclear fields
	$('.required').focus(function() {
		if( this.value == this.defaultValue ) {
			this.value = "";
		}
	}).blur(function() {
		if( !this.value.length ) {
			this.value = this.defaultValue;
		}
	});
	// Tidy the Twitter feed
	if ( $('#twitter-tools').length ) {
		$('.aktt_tweet_time').each(function() {
			var thedate = $(this).html();
			$(this).html('&mdash; <span>' +thedate+ '</span>');
		});
		$('.aktt_more_updates a').before('&mdash; ').html('Follow on Twitter');
	}
	// soundManager controls
	$('.control li').click(function() {
		var myIndex = $('.control li').index(this);
		threeSixtyPlayer.handleClick({
			target:threeSixtyPlayer.links[myIndex],preventDefault:function(){
			}
		});		
	});
	
	$('#subForm').submit(function(e) {
		e.preventDefault();
		var formAction = this.action;
		var id = "xzjuh";
		var emailId = id + "-" + id;
		if (!checkEmail(emailId)) {
			alert("Please enter a valid email address");
			return;
		}
		var str = $(this).serialize();
		//<![CDATA[
		var serialized = str + "&action=" + formAction;
		// ]]>
		$.ajax({
			url: "http://www.prismtracks.com/wordpress/wp-content/themes/prism-toolbox/js/proxy.php",
			type: "POST",
			data: serialized,
			dataType: 'html',
			success: function(data){
				if (data.search(/invalid/i) != -1) {
					alert('The email address you supplied is invalid and needs to be fixed before you can subscribe to this list.');
				} else {
					var $confirmation = $('#confirmation');
					$("#formwrap").fadeOut(function(){
						$confirmation.fadeIn();
					});
					$confirmation.prop('tabIndex', -1);
					$confirmation.focus();
				}
			}
		});
	});
	
});
$(window).bind("smartresize", function( event ) {
	if ( $('.scrollable').length ) {
		var jspapi = $('.scrollable').data('jsp');
		jspapi.reinitialise();
	}
	setMasonry();
});
function mComplete() {
	if ( $('.scrollable').length ) {
		var jspapi = $('.scrollable').data('jsp');
		jspapi.reinitialise();
	}
}
function setMasonry() {
	var availW = $("#page-body").width();
	var colsN = Math.floor((availW - 210)/160);
	if (colsN) {
		var newW = colsN * 160;
		$("section.news-archive").width(newW + 210);
		$("div.news-wall").width(newW);
	}
}
function isFacebook() {
	$(".fb-like").css({"opacity" : "0"});
	if ($(".fb_iframe_widget iframe").length) {
		$(".fb-like").delay(1000).animate({"opacity" : "1"}, 100);
	} else {
		setTimeout(isFacebook,1000)
	}
}
// ------------------------
// --- Email validation ---
// ------------------------
function checkEmail(email) { 
	var pattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var emailVal = $("#" + email).val();
	return pattern.test(emailVal);
}