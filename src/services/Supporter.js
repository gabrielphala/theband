const Supporter = require("../models/Supporter");

const { hash, isSame } = require("../helpers/Hasher");

const v = require("../helpers/Validation")
const jwt = require("../helpers/Jwt")

module.exports = class ArtistService {
    static async signUp (res_wrap, body) {
        try {
            v.validate({
                'First name': { value: body.firstname, min: 2, max: 30 },
                'Last name': { value: body.lastname, min: 2, max: 30 },
                'Email address': { value: body.email, min: 5, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirmation password': { value: body.passwordAgain, min: 8, max: 30 },
            });

            if ((await Supporter.exists({ email: body.email })).found) throw 'Email already in use';

            const supporterDetails = await Supporter.insert({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: await hash(body.password)
            })

            delete supporterDetails.password;

            const tokens = jwt.get_cookie_tokens(supporterDetails.toObject());
            res_wrap.set_cookie('tb_supporter', tokens);

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

            const supporterDetails = await Supporter.findOne({ condition: { email: body.email, isDeleted: false } });

            if (!supporterDetails) throw 'Password or email address is incorrect';

            if (!(await isSame(supporterDetails.password, body.password)))
                throw 'Password or email address is incorrect';

            delete supporterDetails.password;

            const tokens = jwt.get_cookie_tokens(supporterDetails.toObject());
            res_wrap.set_cookie('tb_supporter', tokens);

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

    static async deleteAccount (res_wrap, body, { supporterInfo }) {
        try {
            const supporterDetails = await Supporter.findOne({ condition: { id: supporterInfo.id } });

            supporterDetails.isDeleted = true;

            supporterDetails.save();
        } catch (e) { throw e; }

        return res_wrap;
    }
}