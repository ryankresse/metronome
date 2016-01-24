var _ = require('lodash');

var AppDispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _loaded = false;
/*var _categories = [
  {
    name: "Scales",
    id: 1,
    entries: [
    {
      name: 'C-Major',
      id: 1,
      best: {
        value: 120,
        date: '1/11/1111'
      },
      recent: {
        value: 150,
        date: '1/11/1111'
      }
    }],
  },
  {
    name: "Arpeggios",
    id: 2,
    entries: [
      {
        id: 1,
        name: 'D-Major',
        best: {
          value: 90,
          date: '1/11/1111'
        },
        recent: {
          value: 60,
          date: '1/11/1111'
        }
      },
      {
        id: 2,
        name: 'E-Major',
        best: {
          value: 60,
          date: '1/11/1111'
        },
        recent: {
          value: 50,
          date: '1/11/1111'
        }
      }
    ]}
  ];*/
  var _categories = [];
var selectedEntry = null;
var _selectedCategory = null;
var _recentCountdown = null;
var _tickSpeed = 60;
var _tickInterval = null;
var btnText = "Start";
var _changeTickSpeedTimeout = null;
var _error;

 function loadCats () {
   $.ajax({
      url:'/music',
      dataType: 'json',
      cache: false})
      .done(function(data){
        _categories = data;
        _loaded = true;
        Store.emitChange();
      }).
      fail(function(err){
        _error = err.responseText;
        _loaded = true;
        Store.emitChange();
      });
 }


  function sendNewCatToServer (newCat) {
    $.ajax({
       method: 'POST',
       data: JSON.stringify(newCat),
       contentType: 'application/json',
       url:'/music/createCategory',
       cache: false})
       .done(function(data){
         console.log(data);
         newCat.id = data;
         console.log(_categories);
         Store.emitChange();
       }).
       fail(function(err){
         _error = err.responseText;
         Store.emitChange();
       });
  }

  function sendNewEntryToServer (entry) {
    $.ajax({
       method: 'POST',
       data: JSON.stringify({categoryId: _selectedCategory.id, entryName: entry.name}),
       contentType: 'application/json',
       url:'/music/createEntry',
       cache: false})
       .done(function(data){
         entry.id = data;
         console.log(_categories);
         Store.emitChange();
       }).
       fail(function(err){
         _error = err.responseText;
         Store.emitChange();
       });
  }


function createCategory(name) {
  var newCat = makeNewCategory(name);
  _categories.push(newCat);
  sendNewCatToServer(newCat);
}



function makeNewCategory (name) {
  return {
    name: name,
    entries: [],
    id: new Date()
  }
}


function newEntry (name) {
  return {
    name: name,
    best: {
      value: null,
      date: null
    },
    recent: {
      value: null,
      date: null
    },
    id: new Date()
  }
}


function createEntry(name) {
  var entry = newEntry(name);
  _selectedCategory.entries.push(entry);
  sendNewEntryToServer(entry);
}

function deleteEntry(entryId) {
  var entryToDelete = _.find(_selectedCategory.entries, 'id', entryId);
  if (entryToDelete === selectedEntry) {
    selectedEntry = null;
    startOrStopRecentCountdown(false);
  }
  _selectedCategory.entries = _.without(_selectedCategory.entries, entryToDelete);
}


function setSelectedEntry (entryId) {
  selectedEntry = _.find(_selectedCategory.entries, 'id', entryId);
  _tickSpeed = selectedEntry.best.value || 60;
  if (_tickInterval) {
    changeTickInterval(_tickSpeed);
    startOrStopRecentCountdown(true);
  }
}

function getSelectedEntry () {
  return selectedEntry;
}


function onCategorySelected(catId) {
  if (_selectedCategory === null || catId !== _selectedCategory.id) {
    _selectedCategory = _.find(_categories, 'id', catId);
    selectedEntry = null;
    startOrStopRecentCountdown(false);
  }
}

function onCategoryDeleted(catId) {
  var catToDelete = _.find(_categories, 'id', catId);
  if (catToDelete === _selectedCategory) {
    _selectedCategory = null;
    selectedEntry = null;
    startOrStopRecentCountdown(false);
  }
  _categories = _.without(_categories, catToDelete);
}



