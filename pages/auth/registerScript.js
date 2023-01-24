const registerForm = document.querySelector("#Register_form");
const pageTitle = document.querySelector("#Page_title");
const rightSideAuthed = document.querySelector("#Right_side_authed");
const rightSideUnauthed = document.querySelector("#Right_side_unauthed");
const logoutButton = document.querySelector("#Logout_button");
const userRoles = document.querySelectorAll("#Role_input");

let localStorageUsersString = localStorage.getItem("users");
let localStorageUsers = [];

if (localStorageUsersString && localStorageUsersString.trim().length > 0) {
    try {
        localStorageUsers = JSON.parse(localStorageUsersString);
    } catch (err) {
        localStorageUsers = [];
    }
}

function checkLoggedIn() {
    let loggedUserLs = localStorage.getItem("loggedUser");
    let loggedUser;
    if (loggedUserLs && loggedUserLs.trim().length > 0) {
        try {
            loggedUser = JSON.parse(loggedUserLs);
        } catch (err) {
            loggedUser = {};
        }
    }

    if (loggedUser && loggedUser.name && loggedUser.name.trim().length > 0) {
        alert("Page not available");
        return window.location = "/index.html";
    }

    if (loggedUser && loggedUser.name && loggedUser.name.trim().length > 0) {
        rightSideUnauthed.classList.add("d-none");
        rightSideAuthed.classList.remove("d-none");
        rightSideAuthed.classList.add("d-flex", "algin-items-center", "justify-content-center");
        pageTitle.textContent = `Hello ${loggedUser.name}!`;
    }
}

checkLoggedIn();

logoutButton.addEventListener("click", () => {
    window.localStorage.removeItem("loggedUser");
    alert("Logout successful");
    window.location.reload();
});


registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let userRole;
    Array.from(userRoles).map(i => {
        if (i.checked) userRole = i.value;
    });
    if (!this.name_input.value || this.name_input.value.trim().length <= 0 || this.name_input.value.trim() === "") {
        alert("fill your name please!");
    } else if (!this.username_input.value || this.username_input.value.trim().length <= 0 || this.username_input.value.trim() === "") {
        alert("fill your username please!");
    } else if (!this.email_input.value || this.email_input.value.trim().length <= 0 || this.email_input.value.trim() === "") {
        alert("fill your email please!");
    } else if (!this.password_input.value || this.password_input.value.trim().length <= 0 || this.password_input.value.trim() === "") {
        alert("fill your password please!");
    } else {
        if ((!this.confirm_password_input.value || this.confirm_password_input.value.trim().length <= 0 || this.confirm_password_input.value.trim() === "") || this.password_input.value !== this.confirm_password_input.value) {
            alert("passwords do not match!");
        } else if (!userRole || userRole.trim().length <= 0) {
            alert("choose a role please!");
        } else {
            let userObj = {
                id: Date.now() + '-' + Math.round(Math.random() * 1E9),
                name: this.name_input.value,
                email: this.email_input.value,
                username: this.username_input.value,
                role: userRole,
                password: this.password_input.value,
                createDate: Date.now(),
            }

            if (localStorageUsers.length > 0) {
                let userExists = false;

                for (let i = 0; i < localStorageUsers.length; i++) {
                    if (localStorageUsers[i].username === userObj.username) userExists = true;
                }
                if (userExists) alert("user exists");
                else {
                    localStorageUsers.push(userObj);
                    window.localStorage.setItem("users", JSON.stringify(localStorageUsers));
                    alert("user registered successfully");
                    return window.location = "/pages/auth/login.html";
                }
            } else {
                localStorageUsers.push(userObj);
                window.localStorage.setItem("users", JSON.stringify(localStorageUsers));
                alert("user registered successfully");
                return window.location = "/pages/auth/login.html";
            }
        }
    }
});