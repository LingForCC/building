import dom from './dom'
// var map = [];
var map = [{
    x: 100,
    y: 100,
    w: 100,
    l: 100,
    h: 100
}]

function parseTemplate(root) {}

function loadMap() {
    map.forEach(tile => {
        createBuilding(tile)
    })

    return {
        render: function(target) {}
    }
}

function createBuilding(options) {
    options = Object.extend({
        w: 100,
        l: 100,
        h: 100,
        color: '#000'
    }, options)

    // Create DOM
}

