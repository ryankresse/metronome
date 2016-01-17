var _ = require('lodash');

var AppDispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = [
  {
    name: "Scales",
    id: 1,
    entries: [
    {
      name: 'C-Major',
      id: 1,
      best: {
        value: 60,
        date: '1/11/1111'
      },
      recent: {
        value: 60,
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
          value: 60,
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
          value: 60,
          date: '1/11/1111'
        }
      }
    ]
    }
];

var selectedEntry = null;
var _selectedCategory = null;
var _recentCountdown = null;
var _tickSpeed = 60;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function createCategory(name) {
  _categories.push(newCategory(name));
}

function newCategory (name) {
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
  _selectedCategory.entries.push(newEntry(name));
}


function setSelectedEntry (entryId) {
  selectedEntry = _.find(_selectedCategory.entries, 'id', entryId);
  _tickSpeed = selectedEntry.best.value;
}

function getSelectedEntry () {
  return selectedEntry;
}

function setSelectedCategory (catId) {
  if (_selectedCategory === null || catId !== _selectedCategory.id) {
    _selectedCategory = _.find(_categories, 'id', catId);
    selectedEntry = null;
  }
}

function updateEntryFastest(speed) {
  if (selectedEntry) {
    selectedEntry.best.value = speed;
  }
}

function onStartOrStop(startOrStop, tickSpeed) {
  _tickSpeed = tickSpeed;
  if (startOrStop === "START") {
    _recentCountdown = window.setTimeout(updateMostRecentValue.bind(null, tickSpeed), 2000)
  }
}

function clearMostRecentTimemout() {
  window.clearTimeout(_recentCountdown);
}

function updateMostRecentValue (speed) {
  selectedEntry.recent.value = speed;
  Store.emitChange();
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, update) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
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
        tickSpeed: this.getTickSpeed()
      }
   },

  getAllCategories: function() {
    return _categories;
  },
  getCategory: function (id) {
    var cat =  _.find(_categories, {'id': id })
    return cat;
  },
  getSelectedEntry: function () {
    return selectedEntry || null;
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

    case Constants.CAT_CREATE:
        createCategory(action.text);
        Store.emitChange();
      break;

    case Constants.ENTRY_CREATE:
          createEntry(action.data.name);
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
          setSelectedCategory(action.data.catId);
          Store.emitChange();
            break;

    case Constants.START_OR_STOP:
        onStartOrStop(action.data.startOrStop, action.data.tickSpeed);
        break;

    case Constants.SERVER_TEST:
        Store.emitChange();
        break;


    default:
      // no op
  }
});

export default Store;
