import * as React from "react";
import { StyleSheet, ScrollView} from "react-native";
import api from "../api";
import MoviesSlider from "../components/MoviesSlider";
import {Movie} from "../api";

interface MoviesState {
  trendingMovies: Movie[],
  lastAddedMovies: Movie[],
  trendingActionMovies: Movie[],
  trendingComedyMovies: Movie[],
}

export default class Movies extends React.Component<{}, MoviesState> {
  
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
    const trendingMovies = await api.movies({sort: "trending", order: -1});
    const lastAddedMovies = await api.movies({sort: "last added", order: -1});
    const trendingActionMovies = await api.movies({sort: "trending", genre: "action", order: -1});
    const trendingComedyMovies = await api.movies({sort: "trending", genre: "comedy", order: -1});
    this.setState({trendingMovies, lastAddedMovies, trendingActionMovies, trendingComedyMovies});
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
      <ScrollView style={styles.container}>
        <MoviesSlider movies={this.state.trendingMovies} onClick={movie => this.downloadMovie(movie)} title="Trending Movies"/>
        <MoviesSlider movies={this.state.lastAddedMovies} onClick={movie => this.downloadMovie(movie)} title="Last Added"/>
        <MoviesSlider movies={this.state.trendingActionMovies} onClick={movie => this.downloadMovie(movie)} title="Trending Action Movies"/>
        <MoviesSlider movies={this.state.trendingComedyMovies} onClick={movie => this.downloadMovie(movie)} title="Trending Comedy Movies"/>
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