function updateEntryFastest(speed) {
  if (selectedEntry) {
    selectedEntry.best.value = speed;
  }
}

function onStartOrStop(startOrStop) {
  if (_tickInterval) {
    _tickInterval = stopTick();
    btnText = "Start";
    startOrStopRecentCountdown(false);
  }
  else {
    _tickInterval = startTick(_tickSpeed);
    btnText = "Stop";
    startOrStopRecentCountdown(true);
  }
}

function startOrStopRecentCountdown(isStart) {
  window.clearTimeout(_recentCountdown);
  _recentCountdown = null;

  if (isStart && selectedEntry) {
      _recentCountdown = window.setTimeout(updateMostRecentValue.bind(null, _tickSpeed), 5000);
  }
}

function onSpeedChange(speed) {
  if (_tickInterval && speed !== _tickSpeed) {
      resetChangeTickTimeout(speed);
  }
  _tickSpeed = speed;
}

function resetChangeTickTimeout (speed) {
  window.clearTimeout(_changeTickSpeedTimeout);
  _changeTickSpeedTimeout = window.setTimeout(changeTickInterval.bind(null, speed), 500);
}

function changeTickInterval (speed) {
    _tickInterval = stopTick();
    _tickInterval = startTick(speed);
    startOrStopRecentCountdown(true);
}


function startTick (speed) {
    var interval = (60 / speed) * 1000;
    var tick = new Audio('tick.mp3');
    return setInterval(function(){
      tick.play();
    }, interval);
}

function stopTick () {
  window.clearTimeout(_tickInterval);
  return null;
}

function clearMostRecentTimemout() {
  window.clearTimeout(_recentCountdown);
}

function updateMostRecentValue (speed) {
  selectedEntry.recent.value = speed;
  _changeTickSpeedTimeout = null;
  Store.emitChange();
}

var Store = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */

   getState() {
      return {
        categories: this.getAllCategories(),
        selectedEntry: this.getSelectedEntry(),
        selectedCategory: this.getSelectedCategory(),
        tickSpeed: this.getTickSpeed(),
        btnText: this.getBtnText(),
        error: this.getError()
      }
   },

  getAllCategories: function() {
    if (!_loaded) {
      loadCats();
    }
    return _categories;
  },
  getCategory: function (id) {
    var cat =  _.find(_categories, {'id': id })
    return cat;
  },
  getSelectedEntry: function () {
    return selectedEntry || null;
  },
  getError: function () {
    return _error;
  },
  getSelectedCategory: function () {
    return _selectedCategory;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getTickSpeed: function() {
    return _tickSpeed || 60;
},
getBtnText: function() {
  return btnText;
},


  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {

    case Constants.LOAD_CATS:
        loadCats();
        Store.emitChange();
      break;

    case Constants.CAT_CREATE:
        createCategory(action.text);
        Store.emitChange();
      break;

    case Constants.ENTRY_CREATE:
          createEntry(action.data.name);
          Store.emitChange();
        break;

    case Constants.ENTRY_DELETED:
          deleteEntry(action.data.entryId);
          Store.emitChange();
        break;

    case Constants.SET_AS_FASTEST:
          updateEntryFastest(action.data.speed);
          Store.emitChange();
        break;

    case Constants.ENTRY_SELECTED:
          setSelectedEntry(action.data.entryId);
            Store.emitChange();
        break;

    case Constants.CATEGORY_SELECTED:
          onCategorySelected(action.data.catId);
          Store.emitChange();
            break;

    case Constants.CATEGORY_DELETED:
          onCategoryDeleted(action.data.catId);
          Store.emitChange();
            break;

    case Constants.START_OR_STOP:
        onStartOrStop(action.data.tickSpeed);
        Store.emitChange();
        break;

   case Constants.SPEED_CHANGE:
        onSpeedChange(action.data.speed);
        Store.emitChange();
        break;

    case Constants.SERVER_TEST:
        Store.emitChange();
        break;


    default:
      // no op
  }
});

export default Store;
