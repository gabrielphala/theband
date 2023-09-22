module.exports = (class BaseController {
    constructor(wrap) {
        this.res_wrap = wrap;
    }

    render = (path, title) => (req, res) => {
        res.render(path, {
            page: {
                title
            },
            query: req.query
        });
    };

    sign_out = (req, res) => {
        if (req.store && req.store.student_info) {
            res.clearCookie('tf_student')

            return res.redirect('/s/sign-in');
        }

        else if (req.store && req.store.lecturer_info) {
            res.clearCookie('tf_lecturer')

            return res.redirect('/l/sign-in');
        }

        res.clearCookie('tf_admin')
            
        return res.redirect('/a/sign-in')
    }

    wrap = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body)
        }, res)
    }

    wrap_with_store = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body, req.store || {})
        }, res)
    }

    wrap_with_request = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body, req || {})
        }, res)
    }
});