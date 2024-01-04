class RegisterService{
    apiBaseURL = "http://localhost:5000";
    url=`${this.apiBaseURL}/api/users`
    async createUser(user){
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        }
        return fetch(this.url, requestInfo)
        // .then(response => response.json())
    }
    }