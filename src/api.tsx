import * as qs from "qs";

class Api {

  endpoint = "https://api-fetch.website";

  constructor() {

  }

  async movies(query: MoviesQuery = {}): Promise<Movie[]> {
    const url = `${this.endpoint}/tv/movies/1?${qs.stringify(query)}`;
    const response = await fetch(url);
    return await response.json();
  }

  async shows(query: ShowsQuery = {}): Promise<Show[]> {
    const url = `${this.endpoint}/tv/shows/1?${qs.stringify(query)}`;
    console.log("url", url);
    const response = await fetch(url);
    return await response.json();
  }

  async showDetails(imdbId: string): Promise<ShowDetails> {
    const url = `${this.endpoint}/tv/show/${imdbId}`;
    const response = await fetch(url);
    return await response.json();
  }

  async playMagnet(magnet: string) {
    const encodedMagnet = encodeURIComponent(magnet);
    const body = {
      jsonrpc: "2.0",
      method: "Player.Open",
      id: 1,
      params: {
        item: {
          file: `plugin://plugin.video.xbmctorrent/play/${encodedMagnet}`
        }
      }
    };

    const response = await fetch("http://192.168.1.39/jsonrpc",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    return await response.json();

  }

}

export interface Movie {
  _id: string,
  certification: string,
  genres: string[],
  images: {
    banner: string,
    fanart: string,
    poster: string,
  },
  imdb_id: string,
  rating: {
    hated: number,
    loved: number,
    percentage: number,
    votes: number,
    watching: number,
  },
  released: number,
  runtime: string,
  synopsis: string,
  title: string,
  torrents: {
    [key: string]: {
      [key: string]: Torrent
    }
  },
  trailer: string,
  year: string
}

interface Torrent {
  filesize: string,
  peer: number,
  provider: string,
  seed: number,
  size: number,
  url: string
}

export interface MoviesQuery {
  sort?: "last added" | "rating" | "title" | "trending" | "year",
  genre?: Genres,
  order?: number,
  keywords?: string
}

type Genres =
  "action" | "adventure" | "animation" | "comedy" | "crime" |" disaster" | "documentary" | "drama" | "eastern" | "family" | "fan-film" | "fantasy" | "film-noir" | "history" | "holiday" | "horror" | "indie" | "music" | "mystery" | "none" | "road" | "romance" | "science-fiction" | "short" | "sports" | "sporting-event" | "suspense" | "thriller" | "tv-movie" | "war" | "western";

export interface ShowsQuery {
  sort?: "name" | "rating" | "trending" | "updated" | "year",
  order?: number,
  genre?: Genres,
  keywords?: string
}

export interface Show {
  _id: string,
  imdb_id: string,
  tvdb_id: string,
  title: string,
  year: string,
  slug: string,
  num_seasons: number,
  images: {
    banner: string,
    fanart: string,
    poster: string
  },
  rating: {
    hated: number,
    loved: number,
    votes: number,
    watching: number,
    percentage: number
  }
}

export interface ShowDetails {
  _id: string,
  imdb_id: string,
  tvdb_id: string,
  title: string,
  year: string,
  slug: string,
  synopsis: string,
  runtime: string,
  country: string,
  network: string,
  air_time: string,
  status: string,
  num_seasons: number,
  last_updated: number,
  __v: number,
  episodes: ShowEpisode[],
  genres: string[],
  images: {
    banner: string,
    fanart: string,
    poster: string
  },
  rating: {
    hated: number,
    loved: number,
    votes: number,
    watching: number,
    percentage: number
  }
}

export interface ShowEpisode {
  torrents: {
    "480p"?: ShowTorrent,
    "720p"?: ShowTorrent,
    "1080p"?: ShowTorrent
  },
  watched: {
    watched: boolean,
  },
  first_aired: number,
  date_based: boolean,
  overview: string,
  title: string,
  episode: number,
  season: number,
  tvdb_id: number
}

export interface ShowTorrent {
  provider: string,
  peer: number,
  seeds: number,
  url: string
}

export default new Api();
