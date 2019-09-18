import $ from 'jquery';

const domUpdates =  {

  appendMainTabDefault(hotel) {
    hotel.findTodaysDate();
    this.displayDateFormat();
    $('.todays-total-rooms-available').text((hotel.findAvailableRoomsByDate()).toLocaleString('en'));
    $('.todays-total-percentage-occupied').text(hotel.findPercentageOfRoomsOccupied() + '%');
    $('.todays-room-service-revenue').text('$' + hotel.findRoomServiceRevenueByDate().toLocaleString('en'));
    $('.todays-total-booking-revenue').text('$' + hotel.findBookingRevenueByDate().toLocaleString('en'));
    $('.todays-total-revenue').text('$' + hotel.findTotalRevenueByDate().toLocaleString('en'));
  },
    
  appendDropDownList(hotel) {
    $('#customer-select-dropdown').empty()
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
    $('.customer-name').text(name);
  },

  customerSelected(hotel, name) {
    hotel.findCustomerByName(name);
    $('.guide-display').text(name);
    $('.customer-name').text(name);

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

  loadOrderTableCustomerSelected(hotel) {
    this.prepOrderTableCustomerSelected();
    let orderData = hotel.currentCustomer.roomServiceOrders;
    $('.customer-order-history-total').text(orderData.length);
    $('.customer-order-history-cost').text(`$${hotel.currentCustomer.findRoomServiceCostTotalEver()}`)
    const orderTableBody = $('#table-order-customer-data');
    let dataHtml = '';
    orderData.forEach((order) => {
      dataHtml += `<tr><td>${order.userID}</td><td>${order.date}</td><td>${order.food}</td><td>$${order.totalCost}</td></tr>`
    })
    orderTableBody.append(dataHtml)
  },

  prepOrderTableDefault(date) {
    $('.todays-room-service-orders').text(' ');
    $('#table-order-data').text('')
    $('.order-default-date').text(date)
  },

  prepOrderTableCustomerSelected() {
    $('#table-order-customer-data').text('')
  },

  loadBookingsTable(hotel) {
    this.prepMainTable();
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

  prepMainTable() {
    $('.todays-bookings-details').text(' ');
    $('#bookings-default-table-data').text(' ');
  },

  prepBookingsTableDefault(date) {
    $('.todays-bookings-details').text(' ');
    $('#rooms-available-data').text('');
    $('.rooms-available-default-date').text(date)
  },

  loadAvailableRoomsTableDefault(hotel, date = hotel.findTodaysDate()) {
    let availableRoomData = hotel.findActualAvailableRoomsByDate(date);
    $('.total-rooms-available-default').text(availableRoomData.length);
    const availableRoomsTableBody = $('#rooms-available-data');
    let dataHtml = '';
    availableRoomData.forEach((room) => {
      dataHtml += `<tr><td>${room.number}</td><td>${room.roomType}</td><td>${room.bidet}</td><td> ${room.numBeds}</td><td>${room.bedSize}</td><td> $${room.costPerNight}</td></tr>`
    })
    availableRoomsTableBody.append(dataHtml);
  },

  loadCurrentBookingHistoryForCustomer(hotel) {
    this.prepCurrentBookingsHistoryForCustomer();
    let doesCustomerHaveBookingForToday = hotel.checkIfTodayHasBookingForCurrentCustomer();
    if (doesCustomerHaveBookingForToday === "YES") {
      $('.book-room-today-btn').attr("disabled", true);
    } else {
      $('.book-room-today-btn').attr("disabled", false);
    }
    $('.customer-booking-today-boolean').text(doesCustomerHaveBookingForToday)
    let currentBookings = hotel.findCurrentBookingsForCurrentCustomer();
    $('.current-bookings-total-number').text(currentBookings.length);
    const CurrentBookingsInfo = $('#current-bookings-customer-data');
    let dataHtml = '';
    currentBookings.forEach((booking) => {
      dataHtml += `<tr><td>${booking.userID}</td><td>${booking.date}</td><td>${booking.roomNumber}</td><td><button class="cancel ${booking.date}" id=${booking.roomNumber}> Cancel</button></td><tr>`
    })
    CurrentBookingsInfo.append(dataHtml);
  },

  prepCurrentBookingsHistoryForCustomer() {
    $('#current-bookings-customer-data').text('');
    $('.customer-booking-today-boolean').text('');
  },

  loadPastBookingHistoryForCustomer(hotel) {
    this.prepPastBookingsHistoryForCustomer();
    let bookingHistory = hotel.findPastBookingsForCurrentCustomer();
    $('.past-bookings-total-number').text(bookingHistory.length);
    const bookedRoomHistory = $('#past-bookings-customer-data');
    let dataHtml = '';
    bookingHistory.forEach((booking) => {
      dataHtml += `<tr><td>${booking.userID}</td><td>${booking.date}</td><td>${booking.roomNumber}</td>`
    })
    bookedRoomHistory.append(dataHtml);
  },

  prepPastBookingsHistoryForCustomer() {
    $('#past-bookings-customer-data').text('')
  },

  setDefaultValueForCalendars() {
    let dateControls = document.querySelectorAll('input[type="date"]');
    let today = new Date().toISOString().slice(0, 10)
    dateControls.forEach(control => control.value = today);
  },

  displayDateFormat() {
    let date = new Date()
    let formatDate = date.toString().split(' ').slice(0, 4).join(' ');
    $('.todays-date').text(formatDate);

  },

  cancelCustomerBookings(hotel, date, roomNumber) {
    let bookingToCancel = hotel.currentCustomer.cancelBooking(date, roomNumber)
    hotel.removeBooking(bookingToCancel)
  },

  loadAvailableRoomsFilteredForCustomer(hotel, roomType, date = hotel.findTodaysDate()) {
    this.prepAvailableRoomFilteredTable();
    let availableRoomData = hotel.findActualAvailableRoomsByType(roomType, date);
    $('.display-filtered-room-available-today').show()
    $('.rooms-available-filter-date').text(date);
    $('.total-rooms-available-filter').text(availableRoomData.length);
    const availableRoomsTableBody = $('#rooms-available-filter-data');
    let dataHtml = '';
    availableRoomData.forEach((room) => {
      dataHtml += `<tr><td>${room.number}</td><td>${room.roomType}</td><td>${room.bidet}</td><td> ${room.numBeds}</td><td>${room.bedSize}</td><td> $${room.costPerNight}</td><td><button class="book ${date}" id=${room.number}> Book </button></td></tr>`
    })
    availableRoomsTableBody.append(dataHtml);
  },

  prepAvailableRoomFilteredTable() {
    $('#rooms-available-filter-data').text('')
    $('.display-filtered-room-available-today').hide();
  },

  addCustomerBookings(hotel, date, roomNumber) {
    let booking = hotel.currentCustomer.addBooking(date, roomNumber);
    hotel.addBooking(booking);
    $('.select-room-by-type').hide();
    $('.display-filtered-room-available-today').hide();
  }

}

export default domUpdates
