const base_controller = require('../controllers/base');
const SongService = require('../../services/Song');

const { anyFiles } = require('../../config/multer');

module.exports = (router) => {
    router.post('/song/add-name', base_controller.wrap_with_store(SongService.addSongName));
    router.post('/song/delete', base_controller.wrap(SongService.deleteSongById));

    router.post(
        '/song/add-cover',
        (req, res, next) => {
            anyFiles('./public/assets/uploads/covers')(req, res, async (err) => {
                req.res_wrap = await SongService.addSongCover(
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

    router.post(
        '/song/add-file',
        (req, res, next) => {
            anyFiles('./public/assets/uploads/songs', 'music')(req, res, async (err) => {
                req.res_wrap = await SongService.addSongFile(
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

    router.post('/songs/get-ready-by-artist', base_controller.wrap_with_store(SongService.getAllReadyByArtist));
    router.post('/songs/get-all-ready', base_controller.wrap(SongService.getAllReadySongs));
};