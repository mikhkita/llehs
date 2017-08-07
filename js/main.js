$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    if( $(".b-slider").length ){
        $(".b-slider").slick({
            dots : true,
            arrows : false
        });
    }

    // setTimeout(function(){
    //     $(".b-second-1").addClass("show");
    //     setTimeout(function(){
    //         $(".b-second-1").addClass("anim");
    //         playAnim($(".b-second-1"));
    //     },10);
    // },1000);

    if( $(".b-audio").length ){
        $("body").on("click", "*", function(){
            if( !$("body").hasClass("show") ){
                return false;
            }
        });

        $("body").removeClass("show");

        var intro = introJs();

        intro.setOption("exitOnEsc", false);
        intro.setOption("exitOnOverlayClick", false);
        intro.setOption("keyboardNavigation", false);

        intro.start();
        $("#step-1")[0].volume = 0.1;
        $("#step-1")[0].play();
        $("#step-1")[0].onended = function(){
            intro.nextStep();
        };

        intro.onchange(function(targetElement) {
            var $this = $(targetElement);

            if( !$this.parents(".b").hasClass("show") ){
                $(".b.show").removeClass("show");
                $this.parents(".b").addClass("show");
                setTimeout(function(){
                    $this.parents(".b").addClass("anim");
                    if( $(".b-slider").length ){
                        $(".b-slider").slick('unslick');
                        $(".b-slider").slick({
                            dots : true,
                            arrows : false
                        });
                    }
                    playAnim($this);
                },10);
            }
            var audio = $("#step-"+$this.attr("data-step"))[0];
            audio.volume = 0.1;
            audio.play();
            audio.onended = function(){
                intro.nextStep();
            };
        }).oncomplete(function(){
            $("body, html").animate({
                scrollTop : 0
            },300);
            $("body").addClass("show").addClass("anim");
        });
    }

    function playAnim($this){
        $this.find(".anim").each(function(){
            var $el = $(this),
                delay = ($el.attr("data-delay"))?$el.attr("data-delay"):0;

            setTimeout(function(){
                $el.addClass($el.attr("data-anim")+"-show");
            }, delay);
            $el.removeClass("anim");
        });
    }

    if( $(".b-video-cross").length ){
        setTimeout(function(){
            $(".b-video-cross").addClass("show");
        },3000);
    }

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});