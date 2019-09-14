class Hotel {
    constructor(users, rooms, bookings, roomServiceOrders) {
        this.customers = users;
        this.rooms = rooms;
        this.bookings = bookings;
        this.roomServiceOrders = roomServiceOrders;
    }
}

module.exports = Hotel;