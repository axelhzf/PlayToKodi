import * as React from "react";
import {ListView, StyleSheet, TouchableHighlight, Image, View, Text} from "react-native";
import {Show} from "../api";
import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

interface ShowsSliderProps {
  shows: Show[],
  title?: string,
  onClick?: (show: Show) => void
}

interface ShowsSliderState {
    ds: __React.ListViewDataSource
}

export default class ShowsSlider extends React.Component<ShowsSliderProps, ShowsSliderState> {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    }
  }
  
  componentDidMount() {
    this.setState({ds: this.state.ds.cloneWithRows<Show>(this.props.shows)});
  }
  
  componentDidUpdate(prevProps: ShowsSliderProps) {
    if (this.props.shows != prevProps.shows) {
      this.setState({ds: this.state.ds.cloneWithRows(this.props.shows)});
    }
  }
  
  render() {
    const {title} = this.props;
    const titleView = title ? <Text style={styles.title}>{title}</Text> : null;
    return (
      <View style={styles.container}>
        {titleView}
        <ListView contentContainerStyle={styles.list}
                  enableEmptySections={true}
                  dataSource={this.state.ds}
                  renderRow={this.renderShow}
                  horizontal={true}
        />
      </View>
    )
  }
  
  renderShow = (show: Show) => {
    var imgSource = { uri: show.images.poster };
    return (
      <TouchableHighlight style={styles.highlight} onPress={() => this.onPressMovie(show)}>
        <Image style={styles.thumb} source={imgSource} />
      </TouchableHighlight>
    );
  };
  
  onPressMovie = (movie: Show) => {
    const cb = this.props.onClick;
    if (cb) cb(movie);
  }
  
}

const imageWidth = 320/ 3;
const imageHeight = (300/ 3) * 1.5;

var styles = StyleSheet.create({
  container: {

  } as ViewStyle,
  title: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold"
  } as TextStyle,
  list: {
    height: imageHeight
  } as ViewStyle,
  highlight: {
    width: imageWidth,
    height: imageHeight,
    marginLeft: 5
  },
  thumb: {
    width: imageWidth,
    height: imageHeight,
  }
});


