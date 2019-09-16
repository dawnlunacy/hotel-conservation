// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Hotel from './Hotel';
import domUpdates from './domUpdates';


// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/plant.svg'

let hotel;

let usersAPICall = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users");
let roomsAPICall = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms");
let bookingsAPICall = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings");
let roomServicesAPICall = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices");


Promise.all([usersAPICall, roomsAPICall, bookingsAPICall, roomServicesAPICall])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(finalVals => {
    let usersAPIResp = finalVals[0].users;
    let roomsAPIResp = finalVals[1].rooms;
    let bookingsAPIResp = finalVals[2].bookings;
    let roomServicesAPIResp = finalVals[3].roomServices; 
    instantiateHotel(usersAPIResp, roomsAPIResp, bookingsAPIResp, roomServicesAPIResp)
  });
//   .catch(error => console.log(error));
  


function instantiateHotel(users, bookings, roomServices, rooms) {
  hotel = new Hotel(users, bookings, roomServices, rooms);
  hotel.hotelHelper();
  domUpdates.appendMainTabDefault(hotel);
  domUpdates.appendDropDownList(hotel);
}

$(function() {
  $('.tab-labels .tabs li').on('click', function() {
    let $tabLabel = $(this).closest('.tab-labels');

    let $tabToHideId = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-default'
    $($tabToHideId).hide() 

    $tabLabel.find('.tabs li.active').removeClass('active');
    $(this).addClass('active');

    let $tabToShow = $(this).attr('rel');

    $tabLabel.find('.tabLabel-active').slideToggle(200, showCurrentTab());

    function showCurrentTab() {
      $(this).removeClass('active');

      let $tabToShowId = '#' + $tabToShow + '-default'
      $($tabToShowId).slideDown(200, function() {
        $(this).addClass('active');
      });
    }
 
  })
});

