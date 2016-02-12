/*!
 * Incident -- Copyright (c) 2016 Thayne McCombs
 */

/**
 * The Event class
 */
export class Event {
    constructor(type, data, target) {
        this.type = type;
        this.data = data;
        this.target = target;
        this._stopped = false;
    }

    get propogationStopped() {
        return this[stoppedPropogation];
    }

    stopPropogation() {
        this._stopped = true;
    }
}

export class EventTarget {
    constructor(parent) {
        this.parent = parent;
        this._listeners = Object.create(null);
    }

    getListeners(type) {
        let listeners = this._listeners;
        type = type || '';
        if (!(type in listeners)) {
            listeners[type] = [];
        }
        return listeners[type];
    }

    listen(type, handler, inFront) {
        let listeners = this.getListeners(type);
        if (inFront) {
            listeners.unshift(handler);
        } else {
            listeners.push(handler);
        }
        return this;
    }

    unlisten(type, handler) {
        if (!handler) {
            delete this._listeners[type || ''];
        } else {
            let listeners = this.getListeners(type);
            let ind = listeners.indexOf(handler);
            listeners.splice(ind, 1);
        }
        return this;
    }

    fireEvent(event) {
        var listeners = this.getListeners(event.type);
        if (!event.target) {
            event.target = this;
        }
        var len = listeners.length;
        for ( let i = 0; i < len; i++) {
            listeners[i].call(this, event);
        }
        if (!event.propogationStopped && this.parent) {
            this.parent.fireEvent(event);
        }
        return this;
    }

    fire(type, data) {
        return this.fireEvent(new Event(type, data, this));
    }
}
