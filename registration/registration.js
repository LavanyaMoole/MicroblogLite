let userService;
let registrationForm;

document.addEventListener("DOMContentLoaded", () => {
   registrationForm = document.getElementById("registration");
    registrationForm.addEventListener("submit",registration);
    userService = new UserService();
});

function registration(event) {
    event.preventDefault();

    
    const userData = {
        username: registrationForm.usernameInput,
        fullName: registrationForm.fullnameInput,
        password: registrationForm.passwordInput
    }

 


userService.createUser(userData)
.then(data => {
    window.location.href = "index.html";
})

.catch(error => {
    console.error("Error:", error);
})

}




 



