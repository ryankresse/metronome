import Actions from '../actions/actions';
let Constants = require('../constants');

let Dispatcher = require('../dispatchers/dispatcher');

let WebApi = {
  createEntry: function(entry){
    $.post('/test', {data: entry}, function (response) {
      Dispatcher.dispatch({
        actionType: Constants.SERVER_TEST,
        data: {name: response}
      });
    });
  }
};



export default WebApi;
