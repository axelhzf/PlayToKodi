import * as React from "react";
import { StyleSheet, View} from "react-native";
import api from "../api";
import MovieList from "../components/MovieList";
import {Movie} from "../api";

interface MoviesState {
  movies: Movie[]
}

export default class Movies extends React.Component<{}, MoviesState> {
  
  static title = "Movies";
  
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  
  componentDidMount() {
    this.fetchMovies();
  }
  
  async fetchMovies() {
    const movies = await api.movies();
    this.setState({movies});
  }
  
  async downloadMovie(movie: Movie) {
    try {
      const magnet = movie.torrents["en"]["1080p"].url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.log(e);
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MovieList movies={this.state.movies} onClick={movie => this.downloadMovie(movie)}/>
      </View>
    );
  }
  
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414"
  }
});