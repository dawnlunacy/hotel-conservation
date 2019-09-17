import Customer from './Customer';
import Room from './Room';
import Booking from './Booking';
import RoomService from './RoomService';



class Hotel {
  constructor(users, rooms, bookings, roomServiceOrders) {
    this.customers = users;
    this.rooms = rooms;
    this.bookings = bookings.sort((a, b) => a.date.localeCompare(b.date));
    console.log(this.bookings)
    this.roomServiceOrders = roomServiceOrders;
    console.log(this.roomServiceOrders.sort((a, b) => a.date.localeCompare(b.date)));
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
    let currentUser = this.customers.find(customer => customer.id === id);
    this.currentCustomer = currentUser;
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

  findActualAvailableRoomsByDate(date = this.todayDate) {
    let bookedRoomNumbersOnDate = this.findBookedRoomsByDate(date).map(room => room.roomNumber);
    let availableRooms = this.rooms.reduce((acc, currentRoom) => {
        if (!bookedRoomNumbersOnDate.includes(currentRoom.number)) {
            acc.push(currentRoom)
        }
        return acc
    }, [])
console.log("answer", availableRooms)
    console.log("bookedRooms", bookedRoomNumbersOnDate);
    return availableRooms;
  
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

  findRoomServiceOrderByDate(date = this.todaysDate) {
    let roomServiceOrders =  this.roomService.filter(order => order.date === date)
    return roomServiceOrders;
  }

  findDateWithMostRoomsAvailable() {
    var confirmedBookings = [...new Set(this.bookings.map(booking => booking.date ))];
    let confirmedBookingsTodayOn = confirmedBookings.filter(date => date >= this.findTodaysDate());
    var bookingTotalPossible = confirmedBookingsTodayOn.length
    let leastPopularDates = confirmedBookingsTodayOn.reduce((finalDates, bookingDate) => {
      let bookingCountToday = this.findBookedRoomsByDate(bookingDate).length;
      if (bookingCountToday < finalDates.bookingsCounter ) {
        finalDates.date.splice(0, finalDates.date.length, bookingDate);
        finalDates.bookingsCounter = bookingCountToday
      }
      else if (bookingCountToday === finalDates.bookingsCounter ) {
        finalDates.date.splice(finalDates.date.length, 0, bookingDate)
        finalDates.bookingsCounter = bookingCountToday;
      }
      return finalDates
    }, {date: [],
      bookingsCounter: bookingTotalPossible })
    return leastPopularDates.date
  } 

  findMostPopularBookingDate() {
    let confirmedBookings = [...new Set(this.bookings.map(booking => booking.date))];
    let mostpopularDates = confirmedBookings.reduce((finalObj, bookingDate) => {
      let bookingCountToday = this.findBookedRoomsByDate(bookingDate).length;
      if (bookingCountToday > finalObj.bookingsCounter ) {
        finalObj.date.splice(0, finalObj.date.length, bookingDate)
        finalObj.bookingsCounter = bookingCountToday
      } else if (bookingCountToday === finalObj.bookingsCounter ) {
        finalObj.date.splice(finalObj.date.length, 0, bookingDate)
        finalObj.bookingsCounter = bookingCountToday
      }
      return finalObj
    }, {date: [],
      bookingsCounter: 0 })
       
    return mostpopularDates.date
  }

  findCostOfRoom(roomNumber) {
    return this.rooms.filter(room => room.number === roomNumber)[0].costPerNight;
  }

  

  

    






}

export default Hotel