import mockData from '../mock-data/mockData';
import Hotel from '../src/Hotel';
// import Customer from '../src/Customer';
import chai from 'chai';
const expect = chai.expect;
const users = mockData.users;
const rooms = mockData.rooms;
const bookings = mockData.bookings;
const roomServiceOrders = mockData.roomServiceOrders;

let hotel;

describe('Hotel', () => {
  beforeEach(() => {
    hotel = new Hotel(users, rooms, bookings, roomServiceOrders)
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function')
  });

  it('should instantiate an new instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  });

  it('should hold the a list of customers', () => {
    expect(hotel.customers).to.be.eql(users)
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
      expect(hotel.findTodaysDate()).to.equal('2019/09/14')
    });
  });

  describe('findCustomerByName', () => {
    it('should return the specific customer being search for', () => {
      expect(hotel.findCustomerByName("Noemy Little")).to.eql({
        id: 5,
        name: "Noemy Little"
      });
    });
  });

  describe('findCustomerById', () => {
    it('should return the specific customer being search for', () => {
      expect(hotel.findCustomerById(11)).to.eql({
        id: 11,
        name: "Amiya Effertz"
      });
    });
  });

  describe('findCustomerBookingsInfoById', () => {
    it('should find the customers bookings and room service orders', () => {
      expect(hotel.findCustomerBookingsInfoById(5)).to.eql([
        {
          userID: 5,
          date: "2019/09/26",
          roomNumber: 26
        },
        {
          userID: 5,
          date: "2019/08/02",
          roomNumber: 9
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
});
