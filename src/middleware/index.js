const jwt = require('../helpers/Jwt');

// module.exports.isStudentAuth = (req, res, next) => {
//     if (!req.store || req.store && !req.store.student_info)
//         return res.redirect('/s/sign-in');

//     next();
// }

// module.exports.isLecturerAuth = (req, res, next) => {
//     if (!req.store || req.store && !req.store.lecturer_info)
//         return res.redirect('/l/sign-in');

//     next();
// }

// module.exports.isAdminrAuth = (req, res, next) => {
//     if (!req.store || req.store && !req.store.admin_info)
//         return res.redirect('/a/sign-in');

//     next();
// }

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.cookies || !req.store)
        return res.redirect('/sign-in');

    if (req.store && !req.store.artistInfo && !req.store.organizerInfo && !req.store.supporterInfo)
        return res.redirect('/sign-in');

    next();
}

module.exports.isArtistLoggedIn = (req, res, next) => {
    if (!req.cookies || !req.store || req.store && !req.store.artistInfo)
        return res.redirect('/artist/sign-in');

    next();
}

module.exports.isOrganizerLoggedIn = (req, res, next) => {
    if (!req.cookies || !req.store || req.store && !req.store.organizerInfo)
        return res.redirect('/organizer/sign-in');

    next();
}

module.exports.loadArtistInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tb_artist'])
        return next();

    jwt.verify(req.cookies['tb_artist'].jwtAccess, (artistInfo) => {
        if (!req.store) req.store = {}
        req.store.artistInfo = artistInfo;
        res.locals.artistInfo = artistInfo;
    });

    next();
}


module.exports.loadOrganizerInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tb_organizer'])
        return next();

    jwt.verify(req.cookies['tb_organizer'].jwtAccess, (organizerInfo) => {
        if (!req.store) req.store = {}
        req.store.organizerInfo = organizerInfo;
        res.locals.organizerInfo = organizerInfo;
    });

    next();
}

module.exports.loadSupporterInfo = (req, res, next) => {
    if (!req.cookies || req.cookies && !req.cookies['tb_supporter'])
        return next();

    jwt.verify(req.cookies['tb_supporter'].jwtAccess, (supporterInfo) => {
        if (!req.store) req.store = {}
        req.store.supporterInfo = supporterInfo;
        res.locals.supporterInfo = supporterInfo;
    });

    next();
}