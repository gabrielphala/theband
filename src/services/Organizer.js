const Organizer = require("../models/Organizer");

const { hash, isSame } = require("../helpers/Hasher");

const v = require("../helpers/Validation")
const jwt = require("../helpers/Jwt")

module.exports = class OrganizerService {
    static async signUp (res_wrap, body) {
        try {
            v.validate({
                'First name': { value: body.firstname, min: 2, max: 30 },
                'Last name': { value: body.lastname, min: 2, max: 30 },
                'Email address': { value: body.email, min: 5, max: 30 },
                'Password': { value: body.password, min: 8, max: 30 },
                'Confirmation password': { value: body.passwordAgain, min: 8, max: 30 },
            });

            if ((await Organizer.exists({ email: body.email })).found) throw 'Email already in use';

            const organizerDetails = await Organizer.insert({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: await hash(body.password)
            })

            delete organizerDetails.password;

            const tokens = jwt.get_cookie_tokens(organizerDetails.toObject());
            res_wrap.set_cookie('tb_organizer', tokens);

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

            const organizerDetails = await Organizer.findOne({ condition: { email: body.email } });

            if (!(await isSame(organizerDetails.password, body.password)))
                throw 'Password or email address is incorrect';

            delete organizerDetails.password;

            const tokens = jwt.get_cookie_tokens(organizerDetails.toObject());
            res_wrap.set_cookie('tb_organizer', tokens);

            res_wrap.successful = true;
        } catch (e) { throw e; }

        return res_wrap;
    }
}