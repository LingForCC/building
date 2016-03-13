import dom from './dom'
var data = [{
    x: 100,
    y: 100,
    w: 100,
    l: 100,
    h: 100
}]

function parseTemplate(root) {}

function loadMap(data) {
    var map = [];
    data.forEach(tile => {
        map.push(createBuilding(tile))
    })
    console.log(map);
    return {
        render: function(target) {
            map.forEach(building => target.appendChild(building));
        }
    }
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
    }, options)

    // TODO: Use compose function
    return dom.size(
        dom.transform(
            dom.create('div'), {
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
        }
    )
}
export { parseTemplate, loadMap }
