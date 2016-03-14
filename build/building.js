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
var speed = 5;
var directions = [];

function createContainer(view, container) {
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            // <=
            if (directions.indexOf('LEFT') === -1) directions.push('LEFT');
        }
        if (e.keyCode === 38 || e.keyCode === 87) {
            // ^
            if (directions.indexOf('FORWARD') === -1) directions.push('FORWARD');
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            // =>
            if (directions.indexOf('RIGHT') === -1) directions.push('RIGHT');
        }
        if (e.keyCode === 40 || e.keyCode === 83) {
            // v
            if (directions.indexOf('BACKWARD') === -1) directions.push('BACKWARD');
        }
    });
    window.addEventListener('keyup', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            // <=
            if (directions.indexOf('LEFT') > -1) directions.splice(directions.indexOf('LEFT'), 1);
        }
        if (e.keyCode === 38 || e.keyCode === 87) {
            // ^
            if (directions.indexOf('FORWARD') > -1) directions.splice(directions.indexOf('FORWARD'), 1);
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            // =>
            if (directions.indexOf('RIGHT') > -1) directions.splice(directions.indexOf('RIGHT'), 1);
        }
        if (e.keyCode === 40 || e.keyCode === 83) {
            // v
            if (directions.indexOf('BACKWARD') > -1) directions.splice(directions.indexOf('BACKWARD'), 1);
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
    }, {
        x: 150,
        y: 100,
        w: 100,
        l: 100,
        h: 150
    }, {
        x: 200,
        y: 100,
        w: 100,
        l: 100,
        h: 200
    }, {
        x: 150,
        y: 100,
        w: 100,
        l: 100,
        h: 250
    }];

    // loadMap(data).render(container);
    (0, _map.parseTemplate)(container);
    window.requestAnimationFrame(function () {
        walking(container);
    });
}

function walking(world) {
    var num = horizontal / 360 * Math.PI * 2;
    if (directions.indexOf('FORWARD') > -1) {
        x -= Math.sin(num) * speed;
        y -= Math.cos(num) * speed;
    }
    if (directions.indexOf('LEFT') > -1) {
        x += Math.cos(num) * speed;
        y -= Math.sin(num) * speed;
    }
    if (directions.indexOf('RIGHT') > -1) {
        x -= Math.cos(num) * speed;
        y += Math.sin(num) * speed;
    }
    if (directions.indexOf('BACKWARD') > -1) {
        x += Math.sin(num) * speed;
        y += Math.cos(num) * speed;
    }
    move(world, x, y, vertical, horizontal);
    window.requestAnimationFrame(function () {
        walking(world);
    });
}

function move(world, x, y, vertical, horizontal) {
    world.style['transform-origin'] = x * -1 + 'px ' + y * -1 + 'px -150px';
    // world.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 700px) ' +
    //     'rotateX(' + vertical + 'deg) rotateY(0deg) rotateZ(' + horizontal + 'deg)';
    _dom2.default.transform(world, {
        translate: [x, y, 700],
        rotate: [vertical, 0, horizontal]
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
    var string = 'translate3d(' + options.translate[0] + 'px, ' + options.translate[1] + 'px, ' + options.translate[2] + 'px)     rotateX(' + options.rotate[0] + 'deg)     rotateY(' + options.rotate[1] + 'deg)     rotateZ(' + options.rotate[2] + 'deg)\n    ';
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

function parseTemplate(root) {
    var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    Array.from(root.childNodes).forEach(function (node) {
        if (node.nodeType === 1) {
            parseTemplate(node, ++level);
            // FIXME: Will override previous transform attributes
            _dom2.default.transform(node, {
                translate: [0, 0, level * -5],
                rotate: [0, 0, 0]
            });
        }
    });
}

function loadMap(data) {
    var map = [];
    data.forEach(function (tile) {
        map.push(createBuilding(tile));
    });
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
        translate: [options.x, options.y, options.x],
        rotate: [0, 0, 0]
    }), {
        w: options.w,
        l: options.l,
        color: options.color
    });
}
exports.parseTemplate = parseTemplate;
exports.loadMap = loadMap;

},{"./dom":2}]},{},[3])


//# sourceMappingURL=building.js.map
