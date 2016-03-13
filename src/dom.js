var dom = {};

dom.create = function(type) {
    return document.createElement(type)
}

dom.transform = function(dom, options) {
    var string =
        `translate3d(${options.translate.x}px, ${options.translate.y}px, ${options.translate.z}px) \
    rotateX(${options.rotate.x}deg) \
    rotateY(${options.rotate.y}deg) \
    rotateZ(${options.rotate.z}deg)
    `
    dom.style.transform = string;
    return dom;
}

dom.size = function(dom, options) {
    // TODO: height(tall)
    console.log(options);
    dom.style.width = `${options.w}px`;
    dom.style.height = `${options.l}px`;
    dom.style['background-color'] = options.color;
    return dom;
}
export default dom;
