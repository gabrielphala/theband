const base_controller = require('../controllers/base');
const AlbumService = require('../../services/Album');

const { anyFiles } = require('../../config/multer');

module.exports = (router) => {
    router.post('/album/add-name', base_controller.wrap_with_store(AlbumService.addAlbumName));
    router.post('/album/delete', base_controller.wrap(AlbumService.deleteAlbum));

    router.post(
        '/album/add-cover',
        (req, res, next) => {
            anyFiles('./public/assets/uploads/covers')(req, res, async (err) => {
                req.res_wrap = await AlbumService.addAlbumCover(
                    base_controller.res_wrap,
                    req.body,
                    req
                )

                next()
            })
        },
        base_controller.wrap_with_request((res_wrap, _, req) => {
            return { ...res_wrap, ...req.res_wrap }
        })
    );

    router.post('/albums/get-ready-by-artist', base_controller.wrap_with_store(AlbumService.getAllReadyByArtist));
};