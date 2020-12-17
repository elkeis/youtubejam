import axios from 'axios';
import { PLAYLIST_URL } from './constants';

export async function fetchPlaylist() {
    const playlist  = (await axios.get(PLAYLIST_URL)).data;
    return playlist;
}