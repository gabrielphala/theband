import axios from "axios"

import fetch from "../helpers/fetch";
import { closeModal, openModal } from "../helpers/modal";
import { arrayNotEmpty } from "../helpers/array";
import { formatAlbumsForArtist } from "../helpers/format";
import { showError } from "../helpers/error";

export default () => {
    window.Album = class Album {
        static async addAlbumCover () {
            const data = new FormData();

            const cover = $('#album-cover')[0];
            const file = cover.files ? cover.files[0] : '';

            data.append('cover', file);

            const res = await axios.post('/album/add-cover', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (p) => {
                    const progress = Math.floor((p.progress || 0) * 100);

                    $('#album-cover-progress').text(`${progress}% complete`);
                }
            })

            if (res.data.successful) {
                $('#album-cover-preview')[0].style.backgroundImage =
                    `url("/assets/uploads/covers/${res.data.cover}")`;
            }
        }

        static async addAlbumName () {
            const res = await fetch('/album/add-name', {
                body: {
                    name: $('#album-name').val()
                }
            })

            if (res.successful) {
                closeModal('new-album')

                Album.getReadyAlbumsByArtist();

                return;
            }

            showError('new-album-error', res.error)
        }

        static async removeAlbum (album_id) {
            await fetch('/album/delete', {
                body: {
                    album_id
                }
            })

            Album.getReadyAlbumsByArtist()
        }

        static async getReadyAlbumsByArtist () {
            const res = await fetch('/albums/get-ready-by-artist')

            $('#no-songs').hide()

            if (arrayNotEmpty(res.albums)) {
                $('#no-albums').hide();
                $('#album-list').html(formatAlbumsForArtist(res.albums))

                $('.container__main__center__covers__item__back__del').on('click', e => {
                    const set = e.currentTarget.dataset;

                    Album.removeAlbum(set.albumid);
                })

                $('.container__main__center__covers__item__add-song').on('click', e => {
                    const set = e.currentTarget.dataset;

                    $('#cover-preview')[0].style.backgroundImage = `url("/assets/uploads/covers/${set.albumcover}")`;
                    $('#cover-progress').hide();
                    $('#album-id').val(set.albumid)

                    openModal('new-song');
                })

                return;
            }

            $('#album-list').html(' ')
            $('#no-albums')[0].style.display = 'flex';
        }
    }
}