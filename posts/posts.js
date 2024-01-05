/* Posts Page JavaScript */

"use strict";
let postService;
let likeService;
let posts;
let deletePostButton;
let likeButton;
let isLike;
let postsFilter;
let logout;
// let authService;
let token = JSON.parse(localStorage.getItem('login-data'))

document.addEventListener("DOMContentLoaded", async () => {
    postService = new PostService();
    likeService = new LikeService();
    // authService=new AuthService();
    postsFilter = document.getElementById('postsFilter');
    posts = await getPosts();
    console.log(posts)
    displayPosts(posts);
    postsFilter.addEventListener('change', filterPosts);
    logout = document.getElementById("logout");
    logout.addEventListener("click", logOut)

})
//get all posts
async function getPosts() {
    let Posts = await postService.getAllPosts()
    return Posts;
}
// Function to filter or sort and display posts
async function filterPosts() {
    const selectedOption = postsFilter.value;
    let filteredPosts = [...posts];

    switch (selectedOption) {
        case 'Oldest to newest':
            filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'Newest to oldest':
            filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'Most Likes':
            filteredPosts.sort((a, b) => b.likes.length - a.likes.length);
            break;

    }
    console.log(filteredPosts)

    clearPostsContainer();
    // Display the filtered posts
    displayPosts(filteredPosts);
}
function displayPosts(posts) {
    try {
        // Check if there are any posts
        if (posts.length !== 0) {
            // Display each post
            posts.forEach(displayPost);
        } else {
            console.log('No posts available.');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
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
    deletePostButton.addEventListener("click", async () => {
        const isDeleteConfirmed = confirm(`You are about to delete ${post.text}, do you want to continue?`)
        if (isDeleteConfirmed && post.username == token.username) {
            try {
                console.log("post deleted")
                //deleting the post asynchronously
                await postService.delete(post._id);
                // Redirect to the index page after successful deletion
                location.href = "./index.html";
            } catch (error) {
                // Handle errors, e.g., display an alert
                console.error('Error deleting post:', error);
            }
        } else {
            
            alert("You cannot delete the post");
            console.log("You cannot delete this post");
        }
    })

}

// emptying the posts container befor changing filter option
function clearPostsContainer() {
    let postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
}

function logOut() {

    console.log("logout success")
    authService.logout();
}