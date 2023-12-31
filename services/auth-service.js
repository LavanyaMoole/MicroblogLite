/* auth.js provides LOGIN-related functions */

"use strict"

class AuthService
{

    apiBaseURL = "http://localhost:5000"
    // Primary Server:
    //      http://microbloglite.us-east-2.elasticbeanstalk.com/
    // Backup servers:
    //      https://microbloglite.herokuapp.com/
    //      https://microbloglite.onrender.com/


    // You can use this function to get the login data of the logged-in
    // user (if any). It returns either an object including the username
    // and token, or an empty object if the visitor is not logged in.
    getLoginData()
    {
        const loginJSON = window.localStorage.getItem("login-data")
        return JSON.parse(loginJSON) || {}
    }


    // You can use this function to see whether the current visitor is
    // logged in. It returns either `true` or `false`.
    isLoggedIn()
    {
        const loginData = this.getLoginData();
        return Boolean(loginData.token)
    }


    // This function is already being used in the starter code for the
    // landing page, in order to process a user's login. READ this code,
    // and feel free to re-use parts of it for other `fetch()` requests
    // you may need to write.
    async login(loginData)
    {
        // POST /auth/login
        const options = {
            method: "POST",
            headers: {
                // This header specifies the type of content we're sending.
                // This is required for endpoints expecting us to send
                // JSON data.
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        }

        return fetch(this.apiBaseURL + "/auth/login", options)
            .then(response => response.json())
            .then(loginData =>
            {
                window.localStorage.setItem("login-data", JSON.stringify(loginData))
                window.location.assign("./posts/index.html")  // redirect

                return loginData
            })
    }


    // This is the `logout()` function you will use for any logout button
    // which you may include in various pages in your app. Again, READ this
    // function and you will probably want to re-use parts of it for other
    // `fetch()` requests you may need to write.
    async logout()
    {
        const loginData = this.getLoginData()

        // GET /auth/logout
        const options = {
            method: "GET",
            headers: {
                // This header is how we authenticate our user with the
                // server for any API requests which require the user
                // to be logged-in in order to have access.
                // In the API docs, these endpoints display a lock icon.
                Authorization: `Bearer ${loginData.token}`,
            },
        }

        fetch(this.apiBaseURL + "/auth/logout", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .finally(() =>
            {
                // We're using `finally()` so that we will continue with the
                // browser side of logging out (below) even if there is an 
                // error with the fetch request above.

                window.localStorage.removeItem("login-data")  // remove login data from LocalStorage
                window.location.assign("/")  // redirect back to landing page
            })
    }
}
