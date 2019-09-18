import Booking from "./Booking";
import RoomService from "./RoomService"

class Customer {
  constructor(name, id, bookings = [], roomServiceOrders = []) {
    this.name = name;  
    this.id = id;
    this.bookings = bookings.sort((a, b) => b.date.localeCompare(a.date));
    this.roomServiceOrders = roomServiceOrders;
  }

  findRoomServiceCostTotalEver() {
    let roomServiceOrders = this.roomServiceOrders;
    let orderTotal =  roomServiceOrders.reduce((totalServiceRevenue, order) => {
      totalServiceRevenue += order.totalCost
      return totalServiceRevenue
    }, 0);
    return parseFloat(orderTotal.toFixed(2))
  }

  cancelBooking(date, roomNumber) {
    let roomNumberEdit = parseInt(roomNumber)
    let findBookingToCancel = this.bookings.filter(booking => booking.date === date && booking.roomNumber === roomNumberEdit);
    this.bookings = this.bookings.filter(booking => booking !== findBookingToCancel[0]);
    return findBookingToCancel;
  }

  addBooking(date, roomNumber) {
    let roomNumberInt = parseInt(roomNumber)
    let booking = new Booking(this.id, date, roomNumberInt);
    this.bookings.push(booking);
    return booking;
  }

  addFoodOrder(date, order, cost) {
    let roomServiceOrder = new RoomService(this.id, date, order, cost);
    console.log("roomServiceOrder", roomServiceOrder)
    console.log("before", this.roomServiceOrders.length)
    this.roomServiceOrders.push(roomServiceOrder)
    console.log("after", this.roomServiceOrders.length)
  }

  
}

export default Customer
