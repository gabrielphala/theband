const Album = require("../models/Album");
const Song = require("../models/Song");

module.exports = class AlbumService {
    static async getIncompleteByArtist (artistId) {
        let albumInfo = await Album.getIncompleteByArtist(artistId);

        if (!albumInfo) {
            albumInfo = await Album.insert({
                artist_id: artistId
            });
        }

        return albumInfo;
    }

    static async addAlbumName (res_wrap, body, { artistInfo }) {
        try {
            let albumInfo = await AlbumService.getIncompleteByArtist(artistInfo.id);

            albumInfo.name = body.name;
            albumInfo.is_ready = true;

            albumInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async addAlbumCover (res_wrap, body, req) {
        try {
            const artistId = req.store.artistInfo.id;

            if (!req.files[0]) return res_wrap;

            const albumInfo = await AlbumService.getIncompleteByArtist(artistId)

            albumInfo.has_cover = true;
            albumInfo.cover = req.files[0].filename;

            if (albumInfo.has_name && albumInfo.has_file) albumInfo.is_ready = true;

            albumInfo.save();

            res_wrap.cover = req.files[0].filename;
            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async getAllReadyByArtist (res_wrap, body, { artistInfo }) {
        try {
            res_wrap.albums = await Album.getReadyAlbumsByArtist(artistInfo.id);

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async deleteAlbum (res_wrap, body) {
        try {
            Album.delete_album(body.album_id)
            Song.deleteSongsByAlbum(body.album_id)

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }
}