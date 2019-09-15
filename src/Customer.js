class Customer {
  constructor(name, id, bookings = [], roomServiceOrders = []) {
    this.name = name;  
    this.id = id;
    this.bookings = bookings;
    this.roomServiceOrders = roomServiceOrders;
  }
}

export default Customer
