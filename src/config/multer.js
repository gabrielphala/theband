const multer = require('multer');
const path = require('path');

const { checkExt } = require('../helpers/filetypes');

const getExtension = (fname) => {
    return path.extname(fname);
}

const getNameWithoutExt = (ext, fname) => {
    return fname.split(ext)[0];
}

const setStorage = (destination) => {
    return multer.diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
            let ext = getExtension(file.originalname),
                nameWithoutExt = getNameWithoutExt(ext, file.originalname),
                timestamp = Date.now();

            cb(null, nameWithoutExt + '-' + timestamp + ext)
        }
    });
}

const getLimits = (type) => ({
    fileSize: 18000000,
    fileFilter: () => ((_req, file, cb) => {
        return checkExt(file, cb, type);
    }),
});

const anyFiles = (destination, type = 'images') => {
    let storage = setStorage(destination);

    return multer({
        storage,
        limits: getLimits(type)
    }).any();
}

module.exports = {
    limits: getLimits('images'),
    setStorage,
    anyFiles
};