// (function ($) {

//   // Loop through all sections to generate rtl styles

//   let $sectionStyles = ''; 

//   $('.shopify-section').each(function () {

//     let $styles = $(this).find('style').html();

//     $styles = $styles.replace(/left/g, 'lrtleft');
//     $styles = $styles.replace(/right/g, 'left');
//     $styles = $styles.replace(/lrtleft/g, 'right');

//     $sectionStyles += $styles+"\n";

//   });

//   if($sectionStyles) {  
//     $('footer').append('<style id="section-styles">'+$sectionStyles+'</style>');
//   }

//   // Parse framework css file to generate rtl styles

//   $.ajax({
//     url:document.styleSheets[0].href
//   })
//   .done(function($styles){

//     let $sectionStyles = '';

//     $styles = $styles.replace(/left/g, 'lrtleft');
//     $styles = $styles.replace(/right/g, 'left');
//     $styles = $styles.replace(/lrtleft/g, 'right');

//     $sectionStyles = $styles+"\n";

//     if($sectionStyles) {  
//       $('body').append('<style id="framework-styles">'+$sectionStyles+'</style>');          
//     }

//   });


// })(jQuery);

