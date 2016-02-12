'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Incident -- Copyright (c) 2016 Thayne McCombs
 */

/**
 * The Event class
 */

var Event = exports.Event = function () {
    function Event(type, data, target) {
        _classCallCheck(this, Event);

        this.type = type;
        this.data = data;
        this.target = target;
        this._stopped = false;
    }

    _createClass(Event, [{
        key: 'stopPropogation',
        value: function stopPropogation() {
            this._stopped = true;
        }
    }, {
        key: 'propogationStopped',
        get: function get() {
            return this[stoppedPropogation];
        }
    }]);

    return Event;
}();

var EventTarget = exports.EventTarget = function () {
    function EventTarget(parent) {
        _classCallCheck(this, EventTarget);

        this.parent = parent;
        this._listeners = Object.create(null);
    }

    _createClass(EventTarget, [{
        key: 'getListeners',
        value: function getListeners(type) {
            var listeners = this._listeners;
            type = type || '';
            if (!(type in listeners)) {
                listeners[type] = [];
            }
            return listeners[type];
        }
    }, {
        key: 'listen',
        value: function listen(type, handler, inFront) {
            var listeners = this.getListeners(type);
            if (inFront) {
                listeners.unshift(handler);
            } else {
                listeners.push(handler);
            }
            return this;
        }
    }, {
        key: 'unlisten',
        value: function unlisten(type, handler) {
            if (!handler) {
                delete this._listeners[type || ''];
            } else {
                var listeners = this.getListeners(type);
                var ind = listeners.indexOf(handler);
                listeners.splice(ind, 1);
            }
            return this;
        }
    }, {
        key: 'fireEvent',
        value: function fireEvent(event) {
            var listeners = this.getListeners(event.type);
            if (!event.target) {
                event.target = this;
            }
            var len = listeners.length;
            for (var i = 0; i < len; i++) {
                listeners[i].call(this, event);
            }
            if (!event.propogationStopped && this.parent) {
                this.parent.fireEvent(event);
            }
            return this;
        }
    }, {
        key: 'fire',
        value: function fire(type, data) {
            return this.fireEvent(new Event(type, data, this));
        }
    }]);

    return EventTarget;
}();