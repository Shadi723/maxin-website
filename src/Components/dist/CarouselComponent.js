"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("react-responsive-carousel/lib/styles/carousel.min.css"); // requires a loader
var react_responsive_carousel_1 = require("react-responsive-carousel");
var Carousel_1_jpg_1 = require("../assets/photos/Carousel_1.jpg");
var Carousel_2_jpg_1 = require("../assets/photos/Carousel_2.jpg");
var Carousel_3_jpg_1 = require("../assets/photos/Carousel_3.jpg");
var CarouselComponent = function () {
    return (react_1["default"].createElement(react_responsive_carousel_1.Carousel, { autoPlay: true, infiniteLoop: true, showArrows: true, showThumbs: false, showStatus: false },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("img", { src: Carousel_1_jpg_1["default"], alt: 'C1' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("img", { src: Carousel_2_jpg_1["default"], alt: 'C2' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("img", { src: Carousel_3_jpg_1["default"], alt: 'C3' }))));
};
exports["default"] = CarouselComponent;
