import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';
import RoomService from './RoomService';



class Hotel {
  constructor(users, rooms, bookings, roomServiceOrders) {
    this.customers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServiceOrders = roomServiceOrders;
    this.todaysDate;
    this.currentCustomer;
  }

  hotelHelper() {
    this.instantiateCustomersHelper();
    this.instantiateRooms();
    this.instantiateBookings();
    this.instantiateRoomService();
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

  
  findCustomerByName(name) {
    let currentUser = this.customers.find(customer => customer.name === name);
    this.currentCustomer = currentUser;
    return currentUser;
  }

  findCustomerById(id) {
      console.log("id", id)
    let currentUser = this.customers.find(customer => customer.id === id);
    console.log("**", currentUser)
    this.currentCustomer = currentUser;
    console.log(this.currentCustomer)
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

  instantiateCustomersHelper() {
    this.customers = this.customers.map(customer => {
      let bookings = this.findCustomerBookingsInfoById(customer.id);
      let roomServiceOrders = this.findCustomerRoomServiceOrdersInfoById(customer.id);
      return new Customer(customer.name, customer.id, bookings, roomServiceOrders);
    })
    return this.customers;
  }

  createCustomer(name) {
    let id = this.customers.length + 1;
    let customer = new Customer(name, id);
    this.currentCustomer = customer;
    this.customers.push(customer);
    return customer
  }

  instantiateBookings() {
    let freshBookings = this.bookings.map(booking => {
      return booking = new Booking(booking.userID, booking.date, booking.roomNumber)
    })
    this.bookings = freshBookings;
  }

  instantiateRoomService() {
    let freshRoomService = this.roomServiceOrders.map(roomServiceOrder => {
      return roomServiceOrder = new RoomService(roomServiceOrder.userID, roomServiceOrder.date, roomServiceOrder.food, roomServiceOrder.totalCost)
    })
    this.roomServiceOrders = freshRoomService;
  }

  instantiateRooms() {
    this.freshRooms = this.rooms.map(room => {
      return room = new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    })
    this.rooms = this.freshRooms
  }

  findBookedRoomsByDate(date = this.todaysDate) {
    return this.bookings.filter(booking => booking.date === date)
  }

  findAvailableRoomsByDate(date = this.todaysDate) {
    let todaysBookedRooms = this.findBookedRoomsByDate(date).length;
    let numberOfRoomsAvailableToday = this.rooms.length - todaysBookedRooms;
    return numberOfRoomsAvailableToday;
  }

  findRoomServiceOrdersByDate(date = this.todaysDate) {
    return this.roomServiceOrders.filter(order => order.date === date)
  }

  findPercentageOfRoomsOccupied(date = this.todaysDate) {
    let totalRooms = this.rooms.length;
    let bookedRooms = this.findBookedRoomsByDate(date).length;
    let percentageOccupied = bookedRooms / totalRooms * 100;
    return parseFloat(percentageOccupied.toFixed(0))
  }

  findBookingRevenueByDate(date = this.todaysDate) {
    let bookings = this.findBookedRoomsByDate(date);
    let bookingRevenue = bookings.reduce((totalCost, booking) => {
      let room = this.rooms.find(room => room.number === booking.roomNumber)
      totalCost += room.costPerNight
      return totalCost
    }, 0)
    return parseFloat(bookingRevenue.toFixed(2))
  }

  findRoomServiceRevenueByDate(date = this.todaysDate) {
    let roomServiceOrders = this.findRoomServiceOrdersByDate(date);
    let orderRevenue =  roomServiceOrders.reduce((totalServiceRevenue, order) => {
      totalServiceRevenue += order.totalCost
      return totalServiceRevenue
    }, 0)
    return parseFloat(orderRevenue.toFixed(2))
  }

  findTotalRevenueByDate(date = this.todaysDate) {
    let bookingRevenue = this.findBookingRevenueByDate(date);
    let roomServiceRevenue = this.findRoomServiceRevenueByDate(date);
    let totalRevenue = bookingRevenue + roomServiceRevenue;
    return totalRevenue;
  }








}

export default Hotel