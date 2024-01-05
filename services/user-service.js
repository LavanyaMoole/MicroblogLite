class RegisterService extends ServicesBase{
    apiBaseURL = "";
    constructor() {
        super();
        this.apiBaseURL = this.baseUrl + "/api/users"
    }
    // url=`${this.apiBaseURL}/api/users`
    async createUser(user){
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        }
        return fetch(this.apiBaseURL, requestInfo)
        // .then(response => response.json())
    }
    }