
import Room from '../src/Room';
import chai from 'chai';
import spies from 'chai-spies';
const expect = chai.expect;
chai.use(spies);



let room;

describe('Room', () => {
  beforeEach(() => {
    room = new Room(25, "junior suite", true, "queen", 1, 307.49)
  });
    
  it('should be a function', () => {
    expect(Room).to.be.a('function')
  });
    
  it('should instantiate an new instance of Hotel', () => {
    expect(room).to.be.an.instanceOf(Room)
  });
    
  it('should store the number correlated with the room number', () => {
    expect(room.number).to.equal(25)
  });
  
  it('should store the room type', () => {
    expect(room.roomType).to.equal("junior suite")
  });

  it('should store if a room has a bidet or not', () => {
    expect(room.bidet).to.equal(true)
  });

  it('should store the bed size', () => {
    expect(room.bedSize).to.equal("queen")
  });

  it('should store the number of beds in the room', () => {
    expect(room.numBeds).to.equal(1)
  });

  it('should store the cost per night for the room', () => {
    expect(room.costPerNight).to.equal(307.49)
  });
});