import axios from "axios"

import fetch from "../helpers/fetch";
import { closeModal } from "../helpers/modal";
import { formatSongsForArtist, formatSongsForHome, formatSongsForNext } from "../helpers/format";
import { arrayNotEmpty } from "../helpers/array";
import { getQuery } from "../helpers/urlquery.js";
import { showError } from "../helpers/error";

export default () => {
    window.Song = class Song {
        static async addSongCover () {
            const data = new FormData();

            const cover = $('#song-cover')[0];
            const file = cover.files ? cover.files[0] : '';

            data.append('cover', file);

            const res = await axios.post('/song/add-cover', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (p) => {
                    const progress = Math.floor((p.progress || 0) * 100);

                    $('#cover-progress').text(`${progress}% complete`);
                }
            })

            if (res.data.successful) {
                $('#cover-preview')[0].style.backgroundImage =
                    `url("/assets/uploads/covers/${res.data.cover}")`;
            }
        }

        static async addSongFile () {
            const data = new FormData();

            const song = $('#song-file')[0];
            const file = song.files ? song.files[0] : '';

            data.append('song', file);

            const res = await axios.post('/song/add-file', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (p) => {
                    const progress = Math.floor((p.progress || 0) * 100);

                    $('#song-progress').text(`${progress}% Complete`);
                }
            })
        }

        static async addSongName () {
            const res = await fetch('/song/add-name', {
                body: {
                    name: $('#song-name').val(),
                    genre: $('#song-genre').val(),
                    album_id: $('#album-id').val() || null
                }
            })

            if (res.successful) {
                closeModal('new-song')

                Song.getReadySongsByArtist()

                return;
            }

            showError('new-song-error', res.error)
        }

        static async removeSong (song_id) {
            const res = await fetch('/song/delete', {
                body: {
                    song_id
                }
            })

            Song.getReadySongsByArtist()
        }

        static async getReadySongsByArtist () {
            const res = await fetch('/songs/get-ready-by-artist')

            $('#no-albums').hide();

            if (arrayNotEmpty(res.songs)) {
                $('#no-songs').hide()
                $('#single-list').html(formatSongsForArtist(res.songs))

                $('.container__main__center__covers__item__back__del').on('click', e => {
                    const set = e.currentTarget.dataset;

                    Song.removeSong(set.songid);
                })

                return;
            }

            $('#single-list').html(' ')
            $('#no-songs')[0].style.display = 'flex';
        }

        static async loadHomeSongs () {
            const res = await fetch('/songs/get-all-ready')

            if (arrayNotEmpty(res.songs)) {
                $('#no-songs').hide()
                $('#song-list').html(formatSongsForHome(res.songs))

                return;
            }

            $('#song-list').html(' ')
            // $('#no-songs')[0].style.display = 'flex';
        }

        static async loadSongToListen () {
            const song_id = getQuery('s');

            const res = await fetch('/song/get-by-id', {
                body: {
                    song_id
                }
            })

            if (res.song) {
                $('#song-cover')[0].style.backgroundImage = `url('/assets/uploads/covers/${res.song._album_cover || res.song.cover}')`
                $('#audio-src')[0].src = `/assets/uploads/songs/${res.song.file}`;
            
                $('#song-download-link').attr('href', `/assets/uploads/songs/${res.song.file}`)
            }
        }

        static async loadNextSongsToListen () {
             const res = await fetch('/songs/get-all-ready')

            $('#song-list').html(formatSongsForNext(res.songs))
        }
    }
}