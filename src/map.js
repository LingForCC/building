import dom from './dom'

function parseTemplate(root, level = 0) {
    Array.from(root.childNodes).forEach(node => {
        if (node.nodeType === 1) {
            parseTemplate(node, ++level);
            // FIXME: Will override previous transform attributes
            dom.transform(node, {
                translate: [0, 0, level * (-5)],
                rotate: [0, 0, 0]
            })
        }
    })
}

function loadMap(data) {
    var map = [];
    data.forEach(tile => {
        map.push(createBuilding(tile))
    })
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
                translate: [options.x, options.y, options.x],
                rotate: [0, 0, 0]
            }), {
            w: options.w,
            l: options.l,
            color: options.color
        }
    )
}
export { parseTemplate, loadMap }
