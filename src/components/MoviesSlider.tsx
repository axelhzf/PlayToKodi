import * as React from "react";
import {ListView, StyleSheet, TouchableHighlight, Image, View, Text} from "react-native";
import {Movie} from "../api";
import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

interface MoviesSliderProps {
  movies: Movie[],
  title?: string,
  onClick?: (movie: Movie) => void
}

interface MoviesSliderState {
    ds: __React.ListViewDataSource
}

export default class MoviesSlider extends React.Component<MoviesSliderProps, MoviesSliderState> {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    }
  }
  
  componentDidMount() {
    this.setState({ds: this.state.ds.cloneWithRows<Movie>(this.props.movies)});
  }
  
  componentDidUpdate(prevProps: MoviesSliderProps) {
    if (this.props.movies != prevProps.movies) {
      this.setState({ds: this.state.ds.cloneWithRows(this.props.movies)});
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
                  renderRow={this.renderMovie}
                  horizontal={true}
        />
      </View>
    )
  }
  
  renderMovie = (movie: Movie) => {
    var imgSource = { uri: movie.images.poster };
    return (
      <TouchableHighlight style={styles.highlight} onPress={() => this.onPressMovie(movie)}>
        <Image style={styles.thumb} source={imgSource} />
      </TouchableHighlight>
    );
  };
  
  onPressMovie = (movie: Movie) => {
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


