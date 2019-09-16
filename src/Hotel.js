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
  

}

export default Hotel