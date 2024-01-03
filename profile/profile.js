let profileService;
let postText;
let post;
let addPostButton;
let logout;
let authService;
document.addEventListener("DOMContentLoaded", () => {
    authService=new AuthService();
    profileService = new ProfileService();


    addPostButton = document.getElementById("addPostButton");
    addPostButton.addEventListener("click", addPostButtonClicked)
    logout=document.getElementById("logout");
    logout.addEventListener("click",logOut)

})

function addPostButtonClicked(event) {
    event.preventDefault();

    postText = document.getElementById("postTextArea");

    post = {
        text: postText.value
    }

    profileService.addPost(post);


    postText.value = "";
}

function logOut(){

    console.log("logout success")
    authService.logout();
}
