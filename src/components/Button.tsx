import * as React from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableHighlight} from "react-native";
import {colors} from "../styles";

import ScrollViewStyle = __React.ScrollViewStyle;
import ImageStyle = __React.ImageStyle;
import TextStyle = __React.TextStyle;
import ViewStyle = __React.ViewStyle;

interface ButtonProps {
  text: string,
  onPress: () => void,
  type?: "primary" | "secondary";
}

export default class Button extends React.Component<ButtonProps, {}> {

  static defaultProps = {
    type: "primary"
  };

  render() {
    const containerStyle = this.props.type === "primary" ? styles.buttonContainer : styles.buttonContainerSecondary;
    const textStyle = this.props.type === "primary" ? styles.buttonText : styles.buttonTextSecondary;

    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.touchable}>
        <View style={containerStyle}>
          <Text style={textStyle}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }

}

var styles = StyleSheet.create({
  touchable: {
    marginBottom: 5
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: 8
  } as ViewStyle,
  buttonText: {
    color: "#fff",
    padding: 14,
    textAlign: "center",
    fontWeight: "bold"
  } as TextStyle,
  buttonContainerSecondary: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8
  } as ViewStyle,
  buttonTextSecondary: {
    color: "#fff",
    padding: 14,
    textAlign: "center",
    fontWeight: "bold"
  } as TextStyle,
});