import * as React from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableHighlight} from "react-native";
import {Movie} from "../api";
import api from "../api";
import ScrollViewStyle = __React.ScrollViewStyle;
import TextStyle = __React.TextStyle;
import ImageStyle = __React.ImageStyle;
import ViewStyle = __React.ViewStyle;
import Button from "../components/Button";

interface MovieState {
  movie: Movie
}

export default class MoviesScreen extends React.Component<MovieState, {}> {

  async play1080p(movie: Movie) {
    try {
      const magnet = movie.torrents["en"]["1080p"].url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.log(e);
    }
  };

  async play720p(movie: Movie) {
    try {
      const magnet = movie.torrents["en"]["720p"].url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {movie} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: movie.images.fanart }} />
        <View style={styles.textContent}>
          <Text style={styles.subtitle}>Rating: {movie.rating.percentage}%   {movie.year}   {movie.runtime}min</Text>
          <Text style={styles.synopsis}>{movie.synopsis}</Text>
        </View>
        <View style={styles.actions}>
          {this.renderButtons()}
        </View>
      </ScrollView>
    );
  }

  renderButtons() {
    const {movie} = this.props;

    const button1080p = movie.torrents["en"]["1080p"] ?
      <Button key="1080" text="Play 1080p" onPress={() => this.play1080p(movie)} />
      : null;
    const button720p = movie.torrents["en"]["720p"] ?
      <Button key="720" type="secondary" text="Play 720p" onPress={() => this.play720p(movie)} />
      : null;
    const buttonTrailer = movie.trailer?
      <Button key="trailer" type="secondary" text="Play trailer" onPress={() => 2} />
      : null;

    return [button1080p, button720p, buttonTrailer]

  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414"
  } as ScrollViewStyle,
  image: {
    height: 200,
    marginBottom: 15
  } as ImageStyle,
  textContent: {
    paddingLeft: 5,
    paddingRight: 5
  } as TextStyle,
  subtitle: {
    color: "#777",
    marginBottom: 15
  } as TextStyle,
  synopsis: {
    color: "#fff"
  } as TextStyle,
  actions: {
    marginTop: 25,
    paddingLeft: 5,
    paddingRight: 5
  }
});