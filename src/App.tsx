import * as React from "react";
import { NavigatorIOS, StyleSheet, View} from 'react-native';
import Movies from "./containers/Movies";
import {colors} from "./styles"

declare module "react-native" {
  interface NavigatorIOSProperties {
      barTintColor?: string
  }
}

export default class App extends React.Component<{},{}> {
  
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          initialRoute={{ component: Movies, title: Movies.title }}
          style={styles.navigator}
          titleTextColor="#fff"
          shadowHidden={true}
          barTintColor="#141414"
          tintColor={colors.primary}
        />
      </View>
    );
  }
  
}


var styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1
  },
  navigator: {
    flex: 1
  }
});