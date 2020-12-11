import axios from 'axios';

const PLAYLIST_URL = '/playlist';

export async function fetchPlaylist() {
    const playlist  = (await axios.get(PLAYLIST_URL)).data;
    return playlist;
}