let username;
let fullName;
let password;
let confirmPassword;
let signupButton;
let registerService;
let errormessage;
let message;
let alertElement;
let registerForm;
let checkbox;
document.addEventListener("DOMContentLoaded", () => {
    registerService = new RegisterService();
    registerForm = document.querySelector(".registration-form")
    username = document.getElementById("username");
    fullName = document.getElementById("fullName");
    password = document.getElementById("password");
    checkbox = document.getElementById("iagreeTerms&Conditions");
    errormessage = document.getElementById("errormessage");
    confirmPassword = document.getElementById("confirmPassword");
    signupButton = document.getElementById("signupButton");
    signupButton.addEventListener("click", registerUser)
})
async function registerUser(event) {
    event.preventDefault();
    console.log(password.value)
    console.log(confirmPassword.value)
    if (password.value === confirmPassword.value) {
        if (checkbox.checked) {
            let user = {
                "username": username.value,
                "fullName": fullName.value,
                "password": password.value
            };
            try {
                // Call the add method of the registerService
                let response = await registerService.createUser(user);
                // console.log(response)
                if (response.status === 400) {
                    message = "Username is already in use. Please choose a different username.";
                    displayError(message);
                    console.log("Username is already in use. Please choose a different username.");
                    // Display an error message to the user indicating the username is already in use
                } else if (response.error) {
                    console.error("Error:", response.error);
                    // Display an error message to the user indicating a general error occurred
                } else {
                    newuser = await response.json();
                    message = "User registered successfully";
                    displaySuccess(message);
                    console.log("User registered successfully:", newuser);
                    // window.location.replace("../posts/index.html")
                    // Display a success message to the user
                }
            } catch (error) {
                // errormessage.innerText = `Error registering user:${error}`
                message = `Error registering user:${error}`;
                displayError(message);
                console.error("Error registering user:", error);
                // Display an error message to the user indicating a general error occurred
            }
        }
        else {
            message = "Please agree to the terms and conditions to proceed.";
            displayError(message);
            console.log("Please agree to the terms and conditions to proceed.");
        }
    } else {
        message = "Passwords do not match. Please try again.";
        displayError(message);
        console.log("Passwords do not match. Please try again.");
        // Display an error message to the user indicating passwords do not match
    }
    document.getElementById("signupForm").reset();
}
function displayError(message) {
    // Get the alert element
    alertElement = document.getElementById("errormessage");
    // Set the content of the alert dynamically
    alertElement.innerHTML = message;
    // Display the alert if there is an error, hide it otherwise
    alertElement.style.display = message ? "block" : "none";
    document.getElementById("signupForm").reset();
}
function displaySuccess(message) {
    // Get the alert element
    alertElement = document.getElementById("successMessage");
    // Set the content of the alert dynamically
    alertElement.innerHTML = message;
    // Display the alert if there is an error, hide it otherwise
    alertElement.style.display = message ? "block" : "none";
    document.getElementById("signupForm").reset();
}
