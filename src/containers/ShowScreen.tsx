import * as React from "react";
import {StyleSheet, View, Text, Image, TouchableHighlight, ListView} from "react-native";
import {Show, ShowDetails, ShowEpisode} from "../api";
import api from "../api";
import ScrollViewStyle = __React.ScrollViewStyle;
import TextStyle = __React.TextStyle;
import ImageStyle = __React.ImageStyle;
import ViewStyle = __React.ViewStyle;

interface ShowScreenProps {
  show: Show
}

interface ShowScreenState {
  ds: __React.ListViewDataSource,
  showDetails?: ShowDetails
}

export default class ShowScreen extends React.Component<ShowScreenProps, ShowScreenState> {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    }
  }

  componentDidMount() {
    this.fetchShowDetails();
  }

  async fetchShowDetails() {
    const showDetails = await api.showDetails(this.props.show.imdb_id);

    console.log("show details", showDetails);

    this.setState({
      showDetails,
      ds: this.state.ds.cloneWithRows(showDetails.episodes)
    });
  }


  render() {
    return (
      <ListView contentContainerStyle={styles.container}
                enableEmptySections={true}
                dataSource={this.state.ds}
                renderHeader={this.renderHeader}
                renderRow={this.renderEpisode}
      />
    )
  }

  renderHeader = () => {
    const {show} = this.props;
    return (
      <View>
        <Image style={styles.image} source={{uri: show.images.fanart }}/>
        <View style={styles.textContent}>
          <Text style={styles.subtitle}>Rating: {show.rating.percentage}% {show.year}</Text>
        </View>
        <Text>Episode</Text>
      </View>
    )
  }

  renderEpisode = (episode: ShowEpisode) => {
    return (
      <View style={styles.episode}>
        <TouchableHighlight onPress={() => this.playEpisode(episode)}>
          <Text style={styles.episodeText}>S{episode.season}E{episode.season} {episode.title}</Text>
        </TouchableHighlight>
      </View>
    )
  };

  async playEpisode(episode: ShowEpisode) {
    try {
      const torrent = episode.torrents["1080p"] || episode.torrents["720p"] || episode.torrents["480p"];
      const magnet = torrent.url;
      await api.playMagnet(magnet);
    } catch (e) {
      console.log(e);
    }
  }

}


var styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414"
  } as ViewStyle,
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
  },
  episode: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#777"
  } as ViewStyle,
  episodeText: {
    color: "#777",
  }
});