/* Posts Page JavaScript */

"use strict";
let postService;
let likeService;
let posts;
let deletePostButton;
let likeButton;
let isLike;

document.addEventListener("DOMContentLoaded", () => {
    postService = new PostService();
    likeService = new LikeService();
    displayPosts();
})

async function displayPosts() {
    posts = await postService.getAllPosts()
    console.log(posts)
    posts.forEach(displayPost);
}
//displaying posts using a template
function displayPost(post) {

    // clone template html instead of building the card by hand
    const card = postDetailsTemplate.content.cloneNode(true)

    // set all values
    card.getElementById("username").innerText = post.username
    card.getElementById("postText").innerText = post.text
    card.getElementById("likeCount").innerText = post.likes.length;
    let date = new Date(post.createdAt);
    let year = date.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];;
    let day = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    card.getElementById("postTimestamp").innerText = `${month} ${day}, ${year}  Time:${hours}:${min}`
    // card.getElementById("postId").innerText = post._id;
    card.getElementById("deletePost").innerHTML = `<button class="btn btn-danger" id=button${post._id} type="button">Delete</button>`;
    card.getElementById("likeby").id = `like${post._id}`
    postsContainer.appendChild(card)
    deletePostButton = document.getElementById(`button${post._id}`);
    likeButton = document.getElementById(`like${post._id}`);
    likeButton.addEventListener("click", () => {
        // Toggle the state
        isLike = !isLike;
        let dataOfToken = likeService.logindata();

        let like = post.likes.find(m => m.username == dataOfToken.username)
        //action when state is true or no like from the user
        if (isLike || !like) {
            console.log('Like');
            likeService.addLike(post._id);

        } else {
            // Action when the state is false
            console.log('Dislike');
            likeService.delete(like._id);
        }
    })
    //deleting the post when clicked on delete button
    deletePostButton.addEventListener("click", () => {
        const isDeleteConfirmed = confirm(`You are about to delete ${post.text}, do you want to continue?`)
        if (isDeleteConfirmed) {
            postService.delete(post._id)
            location.href = "./index.html"
        }
    })

}


