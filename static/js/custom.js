$(document).ready(function(){
    $('.trusted').owlCarousel({
        loop:true,
        responsiveClass:true,
            navText : ["",""],
            rewindNav : true,
        responsive:{
            320:{
                items:1,
                nav:false,
                dots:true
            },
            600:{
                items:2,
                nav:true,
                dots:false
            },
            1000:{
                items:3,
                nav:true,
                dots:false,

            }
        }
    });

    $('.bloxPopup').lightboxController({
        appendRegion:   '.sec-button',
        opened:         function(){console.log("overlay opened");},
        closed:         function(){console.log("overlay closed");}
    });
    
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $(".modal-body iframe").attr('src');
    
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $(".modal-body iframe").attr('src', '');
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $(".modal-body iframe").attr('src', url);
    });     
    
        // Add active class to the current button (highlight it)
    var header = document.getElementById("menu");
    var btns = header.getElementsByClassName("nav-link");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        });
    }
    
        // Add active class to the current button (highlight it)
    var header = document.getElementById("secondary-menu");
    var btns = header.getElementsByClassName("nav-link");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active1");
        current[0].className = current[0].className.replace(" active1", "");
        this.className += " active1";
        });
    }
});