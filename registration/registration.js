let userService;
let registrationForm;
let usernameInput;
let fullNameInput;
let passwordInput;


document.addEventListener("DOMContentLoaded", () => {
    registrationForm = document.getElementById("registration");
    registrationForm.addEventListener("submit", registration);
    usernameInput = document.getElementById("userNameInput");
    fullNameInput = document.getElementById("fullNameInput");
    passwordInput = document.getElementById("passwordInput");

    userService = new UserService();
});

function registration(event) {
    event.preventDefault();


    const userData = {
        username: usernameInput.value,
        fullName: fullNameInput.value,
        password: passwordInput.value
    }

    console.log(userData)


        userService.createUser(userData)
        .then(data => {
         window.location.href = "/index.html";
        })

       .catch(error => {
           console.error("Error:", error);
       })

}








