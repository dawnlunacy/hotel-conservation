import mockData from '../mock-data/mockData';
import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import Room from '../src/Room';
import Booking from '../src/Booking';
import RoomService from '../src/RoomService';
import chai from 'chai';
import spies from 'chai-spies';
const expect = chai.expect;
chai.use(spies);
const users = mockData.users;
const rooms = mockData.rooms;
const bookings = mockData.bookings;
const roomServiceOrders = mockData.roomServiceOrders;

let hotel;

describe('Hotel', () => {
  beforeEach(() => {
    hotel = new Hotel(users, rooms, bookings, roomServiceOrders)
    hotel.hotelHelper();
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function')
  });

  it('should instantiate an new instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  });

  it('should hold the a list of customers', () => {
    expect(hotel.customers.length).to.be.eql(users.length)
  });

  it('should store the customer list accurately by having the total number of customers correct', () => {
    expect(hotel.customers.length).to.equal(30)
  });

  it('should find all customers in database', () => {
    expect(hotel.customers).to.be.an('array');
  });

  it('should hold the a list of bookings', () => {
    expect(hotel.bookings).to.be.eql(bookings)
  });

  it('should store the bookings list accurately', () => {
    expect(hotel.bookings.length).to.equal(30)
  });

  it('should hold the a list of room service orders', () => {
    expect(hotel.roomServiceOrders).to.be.eql(roomServiceOrders)
  });

  it('should store the room service orders accurately by having the total number of orders correct', () => {
    expect(hotel.roomServiceOrders.length).to.equal(30)
  });

  it('should hold the a list all rooms', () => {
    expect(hotel.rooms).to.eql(rooms)
  });

  it('should store the total rooms accurately', () => {
    expect(hotel.rooms.length).to.equal(30)
  });

  describe('findTodaysDate', () => {
    it('should return the current date on which the method was invoked', () => {
      expect(hotel.findTodaysDate()).to.equal('2019/09/18')
    });
  });

  describe('findCustomerByName', () => {
    it('should return the specific customer being search for', () => {
      expect(hotel.findCustomerByName("Noemy Little")).to.eql({id: 5,
        name: 'Noemy Little',
        bookings: [
          { userID: 5, date: '2019/09/26', roomNumber: 26 },
          { userID: 5, date: '2019/08/02', roomNumber: 9 }
        ],
        roomServiceOrders: [
          {
            userID: 5,
            date: '2019/09/26',
            food: 'Fantastic Cotton Sandwich',
            totalCost: 17.61
          },
          {
            userID: 5,
            date: '2019/08/02',
            food: 'Tasty Granite Sandwich',
            totalCost: 20.84
          }]
      });
    });
  });

  describe('findCustomerById', () => {
    it('should return the specific customer being search for', () => {
      expect(hotel.findCustomerById(11)).to.eql({
        id: 11,
        name: 'Amiya Effertz',
        bookings: [ { userID: 11, date: '2019/09/22', roomNumber: 23 } ],
        roomServiceOrders: [
          {
            userID: 11,
            date: '2019/10/22',
            food: 'Unbranded Wooden Sandwich',
            totalCost: 12.83
          }
        ]});
    });
  });

  describe('findCustomerBookingsInfoById', () => {
    it('should find the customers bookings and room service orders', () => {
      expect(hotel.findCustomerBookingsInfoById(5)).to.eql([
        {
          userID: 5,
          date: "2019/08/02",
          roomNumber: 9
        },
        {
          userID: 5,
          date: "2019/09/26",
          roomNumber: 26
        }
      ])
    })
  })

  describe('findCustomerRoomServiceOrdersInfoById', () => {
    it('should find the customers room service orders', () => {
      expect(hotel.findCustomerRoomServiceOrdersInfoById(5)).to.eql([
        {
          userID: 5,
          date: "2019/09/26",
          food: "Fantastic Cotton Sandwich",
          totalCost: 17.61
        },
        {
          userID: 5,
          date: "2019/08/02",
          food: "Tasty Granite Sandwich",
          totalCost: 20.84
        }
      ])
    })
  })

  describe('instantiateCustomersHelper', () => {
    it('should find the customers bookings and orders', () => {
      chai.spy.on(hotel, ['findCustomerBookingsInfoById', 'findCustomerRoomServiceOrdersInfoById'], () => {});
      hotel.instantiateCustomersHelper();
      expect(hotel.findCustomerBookingsInfoById).to.have.been.called(30);
      expect(hotel.findCustomerRoomServiceOrdersInfoById).to.have.been.called(30);
    })
  })

  describe('createCustomer', () => {
    it('should be able to take in a new customer taking in only a name', () => {
      expect(hotel.createCustomer("Lacy Dawn")).to.be.an.instanceOf(Customer)
    })
    it('should create a new id for the new customer', () => {
      hotel.createCustomer("Lacy Dawn")
      let index = hotel.customers.length - 1;
      expect(hotel.customers[index].id).to.eql(hotel.customers.length)
    })
  })

  describe('instantiateRooms', () => {
    it('should create all room info as an actual instance of room', () => {
      expect(hotel.rooms[1]).to.be.an.instanceOf(Room);
    })
  })

  describe('instantiateBookings', () => {
    it('should create all booking info as an actual instance of booking', () => {
      expect(hotel.bookings[1]).to.be.an.instanceOf(Booking);
    })
  })

  describe('instantiateRoomServiceOrders', () => {
    it('should create all booking info as an actual instance of booking', () => {
      expect(hotel.roomServiceOrders[1]).to.be.an.instanceOf(RoomService);
    })
  })

  describe('instantiateBookings', () => {
    it('should create all booking info as an actual instance of booking', () => {
      expect(hotel.bookings[1]).to.be.an.instanceOf(Booking);
    })
  })

  describe('findBookedRoomsByDate', () => {
    it('should find all rooms that are booked for a specified date', () => {
      expect(hotel.findBookedRoomsByDate("2019/09/30")).to.eql([
        {
          userID: 3,
          date: "2019/09/30",
          roomNumber: 28
        },
        {
          userID: 14,
          date: "2019/09/30",
          roomNumber: 20
        }])
    })
  })

  describe('findAvailableRoomsByDate', () => {
    it('should find all rooms available for today ie: all unbooked rooms', () => {
      expect(hotel.findAvailableRoomsByDate("2019/09/30")).to.equal(28)
    });
  });

  describe('findRoomServiceOrdersByDate', () => {
    it('should find all of todays room service charges', () => {
      expect(hotel.findRoomServiceOrdersByDate('2019/09/29')).to.eql( 
        [{
          userID: 2,
          date: "2019/09/29",
          food: "Rustic Cotton Sandwich",
          totalCost: 17.33
        },
        {
          userID: 3,
          date: "2019/09/29",
          food: "Sleek Frozen Sandwich",
          totalCost: 15.24
        }
        ])
    });
  });

  describe('findPercentageOfRoomsOccupied', () => {
    it('should calculate the percentage of rooms that are occupied for the date specified', () => {
      expect(hotel.findPercentageOfRoomsOccupied("2019/09/30")).to.equal(7)
    });
  });

  describe('findBookingRevenueByDate', () => {
    it('should return the total revenue of bookings for a specific date', () => {
      expect(hotel.findBookingRevenueByDate("2019/09/30")).to.equal(572.48)
    })
  })

  describe('findRoomServiceRevenueByDate', () => {
    it('should return the total revenue of room service orders for a specific date', () => {
      expect(hotel.findRoomServiceRevenueByDate("2019/09/30")).to.equal(33.74)
    })
  })

  describe('findTotalRevenueByDate', () => {
    it('should return the total revenue for a specific date', () => {
      expect(hotel.findTotalRevenueByDate("2019/09/30")).to.equal(606.22)
    })
  })

})

