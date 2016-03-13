(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createContainer = undefined;

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _map = require('./map');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = 0;
var y = 0;
var vertical = 0;
var horizontal = 0;

function createContainer(view, container) {
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            // <=
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
            move(container, x, y, vertical, horizontal);
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            // =>
            var num = horizontal / 360 * Math.PI * 2;
            x -= Math.cos(num) * 10;
            y += Math.sin(num) * 10;
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
        vertical = e.y / view.clientHeight * 360 * -1;
        horizontal = e.x / view.clientWidth * 360;
        move(container, x, y, vertical, horizontal);
    });
    var data = [{
        x: 100,
        y: 100,
        w: 100,
        l: 100,
        h: 100
    }];
    (0, _map.loadMap)(data).render(container);
}

function move(world, x, y, vertical, horizontal) {
    world.style['transform-origin'] = x * -1 + 'px ' + y * -1 + 'px -150px';
    // world.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 700px) ' +
    //     'rotateX(' + vertical + 'deg) rotateY(0deg) rotateZ(' + horizontal + 'deg)';
    _dom2.default.transform(world, {
        translate: {
            x: x,
            y: y,
            z: 700
        },
        rotate: {
            x: vertical,
            y: 0,
            z: horizontal
        }
    });
}
exports.createContainer = createContainer;

},{"./dom":2,"./map":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dom = {};

dom.create = function (type) {
    return document.createElement(type);
};

dom.transform = function (dom, options) {
    var string = 'translate3d(' + options.translate.x + 'px, ' + options.translate.y + 'px, ' + options.translate.z + 'px)     rotateX(' + options.rotate.x + 'deg)     rotateY(' + options.rotate.y + 'deg)     rotateZ(' + options.rotate.z + 'deg)\n    ';
    dom.style.transform = string;
    return dom;
};

dom.size = function (dom, options) {
    // TODO: height(tall)
    console.log(options);
    dom.style.width = options.w + 'px';
    dom.style.height = options.l + 'px';
    dom.style['background-color'] = options.color;
    return dom;
};
exports.default = dom;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createContainer = undefined;

var _container = require('./container.js');

// for development
window.createContainer = _container.createContainer;
exports.createContainer = _container.createContainer;

},{"./container.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMap = exports.parseTemplate = undefined;

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [{
    x: 100,
    y: 100,
    w: 100,
    l: 100,
    h: 100
}];

function parseTemplate(root) {}

function loadMap(data) {
    var map = [];
    data.forEach(function (tile) {
        map.push(createBuilding(tile));
    });
    console.log(map);
    return {
        render: function render(target) {
            map.forEach(function (building) {
                return target.appendChild(building);
            });
        }
    };
}

function createBuilding(options) {
    options = Object.assign({
        x: 0,
        y: 0,
        z: 0,
        w: 100,
        l: 100,
        h: 100,
        color: '#000'
    }, options);

    // TODO: Use compose function
    return _dom2.default.size(_dom2.default.transform(_dom2.default.create('div'), {
        translate: {
            x: options.x,
            y: options.y,
            z: options.z
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    }), {
        w: options.w,
        l: options.l,
        h: options.h,
        color: options.color
    });
}
exports.parseTemplate = parseTemplate;
exports.loadMap = loadMap;

},{"./dom":2}]},{},[3])


//# sourceMappingURL=build.js.map
