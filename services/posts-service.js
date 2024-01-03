
class PostService extends ServicesBase {

    apiBaseUrl = ""
    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/posts"
    }

    logindata() {

        let logindata = localStorage.getItem('login-data');
        let data = JSON.parse(logindata);
        return data;
    }

    async getAllPosts() {

        let tokenData = this.logindata();
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${tokenData.token}`
            }
        }

        let response = await fetch(this.apiBaseUrl, requestInfo);
        let posts = await response.json();
        return posts;

    }
    async getPost(id) {

        let response = await fetch(`${this.apiBaseUrl}/${id}`);
        let post = await response.json();
        return post;
    }


    async delete(id) {

        let tokenData = this.logindata();

        let url = `${this.apiBaseUrl}/${id}`
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${tokenData.token}`
            }
        }
        return fetch(url, requestInfo)
    }
}