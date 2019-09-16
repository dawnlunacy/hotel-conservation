// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/plant.svg'

console.log('This is the JavaScript entry file - your code begins here.');


$(function() {
  $('.tab-labels .tabs li').on('click', function() {
    let $tabLabel = $(this).closest('.tab-labels');

  
    console.log("tabby", $tabLabel.find('.tabs li.active').attr('rel'))
    let $tabToHideId = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-default'
    console.log("tabbyTOHIDE", $tabToHideId)
     $($tabToHideId).hide() 


    $tabLabel.find('.tabs li.active').removeClass('active');
    $(this).addClass('active');

    

    let $tabToShow = $(this).attr('rel');

    $tabLabel.find('.tabLabel-active').slideToggle(200, showCurrentTab());

    function showCurrentTab() {
      $(this).removeClass('active');
      console.log("THIS", $(this))
      
          

        let $tabToShowId = '#' + $tabToShow + '-default'
        console.log("YO", $tabToShowId)
      $($tabToShowId).slideDown(200, function() {
        $(this).addClass('active');
      });
    }
 
  })
});

