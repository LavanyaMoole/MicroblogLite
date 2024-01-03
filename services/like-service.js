class LikeService extends ServicesBase {

    apiBaseUrl = ""
    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/likes"
    }

    logindata() {

        let logindata = localStorage.getItem('login-data');
        let data = JSON.parse(logindata);
        return data;
    }
    async addLike(postId) {

        let tokenData = this.logindata();
        console.log(tokenData)
        const requestInfo = {
            method: "POST",
            body: JSON.stringify({ postId }),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${tokenData.token}`
            }
        }

        console.log(requestInfo.body)
        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json())
    }

    async delete(likeId) {

        let tokenData = this.logindata();
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${tokenData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${likeId}`, requestInfo).then(response => response.json())
    }



}