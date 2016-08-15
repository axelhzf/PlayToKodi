import * as React from "react";
import {StyleSheet, ScrollView, Text} from "react-native";
import api from "../api";
import {Show} from "../api";
import ShowsSlider from "../components/ShowsSlider";
import ShowScreen from "./ShowScreen";

interface ShowsScreenProps {
  navigator: any
}

interface ShowsScreenState {
  trendingShows: Show[],
}

export default class ShowsScreen extends React.Component<ShowsScreenProps, ShowsScreenState> {

  static title = "Shows";

  constructor() {
    super();
    this.state = {
      trendingShows: []
    }
  }

  componentDidMount() {
    this.fetchShows();
  }

  async fetchShows() {
    const trendingShows = await api.shows({sort: "trending", order: -1});
    console.log(trendingShows);
    this.setState({trendingShows});
  }


  toShowScreen(show: Show) {
    this.props.navigator.push({
      component: ShowScreen,
      title: show.title,
      passProps: {show}
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ShowsSlider shows={this.state.trendingShows} title="Trending Shows" onClick={show => this.toShowScreen(show) }/>
      </ScrollView>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414"
  }
});