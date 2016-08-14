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
  sort?: string,
    order?: number,
    genre?: string,
    keywords?: string
}


export default new Api();
