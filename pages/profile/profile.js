const rightSideAuthed = document.querySelector("#Right_side_authed");
const rightSideUnauthed = document.querySelector("#Right_side_unauthed");
const logoutButton = document.querySelector("#Logout_button");
const postContainer = document.querySelector(".products-container");
const profilePageLink = document.querySelector("#Profile_page_link");

const nameOfUser = document.querySelector("#Name");
const usernameOfUser = document.querySelector("#Username");
const emailOfUser = document.querySelector("#Email");
const roleOfUser = document.querySelector("#Role");
const dateOfUser = document.querySelector("#Date");
const editButton = document.querySelector("#Edit_btn");

const editUserForm = document.querySelector("#Edit_user_form");
const userRoles = document.querySelectorAll("#Role_input");

const changePasswordBtn = document.querySelector("#Change_password_btn");

const loggedUserLs = localStorage.getItem("loggedUser");
let loggedUser;
if (loggedUserLs && loggedUserLs.trim().length > 0) {
    try {
        loggedUser = JSON.parse(loggedUserLs);
    } catch (err) {
        loggedUser = {};
    }
}
if (loggedUser && loggedUser.name && loggedUser.name.trim().length > 0) {
    profilePageLink.href = `/pages/profile/profile.html?${loggedUser.username}`;
    rightSideUnauthed.classList.add("d-none");
    rightSideAuthed.classList.remove("d-none");
    if (loggedUser.role.toLowerCase() !== "admin") {
        document.querySelector("#Post_page_link").classList.add("d-none");
    } else {
        document.querySelector("#Post_page_link").classList.remove("d-none");
    }
    
    rightSideAuthed.classList.add("d-flex", "algin-items-center", "justify-content-center");
    nameOfUser.innerHTML = `<strong>name:</strong> ${loggedUser.name}`;
    usernameOfUser.innerHTML = `<strong>username:</strong> ${loggedUser.username}`;
    emailOfUser.innerHTML = `<strong>email:</strong> ${loggedUser.email}`;
    roleOfUser.innerHTML = `<strong>role:</strong> ${loggedUser.role}`;

    const userDate = loggedUser.createDate;
    const userYear = new Date(userDate).getFullYear();
    let userMonth = new Date(userDate).getMonth() + 1;
    let userCalendarDate = new Date(userDate).getDate();
    let userHour = new Date(userDate).getHours();
    let userMinutes = new Date(userDate).getMinutes();

    if (parseInt(userMonth) < 10) userMonth = `0${userMonth}`;
    if (parseInt(userCalendarDate) < 10) userCalendarDate = `0${userCalendarDate}`;
    if (parseInt(userHour) < 10) userHour = `0${userHour}`;
    if (parseInt(userMinutes) < 10) userMinutes = `0${userMinutes}`;

    const timeStampToDate = `${userYear}-${userMonth}-${userCalendarDate} ${userHour}:${userMinutes}`;
    dateOfUser.innerHTML = `<strong>date:</strong> ${timeStampToDate}`;
}

logoutButton.addEventListener("click", () => {
    window.localStorage.removeItem("loggedUser");
    alert("Logout successful");
    window.location.reload();
});

editButton.addEventListener("click", () => {
    Array.from(document.querySelectorAll(".profile-info-text")).map(item => {
        item.classList.add("d-none");
    });
    editUserForm.classList.remove("d-none");
    editButton.classList.add("d-none");
});

const nameInput = document.querySelector("#Name_input");
const emailInput = document.querySelector("#Email_input");

onload = () => {
    nameInput.value = loggedUser.name;
    emailInput.value = loggedUser.email;
    Array.from(userRoles).map(item => {
        if (item.value === loggedUser.role) item.checked = true;
    });
}

const localStorageUsers = window.localStorage.getItem("users");
let users = [];

if (localStorageUsers && localStorageUsers.trim().length > 0) {
    try {
        users = JSON.parse(localStorageUsers);
    } catch (err) {
        users = [];
    }
}

let passwordContainerOpen = false;

changePasswordBtn.addEventListener("click", () => {
    const passwordContainer = document.querySelector("#Password_container");
    if (passwordContainer.classList.contains("d-none")) {
        passwordContainer.classList.remove("d-none");
        passwordContainerOpen = true;
    } else {
        passwordContainer.classList.add("d-none");
        passwordContainerOpen = false;
    }
});


editUserForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let userRole;
    Array.from(userRoles).map(i => {
        if (i.checked) userRole = i.value;
    });
    if (!this.name_input.value || this.name_input.value.trim().length <= 0) {
        alert("fill your name please!");
    } else if (!this.email_input.value || this.email_input.value.trim().length <= 0) {
        alert("fill your email please!");
    } else {
        let userHasRole = false;
        Array.from(userRoles).map(item => {
            if (item.value === loggedUser.role) userHasRole = true;
        });
        if (!userHasRole) {
            alert("choose a role please!");
        } else {
            if (!passwordContainerOpen) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id === loggedUser.id) {
                        users.splice(i, 1);
                    }
                }
                let updatedUserObj = {
                    id: loggedUser.id,
                    name: this.name_input.value,
                    email: this.email_input.value,
                    username: loggedUser.username,
                    role: userRole,
                    password: loggedUser.password,
                    createDate: Date.now(),
                }
                users.push(updatedUserObj);
                window.localStorage.setItem("users", JSON.stringify(users));
                window.localStorage.setItem("loggedUser", JSON.stringify(updatedUserObj));
                alert("Update successful");
                window.location.reload();
                Array.from(document.querySelectorAll(".profile-info-text")).map(item => {
                    item.classList.remove("d-none");
                });
                editUserForm.classList.add("d-none");
                editButton.classList.remove("d-none");
            } else {
                // if (!this.old_password_input || this.old_password_input.value.trim().length <= 0 && this.old_password_input.value !== loggedUser.password) {
                if (!this.old_password_input || this.old_password_input.value.trim().length <= 0 || !this.new_password_input || this.new_password_input.value.trim().length <= 0 || !this.confirm_new_password_input || this.confirm_new_password_input.value.trim().length <= 0) {
                    alert("fill all fields!");
                } else if (this.old_password_input.value !== loggedUser.password) {
                    alert("old password incorrect!");
                } else if (this.new_password_input.value !== this.confirm_new_password_input.value) {
                    alert("passwords do not match!");
                } else {
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].id === loggedUser.id) {
                            users.splice(i, 1);
                        }
                    }
                    let updatedUserObj = {
                        id: loggedUser.id,
                        name: this.name_input.value,
                        email: this.email_input.value,
                        username: loggedUser.username,
                        role: userRole,
                        password: this.new_password_input.value,
                        createDate: Date.now(),
                    }
                    users.push(updatedUserObj);
                    window.localStorage.setItem("users", JSON.stringify(users));
                    window.localStorage.setItem("loggedUser", JSON.stringify(updatedUserObj));
                    alert("Update successful");
                    window.location.reload();
                    Array.from(document.querySelectorAll(".profile-info-text")).map(item => {
                        item.classList.remove("d-none");
                    });
                    editUserForm.classList.add("d-none");
                    editButton.classList.remove("d-none");
                }
            }
        }
    }
});