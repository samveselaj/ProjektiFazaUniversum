const pageTitle = document.querySelector("#Page_title");
const rightSideAuthed = document.querySelector("#Right_side_authed");
const rightSideUnauthed = document.querySelector("#Right_side_unauthed");
const logoutButton = document.querySelector("#Logout_button");
const postContainer = document.querySelector(".products-container");
const profilePageLink = document.querySelector("#Profile_page_link");

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
    rightSideAuthed.classList.add("d-flex", "algin-items-center", "justify-content-center");
    if (loggedUser.role.toLowerCase() !== "admin") {
        document.querySelector("#Post_page_link").classList.add("d-none");
    } else {
        document.querySelector("#Post_page_link").classList.remove("d-none");
    }
    pageTitle.textContent = `Hello ${loggedUser.name}!`;
}

logoutButton.addEventListener("click", () => {
    window.localStorage.removeItem("loggedUser");
    alert("Logout successful");
    window.location.reload();
});

const localStoragePosts = window.localStorage.getItem("posts");
let posts = [];

if (localStoragePosts && localStoragePosts.trim().length > 0) {
    try {
        posts = JSON.parse(localStoragePosts);
    } catch (err) {
        posts = [];
    }
}

posts.sort((a, b) => b.date - a.date);

if (posts && posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
        let postContainerChild = document.createElement("div");
        postContainerChild.innerHTML = `
         <a href="/pages/details/details.html?id=${posts[i].id}" class="text-decoration-none text-dark"> 
            <div class="product-card">
                <img class="product-thumbnail"
                    src=${posts[i].thumbnail}
                    alt=" product">
                <div class="product-description-container">
                    <p class="product-title">${posts[i].title}</p>
                    <p class="product-description">${posts[i].description}</p>
                    <p class="product-price">${posts[i].price}€</p>
                </div>
             <div>
         </a>
    `;
        postContainer.appendChild(postContainerChild);
    }
} else {
    let noPostsText = document.createElement("div");
    noPostsText.innerHTML = `<p class="text-center">No products yet!</p>`
    postContainer.appendChild(noPostsText);
}
