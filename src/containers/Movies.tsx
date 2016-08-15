import * as React from "react";
import {StyleSheet, ScrollView} from "react-native";
import api from "../api";
import MoviesSlider from "../components/MoviesSlider";
import {Movie} from "../api";
import MovieScreen from "./MovieScreen";

interface MoviesProps {
  navigator: any
}

interface MoviesState {
  trendingMovies: Movie[],
  lastAddedMovies: Movie[],
  trendingActionMovies: Movie[],
  trendingComedyMovies: Movie[],
}

export default class Movies extends React.Component<MoviesProps, MoviesState> {

  static title = "Movies";

  constructor() {
    super();
    this.state = {
      trendingMovies: [],
      lastAddedMovies: [],
      trendingActionMovies: [],
      trendingComedyMovies: []
    }
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const [trendingMovies, lastAddedMovies, trendingActionMovies, trendingComedyMovies] = await Promise.all([
      api.movies({sort: "trending", order: -1}),
      api.movies({sort: "last added", order: -1}),
      api.movies({sort: "trending", genre: "action", order: -1}),
      api.movies({sort: "trending", genre: "comedy", order: -1})
    ]);
    this.setState({trendingMovies, lastAddedMovies, trendingActionMovies, trendingComedyMovies});
  }

  toMovieScreen(movie: Movie) {
    this.props.navigator.push({
      component: MovieScreen,
      title: movie.title,
      passProps: {movie}
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <MoviesSlider movies={this.state.trendingMovies} onClick={movie => this.toMovieScreen(movie)}
                      title="Trending Movies"/>
        <MoviesSlider movies={this.state.lastAddedMovies} onClick={movie => this.toMovieScreen(movie)}
                      title="Last Added"/>
        <MoviesSlider movies={this.state.trendingActionMovies} onClick={movie => this.toMovieScreen(movie)}
                      title="Trending Action Movies"/>
        <MoviesSlider movies={this.state.trendingComedyMovies} onClick={movie => this.toMovieScreen(movie)}
                      title="Trending Comedy Movies"/>
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