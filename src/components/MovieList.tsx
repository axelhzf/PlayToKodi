import * as React from "react";
import {ListView, StyleSheet, TouchableHighlight, Image} from "react-native";
import {Movie} from "../api";
import ViewStyle = __React.ViewStyle;

interface MovieListProps {
  movies: Movie[],
  onClick?: (movie: Movie) => void
}

interface MovieListState {
    ds: __React.ListViewDataSource
}

export default class MovieList extends React.Component<MovieListProps, MovieListState> {

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
  
  componentDidUpdate(prevProps: MovieListProps) {
    if (this.props.movies != prevProps.movies) {
      this.setState({ds: this.state.ds.cloneWithRows(this.props.movies)});
    }
  }
  
  render() {
    return (
      <ListView contentContainerStyle={styles.list}
                enableEmptySections={true}
                dataSource={this.state.ds}
                renderRow={this.renderMovie}
      />
    )
  }
  
  renderMovie(movie: Movie) {
    var imgSource = { uri: movie.images.poster };
    return (
      <TouchableHighlight style={styles.highlight} onPress={() => this.onPressMovie(movie)}>
        <Image style={styles.thumb} source={imgSource} />
      </TouchableHighlight>
    );
  }
  
  onPressMovie = (movie: Movie) => {
    const cb = this.props.onClick;
    if (cb) cb(movie);
  }
  
}

var styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  } as ViewStyle,
  highlight: {
    width: 320 / 3,
    height: (300/ 3) * 1.5,
    marginBottom: 10
  },
  thumb: {
    width: 300 / 3,
    height: (300/ 3) * 1.5,
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});


