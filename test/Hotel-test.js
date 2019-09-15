import mockData from '../mock-data/mockData';
import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
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
    hotel.instantiateCustomersHelper();
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
      expect(hotel.findTodaysDate()).to.equal('2019/09/15')
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


})

