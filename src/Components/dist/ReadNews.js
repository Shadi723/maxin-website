"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardActionArea_1 = require("@material-ui/core/CardActionArea");
var core_1 = require("@material-ui/core");
var CardContent_1 = require("@material-ui/core/CardContent");
var Typography_1 = require("@material-ui/core/Typography");
var CardActions_1 = require("@material-ui/core/CardActions");
var Button_1 = require("@material-ui/core/Button");
var useStyles = styles_1.makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
});
var ReadNews = function (_a) {
    var description = _a.description, imageUrl = _a.imageUrl, imageTitle = _a.imageTitle, title = _a.title;
    var classes = useStyles();
    return (react_1["default"].createElement(Card_1["default"], { className: classes.root, eleva: true },
        react_1["default"].createElement(CardActionArea_1["default"], null,
            react_1["default"].createElement(core_1.CardMedia, { className: classes.media, image: imageUrl, title: imageTitle }),
            react_1["default"].createElement(CardContent_1["default"], null,
                react_1["default"].createElement(Typography_1["default"], { gutterBottom: true, variant: "h5", component: "h2" }, title),
                react_1["default"].createElement(Typography_1["default"], { variant: "body2", color: "textSecondary", component: "p" }, description))),
        react_1["default"].createElement(CardActions_1["default"], null,
            react_1["default"].createElement(Button_1["default"], { size: "large", color: "primary" }, "Read"))));
};
exports["default"] = ReadNews;
