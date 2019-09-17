class Customer {
  constructor(name, id, bookings = [], roomServiceOrders = []) {
    this.name = name;  
    this.id = id;
    this.bookings = bookings;
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
}

export default Customer
