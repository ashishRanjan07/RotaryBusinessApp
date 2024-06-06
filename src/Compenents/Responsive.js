import { Dimensions } from "react-native";

export const responsiveFontSize = (fontSize, baseWidthPercentage = 100) => {
    const screenWidth = Dimensions.get('window').width;
    const baseWidth = (baseWidthPercentage / 100) * screenWidth;
    const scale = screenWidth / baseWidth;
    const responsiveSize = fontSize * scale;
    return responsiveSize;
  };
export const responsivePadding = (padding, baseWidthPercentage = 100) => {
    const screenWidth = Dimensions.get('window').width;
    const baseWidth = (baseWidthPercentage / 100) * screenWidth;
    const scale = screenWidth / baseWidth;
    const responsivePadding = padding * scale;
    return responsivePadding;
  };
  export const responsiveImageSize = (originalWidth, originalHeight, baseWidthPercentage = 100) => {
    const screenWidth = Dimensions.get('window').width;
    const baseWidth = (baseWidthPercentage / 100) * screenWidth;
    const aspectRatio = originalWidth / originalHeight;
    const responsiveWidth = baseWidth;
    const responsiveHeight = responsiveWidth / aspectRatio;
    return { width: responsiveWidth, height: responsiveHeight };
  };