class ProfileService extends ServicesBase {
    apiBaseUrl = ""

    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/posts"
    }

    async addPost(post) {
        const token = localStorage.token
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-type": "application/json;charset=UTF-8",

                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhdmFueWE5NiIsImlhdCI6MTcwMzI4NDc3MCwiZXhwIjoxNzAzMzcxMTcwfQ.vI-LBz82sW2zHkxlhL0snV5FWmo-3eS9tXRf_eXHIho`
                // "Authorization": `Bearer ${token}`
            }
        }

        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json())

    }

}