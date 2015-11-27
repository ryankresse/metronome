let Dispatcher = require('../dispatchers/dispatcher');
let Constants = require('../constants');

let actions = {
  createCategory: function(name) {
      Dispatcher.dispatch({
        actionType: Constants.CAT_CREATE,
        text: name
      });
    },
    createEntry: function(name, catId) {
        Dispatcher.dispatch({
          actionType: Constants.ENTRY_CREATE,
          data: {
            name: name,
            catId: catId
          }
        });
      }
};

export default actions;
