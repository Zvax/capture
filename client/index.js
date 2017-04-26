import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactDOM from "react-dom";
import {CaptureContainer} from "./Containers";
import injectTapEventPlugin  from 'react-tap-event-plugin';
injectTapEventPlugin();
import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
const muitheme = getMuiTheme({
  paper: {
    padding: 40
  },
  fontFamily: 'PT Sans, sans-serif',
  avatar: {
    overflow: 'hidden'
  },
  palette: {
    primary1Color: '#b37947',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});
const activateReactComponent = (component, elem) => {
  ReactDOM.render(
  <MuiThemeProvider muiTheme={muitheme}>{component}</MuiThemeProvider>,
    elem
  );
};
document.addEventListener('DOMContentLoaded', () => {
  activateReactComponent(<CaptureContainer />, document.getElementById('root'));
});
