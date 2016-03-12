(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var x = 0;
var y = 0;
var vertical = 0;
var horizontal = 0;

function createContainer(view, container) {
    console.log(container);
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            // <=
            console.log('s');
            var num = horizontal / 360 * Math.PI * 2;
            x += Math.cos(num) * 10;
            y -= Math.sin(num) * 10;
            move(container, x, y, vertical, horizontal);
        }
        if (e.keyCode === 38 || e.keyCode === 87) {
            // ^
            var num = horizontal / 360 * Math.PI * 2;
            x -= Math.sin(num) * 10;
            y -= Math.cos(num) * 10;
            console.log(num + ":" + Math.cos(num) * 10);
            move(container, x, y, vertical, horizontal);
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            // =>
            var num = horizontal / 360 * Math.PI * 2;
            x -= Math.cos(num) * 10;
            y += Math.sin(num) * 10;
            console.log(Math.sin(num) * 5);
            move(container, x, y, vertical, horizontal);
        }
        if (e.keyCode === 40 || e.keyCode === 83) {
            // v
            var num = horizontal / 360 * Math.PI * 2;
            x += Math.sin(num) * 10;
            y += Math.cos(num) * 10;
            move(container, x, y, vertical, horizontal);
        }
    });
    window.addEventListener('mousemove', function (e) {
        console.dir(container.clientHeight);
        vertical = e.y / view.clientHeight * 360 * -1;
        horizontal = e.x / view.clientWidth * 360;
        move(container, x, y, vertical, horizontal);
    });
}

function move(world, x, y, vertical, horizontal) {
    world.style['transform-origin'] = x * -1 + 'px ' + y * -1 + 'px -150px';
    world.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 700px) ' + 'rotateX(' + vertical + 'deg) rotateY(0deg) rotateZ(' + horizontal + 'deg)';
}
exports.createContainer = createContainer;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createContainer = undefined;

var _container = require('./container.js');

// for development
window.createContainer = _container.createContainer;
exports.createContainer = _container.createContainer;

},{"./container.js":1}]},{},[2])


//# sourceMappingURL=build.js.map
