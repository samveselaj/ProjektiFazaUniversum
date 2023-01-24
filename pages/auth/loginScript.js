const loginForm = document.querySelector("#Login_form");
const pageTitle = document.querySelector("#Page_title");
const rightSideAuthed = document.querySelector("#Right_side_authed");
const rightSideUnauthed = document.querySelector("#Right_side_unauthed");
const logoutButton = document.querySelector("#Logout_button");

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

    if (loggedUser && loggedUser.username && loggedUser.username.trim().length > 0) {
        alert("Page not available");
        return window.location = "/index.html";
    }

    if (loggedUser && loggedUser.username && loggedUser.username.trim().length > 0) {
        rightSideUnauthed.classList.add("d-none");
        rightSideAuthed.classList.remove("d-none");
        rightSideAuthed.classList.add("d-flex", "algin-items-center", "justify-content-center");
        pageTitle.textContent = `Hello ${loggedUser.username}!`;
    }
}

checkLoggedIn();

logoutButton.addEventListener("click", () => {
    window.localStorage.removeItem("loggedUser");
    alert("Logout successful");
    window.location.reload();
});

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!this.username_input.value || this.username_input.value.trim().length <= 0 || this.username_input.value.trim() === "") {
        alert("fill your name please!");
    } else if (!this.password_input.value || this.password_input.value.trim().length <= 0 || this.password_input.value.trim() === "") {
        alert("fill your password please!");
    } else {
        let userObj = {
            username: this.username_input.value,
            password: this.password_input.value,
        }

        if (localStorageUsers.length > 0) {
            let userExists = false;
            let userFromLocalStorage = {};

            for (let i = 0; i < localStorageUsers.length; i++) {
                if (localStorageUsers[i].username === userObj.username) {
                    console.log(localStorageUsers[i]);
                    userExists = true;
                    userFromLocalStorage = {
                        id: localStorageUsers[i].id,
                        name: localStorageUsers[i].name,
                        username: localStorageUsers[i].username,
                        email: localStorageUsers[i].email,
                        password: localStorageUsers[i].password,
                        role: localStorageUsers[i].role,
                        createDate: localStorageUsers[i].createDate,
                    }
                }
            }
            if (userExists) {
                if (userObj && Object.keys(userObj).length > 0 && userFromLocalStorage && Object.keys(userFromLocalStorage).length > 0) {
                    if (userObj.username === userFromLocalStorage.username && userObj.password === userFromLocalStorage.password) {
                        alert("user login successful");
                        window.localStorage.setItem("loggedUser", JSON.stringify(userFromLocalStorage));
                        return window.location = "/index.html";
                    } else {
                        alert("incorrect username or password");
                    }
                } else {
                    alert("user doesn't exist");
                }
            } else {
                alert("user doesn't exist");
            }
        } else {
            alert("user doesn't exist");
        }
    }
});