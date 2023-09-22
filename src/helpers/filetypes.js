const path = require('path');

const checkExt = function (file, cb, type = 'images') {
    let allowed = images();

    if (type == 'music') allowed = music()

    let fileExt = path.extname(file.originalname);

    let ext = allowed.test(fileExt.toLowerCase());
    let mimetype = allowed.test(file.mimetype);

    if (!mimetype || !ext) {
        const err = new Error(fileExt + ' is not allowed!');
        err.code = 'FILE_TYPE_NOT_ALLOWED';

        return cb(err);
    }

    cb(null, true);
}

const images = () => {
    return /jpg|jpeg|png/
}

const music = () => {
    return /mp3|wav|ogg/;
}

module.exports = {
    checkExt
}