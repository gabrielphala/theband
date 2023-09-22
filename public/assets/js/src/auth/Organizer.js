import fetch from "../helpers/fetch.js"
import { showError } from "../helpers/error.js"

export default () => {
    window.Organizer = class Organizer {
        static async signUp () {
            const response = await fetch('/organizer/sign-up', {
                body: {
                    firstname: $('#first-name').val(),
                    lastname: $('#last-name').val(),
                    email: $('#email-address').val(),
                    password: $('#password').val(),
                    passwordAgain: $('#password-again').val()
                }
            })

            if (response.successful) {
                return location.href = '/organizer/events'
            }

            showError('auth-error', response.error)
        }

        static async signIn () {
            const response = await fetch('/organizer/sign-in', {
                body: {
                    email: $('#email-address').val(),
                    password: $('#password').val()
                }
            })

            if (response.successful) {
                return location.href = '/organizer/events'
            }

            showError('auth-error', response.error)
        }
    }
}