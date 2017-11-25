$(document).ready(function() {
    $('.js--ideal-weight').hide();

    /* Popup login form */

    $(document).ready(function() {
        $('.popup-with-form').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',

            // When elemened is focused, some mobile browsers in some cases zoom in
            // It looks not nice, so we disable it:
            callbacks: {
                beforeOpen: function() {
                    if($(window).width() < 767) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });
    });

    /* Popup ajax window */

    $(document).ready(function() {

    	$('.simple-ajax-popup-align-top').magnificPopup({
    		type: 'ajax',
    		alignTop: true,
    		overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
    	});

    	$('.simple-ajax-popup').magnificPopup({
    		type: 'ajax'
    	});

    });


    /* Stock name length truncate */



    /* Stock price */

    $('.js--stock-pick-price').click(function() {
        $('.js--stock-pick-price').hide(0);
        $('.js--ideal-weight').fadeIn(200);
    });

    $('.js--ideal-weight').click(function() {
        $('.js--ideal-weight').hide(0);
        $('.js--stock-pick-price').fadeIn(200);
    });





});
