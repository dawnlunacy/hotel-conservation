import Booking from '../src/Booking'
import chai from 'chai';
import spies from 'chai-spies';
const expect = chai.expect;
chai.use(spies);

let booking;

describe('Booking', () => {
  beforeEach(() => {
    booking = new Booking(5, "2019/10/31", 13)
  });
    
  it('should be a function', () => {
    expect(Booking).to.be.a('function')
  });
    
  it('should instantiate an new instance of Hotel', () => {
    expect(booking).to.be.an.instanceOf(Booking)
  });
    
  it('should store the id correlated with the booking', () => {
    expect(booking.userID).to.be.an('number')
  });

  it('should store the id correlated with the booking correctly', () => {
    expect(booking.userID).to.be.equal(5)
  });
  
  it('should store a date', () => {
    expect(booking.date).to.be.a('string')
  });

  it('should store a date in the format given', () => {
    expect(booking.date).to.be.equal("2019/10/31")
  });

  it('should store a roomNumber', () => {
    expect(booking.roomNumber).to.be.an('number')
  })

  it('should store a roomNumber of the room given', () => {
    expect(booking.roomNumber).to.be.equal(13)
  })
});