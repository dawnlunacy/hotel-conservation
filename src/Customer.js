import Booking from "./Booking";

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
    console.log("typeOfDate", typeof date)
    let roomNumberEdit = parseInt(roomNumber)
    console.log("typeOfNumber", typeof roomNumberEdit)
    console.log("INSIDE BEFORE", this.bookings)
    let findBookingToCancel = this.bookings.filter(booking => booking.date === date && booking.roomNumber === roomNumberEdit)
    // let findGoodBookings = this.bookings.filter(booking => booking.date === date).filter(booking => booking.roomNumber === roomNumberEdit)
    console.log("INSIDE FINDGOODBOOKINGS", findBookingToCancel)
    this.bookings = this.bookings.filter(booking => booking !== findBookingToCancel[0])
    console.log("FINALBOOKINGS", this.bookings)

    // console.log("INSIDE CANCEL", this.bookings)
  }

  addBooking(date, roomNumber) {
    console.log("BEFORE ANYTHING", this.bookings)
    let booking = new Booking(this.id, date, roomNumber);
    console.log("DID I MAKE AN INSTANCE?", booking)
    this.bookings.push(booking);
    console.log("BOOKING MADE?", this.bookings)
    return booking;
  }

  
}

export default Customer
