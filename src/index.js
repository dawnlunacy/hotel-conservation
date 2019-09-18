
import $ from 'jquery';
import Hotel from './Hotel';
import domUpdates from './domUpdates';
import './css/base.scss';
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
  })
  .catch(error => console.log(error));
   
  
function instantiateHotel(users, bookings, roomServices, rooms) {
  hotel = new Hotel(users, bookings, roomServices, rooms);
  hotel.hotelHelper();
  domUpdates.appendMainTabDefault(hotel);
  domUpdates.appendDropDownList(hotel);
  domUpdates.appendMostAvailableRoomsDate(hotel);
  domUpdates.appendMostPopularDate(hotel);
  domUpdates.loadOrderTableMain(hotel);
  domUpdates.loadOrderTableDefault(hotel);
  domUpdates.loadBookingsTable(hotel);
  domUpdates.loadAvailableRoomsTableDefault(hotel);
  domUpdates.setDefaultValueForCalendars();
  hotel.makeMenu();
  
}

$(function() {
  $('.tab-labels .tabs li').on('click', function() {
    let $tabLabel = $(this).closest('.tab-labels');

    let $tabToHideId = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-default'
    let $tabToHideId2 = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-customer-selected'
    $($tabToHideId).hide();
    $($tabToHideId2).hide();
    

    $tabLabel.find('.tabs li.active').removeClass('active');
    $(this).addClass('active');

    let $tabToShow = $(this).attr('rel');
    
    $tabLabel.find('.tabLabel-active').slideToggle(200, showCurrentTab());

    function showCurrentTab() {
      if ($('.guide-display').text() === ' Welcome Admin ') {
        let $tabToShowId = '#' + $tabToShow + '-default'
        $($tabToShowId).slideDown(200, function() {
          $(this).addClass('active');
        });
      }
      if ($('.guide-display').text() !== ' Welcome Admin ' || $tabToShow === 'main' || $tabToShow === 'customers') {
        let $tabToShowId = '#' + $tabToShow + '-default'
        $($tabToShowId).slideDown(200, function() {
          $(this).addClass('active');
        });
      } 
      if ($('.guide-display').text() !== ' Welcome Admin ' && $tabToShow === 'rooms') {
        let $tabToHideId = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-default'
        $($tabToHideId).hide() ;
        let $tabToShowId = '#' + $tabToShow + '-customer-selected'
        $($tabToShowId).slideDown(200, function() {
          $(this).addClass('active');
        });
      }
      if ($('.guide-display').text() !== ' Welcome Admin ' && $tabToShow === 'orders') {
        let $tabToHideId = '#' + $tabLabel.find('.tabs li.active').attr('rel') + '-default'
        $($tabToHideId).hide();
        let $tabToShowId = '#' + $tabToShow + '-customer-selected'
        $($tabToShowId).slideDown(200, function() {
          $(this).addClass('active');
        });
      }
      
    }
  })

  $('#customer-select-dropdown').on('change', function() {
    let name = (this.value);
    domUpdates.customerSelected(hotel, name);
    domUpdates.loadOrderTableCustomerSelected(hotel);
    domUpdates.loadCurrentBookingHistoryForCustomer(hotel);
    domUpdates.loadPastBookingHistoryForCustomer(hotel);
  });

  $('.new-user-btn').on('click', function() {
    let name = $('.new-user-input').val();
    domUpdates.newCustomerEntered(hotel, name);
    domUpdates.appendDropDownList(hotel);
    domUpdates.customerSelected(hotel, name);
    domUpdates.loadOrderTableCustomerSelected(hotel);
    domUpdates.loadCurrentBookingHistoryForCustomer(hotel);
    domUpdates.loadPastBookingHistoryForCustomer(hotel);

  })

  $('#calendar').on('change', function() {
    let date = new Date($('#calendar').val());
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let dateSelected = [yyyy, mm, dd].join('/');
    return dateSelected;
  })

  $('.available-booking-date-default-btn').on('click', function(e) {
    e.preventDefault();
    let fixedDate = $('#calendar-booking-default').val().replace(/-/g, '\/')
    let date = new Date(fixedDate);
    let dateString = date.toString().split(' ').slice(0, 4).join(' ');
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let dateSelected = [yyyy, mm, dd].join('/');
    domUpdates.prepBookingsTableDefault(dateString);
    domUpdates.loadAvailableRoomsTableDefault(hotel, dateSelected);
    return dateSelected;
  })

  $('.order-date-default-btn').on('click', function(e) {
    e.preventDefault();
    let fixedDate = $('#calendar-orders-default').val().replace(/-/g, '\/')
    let date = new Date(fixedDate);
    let dateString = date.toString().split(' ').slice(0, 4).join(' ');
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let dateSelected = [yyyy, mm, dd].join('/');
    domUpdates.prepOrderTableDefault(dateString);
    domUpdates.loadOrderTableDefault(hotel, dateSelected);
    return dateSelected;
  })

  $('#current-bookings-customer-data').on('click', '.cancel', function(e) {
    e.preventDefault();
    let date = $(this)[0].classList[1];
    let roomNumber = $(this)[0].id;
    domUpdates.cancelCustomerBookings(hotel, date, roomNumber);
    domUpdates.loadCurrentBookingHistoryForCustomer(hotel);
    domUpdates.loadBookingsTable(hotel);
    domUpdates.appendMainTabDefault(hotel);
  })


  $('.book-room-today-btn').on('click', function(e) {
    e.preventDefault();
    $('.select-room-by-type').show();
  })

  $('#room-type-select-dropdown').on('change', function(e) {
    e.preventDefault();
    let roomType = $('#room-type-select-dropdown option:selected').val();
    domUpdates.loadAvailableRoomsFilteredForCustomer(hotel, roomType);
  })

  $('#rooms-available-filter-data').on('click', '.book', function(e) {
    e.preventDefault();
    let date = $(this)[0].classList[1];
    let roomNumber = $(this)[0].id;
    domUpdates.addCustomerBookings(hotel, date, roomNumber);
    domUpdates.loadCurrentBookingHistoryForCustomer(hotel);
    domUpdates.loadBookingsTable(hotel);
    domUpdates.appendMainTabDefault(hotel);
  })

  $('.add-room-order-today-btn').on('click', function(e) {
    e.preventDefault();
    domUpdates.loadMenu(hotel);
  })

  $('#menu-data').on('click', '.order-food', function(e) {
    e.preventDefault();
    let date = hotel.findTodaysDate();
    let foodItem = $(this)[0].classList[1];
    let costConvert = parseFloat(($(this)[0].id));
    let costRound = parseFloat(costConvert.toFixed(2))
    let newRoomServiceOrder = hotel.currentCustomer.addFoodOrder(date, foodItem, costRound);
    domUpdates.loadOrderTableCustomerSelected(hotel);
    domUpdates.appendMainTabDefault(hotel);
    $('.display-food-menu-order-today').hide();
    hotel.roomServiceOrders.push(newRoomServiceOrder)
    $('.add-room-order-today-btn').attr('disabled', true);
    domUpdates.loadOrderTableMain(hotel);
  });

});
