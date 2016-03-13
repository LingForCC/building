var dom = {};

dom.create = function(type) {
    return document.createElement(type)
}

dom.transform = function(dom, options) {
    var string =
        `translate3d(${options.translate[0]}px, ${options.translate[1]}px, ${options.translate[2]}px) \
    rotateX(${options.rotate[0]}deg) \
    rotateY(${options.rotate[1]}deg) \
    rotateZ(${options.rotate[2]}deg)
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
