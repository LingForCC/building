var view = document.querySelector('.view');
var world = document.querySelector('.world');
var x = 0;
var y = 0;
var vertical = 0;
var horizontal = 0;
window.addEventListener('keydown', function(e) {
    if (e.keyCode === 37 || e.keyCode === 65) { // <=
        var num = horizontal / 360 * Math.PI * 2;
        x += Math.cos(num) * 10;
        y -= Math.sin(num) * 10;
        move(world, x, y, vertical, horizontal);
    }
    if (e.keyCode === 38 || e.keyCode === 87) { // ^
        var num = horizontal / 360 * Math.PI * 2;
        x -= Math.sin(num) * 10;
        y -= Math.cos(num) * 10;
        console.log(num + ":" + Math.cos(num) * 10);
        move(world, x, y, vertical, horizontal);
    }
    if (e.keyCode === 39 || e.keyCode === 68) { // =>
        var num = horizontal / 360 * Math.PI * 2;
        x -= Math.cos(num) * 10;
        y += Math.sin(num) * 10;
        console.log(Math.sin(num) * 5);
        move(world, x, y, vertical, horizontal);
    }
    if (e.keyCode === 40 || e.keyCode === 83) { // v
        var num = horizontal / 360 * Math.PI * 2;
        x += Math.sin(num) * 10;
        y += Math.cos(num) * 10;
        move(world, x, y, vertical, horizontal);
    }
});
window.addEventListener('mousemove', function(e) {
    vertical = e.y / window.innerHeight * 360 * (-1);
    horizontal = e.x / window.innerWidth * 360;
    move(world, x, y, vertical, horizontal);
})

function move(world, x, y, vertical, horizontal) {
    world.style['transform-origin'] = (x * (-1)) + 'px ' + (y * (-1)) + 'px -150px';
    // world.style['transform-origin'] = '153.128px 34.5035px -150px';

    world.style['transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 700px) ' +
        'rotateX(' + vertical + 'deg) rotateY(0deg) rotateZ(' + horizontal + 'deg)';
}
