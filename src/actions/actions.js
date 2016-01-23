let Dispatcher = require('../dispatchers/dispatcher');
let Constants = require('../constants');
let WebApi = require('../utils/web-api');

let actions = {
  loadCategories: function() {
      Dispatcher.dispatch({
        actionType: Constants.LOAD_CATS,
        text: name
      });
    },
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
      },

      onDeleteEntry: function(entryId) {
          Dispatcher.dispatch({
            actionType: Constants.ENTRY_DELETED,
            data: {
              entryId: entryId,
            }
          });
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
      onDeleteCategory(catId) {
        Dispatcher.dispatch({
          actionType: Constants.CATEGORY_DELETED,
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
