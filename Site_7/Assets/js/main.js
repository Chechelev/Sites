$(document).ready(function() {
    
   
     /*SMOOTH SCROLL*/
     
     $("[data-scroll]").on("click", function(event) {
         event.preventDefault ();
         
         var $this = $(this),
             blockId = $this.data('scroll'),
             blockOffset = $(blockId).offset().top;
         
         $("#nav a").removeClass("active");
         $this.addClass("active");
         
         $("html, body").animate({
            scrollTop: blockOffset 
         }, 600);
     });
     
    

     
     /*COLLAPSE*/
     
     $("[data-collapse]").on("click", function(event){
         event.preventDefault();
         
          var $this = $(this),
             blockId = $this.data('collapse');
         
         $this.toggleClass("active");
         
     });
     
     /* SLIDER*/
     

     $('.header_burger').click(function(event){
        $('.header_burger,.menu').toggleClass('active');
        $('body').toggleClass('lock');
     });

     $('.menu a').click(function() {

        $('.header_burger,.menu').removeClass('active');
    
    });
     
     
  
 });