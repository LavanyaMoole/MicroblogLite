let profileService;
let postText;
let post;
let addPostButton;
document.addEventListener("DOMContentLoaded", () => {
    profileService = new ProfileService();

    addPostButton = document.getElementById("addPostButton");
    addPostButton.addEventListener("click", addPostButtonClicked)
    postText.value = "";

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