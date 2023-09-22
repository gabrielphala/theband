const Artist = require("../models/Artist");

const { hash, isSame } = require("../helpers/Hasher");

const v = require("../helpers/Validation")
const jwt = require("../helpers/Jwt")

module.exports = class ArtistService {
    static async signUp (res_wrap, body) {
        try {
            v.validate({
                'Stage name': { value: body.stage_name, min: 2, max: 30 },
                'Email address': { value: body.email, min: 5, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirmation password': { value: body.passwordAgain, min: 8, max: 30 },
            });

            if ((await Artist.exists({ email: body.email })).found) throw 'Email already in use';
            else if ((await Artist.exists({ stage_name: body.stage_name })).found) throw 'Stage name already in use'

            const artistDetails = await Artist.insert({
                stage_name: body.stage_name,
                email: body.email,
                password: await hash(body.password)
            })

            delete artistDetails.password;

            const tokens = jwt.get_cookie_tokens(artistDetails.toObject());
            res_wrap.set_cookie('tb_artist', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async signIn (res_wrap, body) {
        try {
            v.validate({
                'Email address': { value: body.email, min: 5, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 }
            });

            const artistDetails = await Artist.findOne({ condition: { email: body.email } });

            if (!artistDetails) throw 'Password or email address is incorrect';

            if (!(await isSame(artistDetails.password, body.password)))
                throw 'Password or email address is incorrect';

            delete artistDetails.password;

            const tokens = jwt.get_cookie_tokens(artistDetails.toObject());
            res_wrap.set_cookie('tb_artist', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getAll (res_wrap, _) {
        try {
            res_wrap.artists = await Artist.getAll();
        } catch (e) { throw e; }

        return res_wrap;
    }
}