import dom from './dom'
import { parseTemplate, loadMap } from './map'
var x = 0;
var y = 0;
var vertical = 0;
var horizontal = 0;
var speed = 5;
var directions = [];

function createContainer(view, container) {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 37 || e.keyCode === 65) { // <=
            if (directions.indexOf('LEFT') === -1)
                directions.push('LEFT');
        }
        if (e.keyCode === 38 || e.keyCode === 87) { // ^
            if (directions.indexOf('FORWARD') === -1)
                directions.push('FORWARD');
        }
        if (e.keyCode === 39 || e.keyCode === 68) { // =>
            if (directions.indexOf('RIGHT') === -1)
                directions.push('RIGHT');
        }
        if (e.keyCode === 40 || e.keyCode === 83) { // v
            if (directions.indexOf('BACKWARD') === -1)
                directions.push('BACKWARD');
        }
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 37 || e.keyCode === 65) { // <=
            if (directions.indexOf('LEFT') > -1)
                directions.splice(directions.indexOf('LEFT'), 1);
        }
        if (e.keyCode === 38 || e.keyCode === 87) { // ^
            if (directions.indexOf('FORWARD') > -1)
                directions.splice(directions.indexOf('FORWARD'), 1);
        }
        if (e.keyCode === 39 || e.keyCode === 68) { // =>
            if (directions.indexOf('RIGHT') > -1)
                directions.splice(directions.indexOf('RIGHT'), 1);
        }
        if (e.keyCode === 40 || e.keyCode === 83) { // v
            if (directions.indexOf('BACKWARD') > -1)
                directions.splice(directions.indexOf('BACKWARD'), 1);
        }

    });
    var prevX = 0, prevY = 0;
    window.addEventListener('mousemove', function(e) {
        vertical += (e.y - prevY) * 1.5 / view.clientHeight * 360 * (-1);
        horizontal += (e.x - prevX) * 1.5 / view.clientWidth * 360;
        move(container, x, y, vertical, horizontal);
        prevY = e.y;
        prevX = e.x;
    })
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
    }]

    // loadMap(data).render(container);
    parseTemplate(container);
    window.requestAnimationFrame(() => {
        walking(container);
    })
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
    move(world, x, y, vertical, horizontal)
    window.requestAnimationFrame(() => {
        walking(world);
    })
}

function move(world, x, y, vertical, horizontal) {
    world.style['transform-origin'] = (x * (-1)) + 'px ' + (y * (-1)) + 'px -150px';
    // world.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 700px) ' +
    //     'rotateX(' + vertical + 'deg) rotateY(0deg) rotateZ(' + horizontal + 'deg)';
    dom.transform(world, {
        translate: [x, y, 700],
        rotate: [vertical, 0, horizontal]
    })

}
export {
    createContainer
};
