class Hotel {
  constructor(users, rooms, bookings, roomServiceOrders) {
    this.customers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServiceOrders = roomServiceOrders;
    this.todaysDate;
    this.currentCustomer;
  }

  findTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let todayFormat = yyyy + '/' + mm + '/' + dd;
    this.todaysDate = todayFormat;
    return this.todaysDate;
  }

  instantiateCustomersHelper() {
      this.customers = this.customers.map(customer => {
          let bookings = this.findCustomerBookingsInfoById(customer.id);
          let roomServiceOrders = this.findCustomerRoomServiceOrdersInfoById(customer.id);
          return new Customer(customer.id, customer.name, bookings, roomServiceOrders)
      })
  }
  findCustomerByName(name) {
    let currentUser = this.customers.find(customer => customer.name === name);
    return currentUser;
  }

  findCustomerById(id) {
    let currentUser = this.customers.find(customer => customer.id === id);
    return currentUser;
  }

  findCustomerBookingsInfoById(id) {
    let currentUserBookingInfo = this.bookings.filter(booking => booking.userID === id);
    return currentUserBookingInfo;
  }

  findCustomerRoomServiceOrdersInfoById(id) {
    let currentUserRoomServiceOrders = this.roomServiceOrders.filter(order => order.userID === id);
    return currentUserRoomServiceOrders;
  }


}

module.exports = Hotel;