import fetch from "../helpers/fetch.js"
import { showError } from "../helpers/error.js"

export default () => {
    window.Supporter = class Supporter {
        static async signUp () {
            const response = await fetch('/supporter/sign-up', {
                body: {
                    firstname: $('#firstname').val(),
                    lastname: $('#lastname').val(),
                    email: $('#email-address').val(),
                    password: $('#password').val(),
                    passwordAgain: $('#password-again').val()
                }
            })

            if (response.successful) {
                return location.href = '/'
            }

            showError('auth-error', response.error)
        }

        static async signIn () {
            const response = await fetch('/supporter/sign-in', {
                body: {
                    email: $('#email-address').val(),
                    password: $('#password').val()
                }
            })

            if (response.successful) {
                location.href = '/'
                return;
            }

            showError('auth-error', response.error)
        }
    }
}