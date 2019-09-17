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
    let alphabeticalCustomers = hotel.customers.sort((a, b) => a.name.localeCompare(b.name))
    alphabeticalCustomers.forEach((customer) => {
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
  },

  appendMostPopularDate(hotel) {
    let dateData = hotel.findMostPopularBookingDate()
    if (dateData.length === 1) {
      $('.most-popular-booking-date').text(dateData)
    } else {
      dateData.forEach(date => $('.most-popular-booking-date').append(`<li>${date}</li>`))  
    }
  },

  appendMostAvailableRoomsDate(hotel) {
    let dateData = hotel.findDateWithMostRoomsAvailable()
    if (dateData.length === 1) {
      $('.greatest-availability-date').text(dateData)
    } else {
      dateData.forEach(date => $('.greatest-availability-date').append(`<li>${date}</li>`))  
    }
  },

  loadOrderTableMain(hotel) {
    let orderData = hotel.findRoomServiceOrdersByDate();
    $('.todays-room-service-orders-main').text(orderData.length);
    const orderTableBodyMain = $('#table-order-data-main');
    let dataHtml = '';
    orderData.forEach((order) => {
      let customer = hotel.findCustomerById(order.userID)
      dataHtml += `<tr><td>${order.userID}</td><td>${customer.name}</td><td>${order.food}</td><td> $${order.totalCost}</td></tr>`
    })
    orderTableBodyMain.append(dataHtml)
  },

  loadOrderTableDefault(hotel, date = hotel.findTodaysDate()) {
    let orderData = hotel.findRoomServiceOrdersByDate(date);
    $('.todays-room-service-orders').text(orderData.length);
    const orderTableBody = $('#table-order-data');
    let dataHtml = '';
    orderData.forEach((order) => {
      let customer = hotel.findCustomerById(order.userID)
      dataHtml += `<tr><td>${order.userID}</td><td>${customer.name}</td><td>${order.food}</td><td> $${order.totalCost}</td></tr>`
    })
    orderTableBody.append(dataHtml)
  },

  prepOrderTableDefault(date) {
    $('.todays-room-service-orders').text(' ');
    $('#table-order-data').text('')
    $('.order-default-date').text(date)
  },

  loadBookingsTable(hotel) {
    let bookingData = hotel.findBookedRoomsByDate();
    $('.todays-bookings-details').text(bookingData.length);
    const bookingTableBody = $('#bookings-default-table-data');
    let dataHtml = '';
    bookingData.forEach((booking) => {
      let customer = hotel.findCustomerById(booking.userID)
      let costOfRoom = hotel.findCostOfRoom(booking.roomNumber);
      dataHtml += `<tr><td>${booking.userID}</td><td>${customer.name}</td><td> ${booking.roomNumber}</td><td> $${costOfRoom}</td>`
    })
    bookingTableBody.append(dataHtml);
  },

  setDefaultValueForCalendars() {
    let dateControls = document.querySelectorAll('input[type="date"]');
    let today = new Date().toISOString().slice(0, 10)
    dateControls.forEach(control => control.value = today);
  }
}

export default domUpdates

