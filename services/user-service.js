class UserService extends ServicesBase {
    apiBaseUrl = ""

    constructor () {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/users"
    }


     createUser (user) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        return fetch(this.apiBaseUrl, options) 
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.error(error);
            })
        
    }
}
