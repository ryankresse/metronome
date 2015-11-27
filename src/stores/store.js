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
}];

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


function createEntry(name, catId) {
  var category = _.find(_categories, 'id', catId);
  category.entries.push(newEntry(name));
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
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
  getAllCategories: function() {
    return _categories;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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
}
  switch(action.actionType) {
    case Constants.ENTRY_CREATE:
          createEntry(action.data.name, action.data.catId);
          Store.emitChange();
        break;


    default:
      // no op
  }
});

export default Store;
