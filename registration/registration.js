document.addEventListener("DOMContentLoaded", () => {
    const registration = document.getElementById("registration");
    registration.addEventListener("submit",register);
});

function register(event) {
    event.preventDefault();

    const username = document.getElementById("userNameInput").value;
    const fullName = document.getElementById("fullNameInput").value;
    const password = document.getElementById("passwordInput").value;

    const userData = {
        username: username,
        fullName: fullName,
        password: password
    }
   
};

fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
        "content-Type" : "aplication/json"
    },
    body: JSON.stringify(userData),

 
})

.then(response => response.json())
.then(data => {
    window.location.href = "index.html";
})

.catch(error => {
    console.error("Error:", error);
})




 



