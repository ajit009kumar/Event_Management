import {
    indigo500, // indigo400,
    redA200,
    grey100, grey200, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
  } from 'material-ui/styles/colors';

  import { fade } from 'material-ui/utils/colorManipulator';

  
  export const theme = {
    primary1Color: '#323765',
    primary2Color: '#323770',
    // primary1Color: indigo500,
    // primary2Color: indigo400,
    primary3Color: grey400,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    secondaryTextColor: 'rgba(0,0,0,0.54)',
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    headerColor: grey200,
    buttonColor: '#f5f5f5',
    backgroundColor: grey100
  }