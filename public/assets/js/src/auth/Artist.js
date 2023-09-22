import fetch from "../helpers/fetch.js"
import { showError } from "../helpers/error.js"

export default () => {
    window.Artist = class Artist {
        static async signUp () {
            const response = await fetch('/artist/sign-up', {
                body: {
                    stage_name: $('#stage-name').val(),
                    email: $('#email-address').val(),
                    password: $('#password').val(),
                    passwordAgain: $('#password-again').val()
                }
            })

            if (response.successful) {
                return location.href = '/artist/discography'
            }

            showError('auth-error', response.error)
        }

        static async signIn () {
            const response = await fetch('/artist/sign-in', {
                body: {
                    email: $('#email-address').val(),
                    password: $('#password').val()
                }
            })

            if (response.successful) {
                location.href = '/artist/discography'
                return;
            }

            showError('auth-error', response.error)
        }
    }
}