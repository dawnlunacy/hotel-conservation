class Hotel {
  constructor(users, rooms, bookings, roomServiceOrders) {
    this.customers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServiceOrders = roomServiceOrders;
    this.todaysDate;

  }

  findTodaysDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    let todayFormat = yyyy + '/' + mm + '/' + dd
    this.todaysDate = todayFormat
    return this.todaysDate
  }
}

module.exports = Hotel;