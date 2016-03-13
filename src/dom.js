function dom(type) {
    return document.createElement(type)
}

function transform(dom, options) {
    var string =
        `translate3d(${options.translate.x}px, ${options.translate.y}px, ${options.translate.z}px) \
    rotateX(${options.rotate.x}deg) \
    rotateY(${options.rotate.y}deg) \
    rotateZ(${options.rotate.z}deg)
    `
    console.log(string)
    dom.style.transform = string
}
export { dom, transform }
