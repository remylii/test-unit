import { showAngelSong, notFoundAngelSong } from './angel-song';


/**
 * @var {object}
 */
let angel_song_data = {};

class AngelSongContainer {
  static renderAngelSong(data) {
    let angel_song_data = data;

    return showAngelSong(angel_song_data);
  }

  /**
   * @return {HTMLCollection<HTMLDivElement>} html - component
   */
  static renderEmpty() {
    let angel_song_data = {};

    return notFoundAngelSong();
  }
}

export default AngelSongContainer;
