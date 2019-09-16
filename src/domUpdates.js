import $ from 'jquery';

const domUpdates =  {

  appendMainTabDefault(hotel) {
    $('.todays-date').text(hotel.findTodaysDate());
  },
    
}

export default domUpdates

