import $ from 'jquery';

const domUpdates =  {

  appendMainTabDefault(hotel) {
    $('.todays-date').text(hotel.findTodaysDate());
    $('.todays-total-rooms-available').text((hotel.findAvailableRoomsByDate()).toLocaleString('en'));
    $('.todays-total-percentage-occupied').text(hotel.findPercentageOfRoomsOccupied() + '%');
    $('.todays-room-service-revenue').text('$' + hotel.findRoomServiceRevenueByDate().toLocaleString('en'));
    $('.todays-total-booking-revenue').text('$' + hotel.findBookingRevenueByDate().toLocaleString('en'));
    $('.todays-total-revenue').text('$' + hotel.findTotalRevenueByDate().toLocaleString('en'));
  },
    
  appendDropDownList(hotel) {
    hotel.customers.forEach((customer) => {
      let option = document.createElement('option');
      option.val = customer.id;
      option.text = customer.name;
      $('#customer-select-dropdown').append(option);
    });
  },

  newCustomerEntered(hotel, name) {
    hotel.createCustomer(name);
    $('.guide-display').text(name);
  },

  customerSelected(hotel, name) {
    hotel.findCustomerByName(name);
    $('.guide-display').text(name);
  }
}

export default domUpdates

