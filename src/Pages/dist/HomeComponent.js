"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CarouselComponent_1 = require("../Components/CarouselComponent");
var styles_1 = require("@material-ui/core/styles");
var Typography_1 = require("@material-ui/core/Typography");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Paper_1 = require("@material-ui/core/Paper");
var darwin_jpg_1 = require("../assets/photos/darwin.jpg");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            flexGrow: 1,
            justifyContent: 'center'
        },
        box: {
            background: 'radial-gradient(circle 600px at center,#de3c38 47%,#c11d19 100%)',
            height: '150px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center'
        },
        typography: {
            color: 'white',
            textAlign: 'center',
            fontFamily: 'proxima100',
            margin: 'auto',
            textShadow: '0px 0px 10px #0e3fa2'
        },
        middleRoot: {
            justifyContent: 'space-evenly',
            display: 'flex'
        },
        videoPaper: {
            borderRadius: '60px',
            margin: '30px  auto',
            width: '300px',
            height: '300px',
            backgroundColor: 'transparent'
        },
        video: {
            borderRadius: '60px',
            margin: '0',
            width: '300px',
            height: '300px'
        },
        imagePaper: {
            margin: 'auto'
        },
        image: {
            width: '80%',
            textAlign: 'center'
        }
    });
});
var HomeComponent = function () {
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement(CarouselComponent_1["default"], null),
        react_1["default"].createElement("div", { className: classes.box },
            react_1["default"].createElement(Typography_1["default"], { variant: 'h4', className: classes.typography }, "\u00DCst\u00FCn Teknoloji ve Uluslararas\u0131 \u0130hracat A\u011F\u0131 ile D\u00FCnya\u2019ya Hizmet Veriyoruz.")),
        react_1["default"].createElement("div", { className: classes.middleRoot },
            react_1["default"].createElement(Paper_1["default"], { elevation: 0, className: classes.imagePaper },
                react_1["default"].createElement(CardMedia_1["default"], { src: darwin_jpg_1["default"], component: "img", className: classes.image }),
                react_1["default"].createElement(Typo, null),
                "Paper>",
                react_1["default"].createElement(Paper_1["default"], { className: classes.videoPaper, elevation: 10 },
                    react_1["default"].createElement(CardMedia_1["default"], { src: 'https://www.youtube.com/embed/vv2yGhtbGCM', component: "iframe", className: classes.video })))),
        ") } export default HomeComponent"));
};
