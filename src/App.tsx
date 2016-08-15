import * as React from "react";
import { NavigatorIOS, StyleSheet, View, TabBarIOS} from 'react-native';
import Movies from "./containers/Movies";
import Shows from "./containers/ShowsScreen";
import {colors} from "./styles"

declare module "react-native" {
  interface NavigatorIOSProperties {
      barTintColor?: string
  }
}

interface AppState {
  selectedTab: "movies" | "shows"
}

export default class App extends React.Component<{}, AppState> {

  constructor() {
    super();

    this.state = {
      selectedTab: "shows"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          unselectedTintColor={colors.white}
          tintColor={colors.primary}
          barTintColor={colors.gray}>
          <TabBarIOS.Item
            title={Movies.title}
            selected={this.state.selectedTab === 'movies'}
            onPress={() => this.setState({selectedTab: "movies"})}>
            <NavigatorIOS
              initialRoute={{ component: Movies, title: Movies.title }}
              style={styles.navigator}
              titleTextColor="#fff"
              shadowHidden={true}
              barTintColor={colors.gray}
              tintColor={colors.primary}
            />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title={Shows.title}
            selected={this.state.selectedTab === 'shows'}
            onPress={() => this.setState({selectedTab: "shows"}) }>
            <NavigatorIOS
              initialRoute={{ component: Shows, title: Shows.title }}
              style={styles.navigator}
              titleTextColor="#fff"
              shadowHidden={true}
              barTintColor={colors.gray}
              tintColor={colors.primary}
            />
          </TabBarIOS.Item>
        </TabBarIOS>

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