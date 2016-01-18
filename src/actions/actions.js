let Dispatcher = require('../dispatchers/dispatcher');
let Constants = require('../constants');
let WebApi = require('../utils/web-api');

let actions = {
  createCategory: function(name) {
      Dispatcher.dispatch({
        actionType: Constants.CAT_CREATE,
        text: name
      });
    },
    setAsFastest: function(speed) {
        Dispatcher.dispatch({
          actionType: Constants.SET_AS_FASTEST,
          data: {
            speed: speed
          }
        });
      },
    createEntry: function(name) {
        Dispatcher.dispatch({
          actionType: Constants.ENTRY_CREATE,
          data: {
            name: name,
          }
        });
        //var data = {name: name};
      //  WebApi.createEntry(data);
      },

      onEntrySelected(entryId) {
        Dispatcher.dispatch({
          actionType: Constants.ENTRY_SELECTED,
          data: {
            entryId: entryId
          }
        });
      },
      onCategorySelected(catId) {
        Dispatcher.dispatch({
          actionType: Constants.CATEGORY_SELECTED,
          data: {
            catId: catId
          }
        });
      },
      onStartStopClick(startOrStop, tickSpeed) {
        Dispatcher.dispatch({
          actionType: Constants.START_OR_STOP,
          data: {
            tickSpeed: tickSpeed
          }
        });
      },
      onTickSpeedInputChange(speed) {
        Dispatcher.dispatch({
          actionType: Constants.SPEED_CHANGE,
          data: {
            speed: speed
          }
        });
      }


};

export default actions;
