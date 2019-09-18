import mockData from '../mock-data/mockData';
import Customer from '../src/Customer'
import chai from 'chai';
import spies from 'chai-spies';
const expect = chai.expect;
chai.use(spies);
let bookings = mockData.bookings.filter(booking => booking.userID === 5);
let roomServiceOrders = mockData.roomServiceOrders.filter(order => order.userID === 5);


let customer;

describe('Customer', () => {
  beforeEach(() => {
    customer = new Customer("Noemy Little", 5, bookings, roomServiceOrders)
  });
  
  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  });
  
  it('should instantiate an new instance of Hotel', () => {
    expect(customer).to.be.an.instanceOf(Customer)
  });
  
  it('should have a unique id', () => {
    expect(customer.id).to.equal(5)
  });

  it('should store a name', () => {
    expect(customer.name).to.be.a('string')
  })

  it('should store bookings', () => {
    expect(customer.bookings.length).to.equal(2)
  })

  it('should store a room service order', () => {
    expect(customer.roomServiceOrders.length).to.equal(2)
  })

  describe('findRoomServiceCostTotalEver', () => {
    it('should return the entire cost of all orders on the books', () => {
      expect(customer.findRoomServiceCostTotalEver()).to.equal(38.45)
    })
  })

  describe('cancelBooking', () => {
    it('should delete the booking from bookings', () => {
      expect(customer.bookings.length).to.equal(2)
      customer.cancelBooking("2019/09/26", 26)
      expect(customer.bookings.length).to.equal(1)
    })
  })

  describe('addBooking', () => {
    it('should add the booking to bookings', () => {
      expect(customer.bookings.length).to.equal(2)
      customer.addBooking("2019/09/27", 27)
      expect(customer.bookings.length).to.equal(3)
    })
  })
});