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

      onEntrySelected(entry) {
        Dispatcher.dispatch({
          actionType: Constants.ENTRY_SELECTED,
          data: {
            entry: entry
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
            startOrStop: startOrStop,
            tickSpeed: tickSpeed
          }
        });
      }


};

export default actions;
