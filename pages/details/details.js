const productTitle = document.querySelector("#Product_title");
const productThumbnail = document.querySelector("#Product_thumbnail");
const productDate = document.querySelector("#Product_date");
const productDescription = document.querySelector("#Product_description");
const productPrice = document.querySelector("#Product_price");
const editDeleteDiv = document.querySelector("#EditDeleteDiv");
const rightSideAuthed = document.querySelector("#Right_side_authed");
const rightSideUnauthed = document.querySelector("#Right_side_unauthed");
const logoutButton = document.querySelector("#Logout_button");
const deleteButton = document.querySelector("#Delete_button");
const editLink = document.querySelector("#Edit_link");

const loggedUserLs = localStorage.getItem("loggedUser");
let loggedUser;
if (loggedUserLs && loggedUserLs.trim().length > 0) {
    try {
        loggedUser = JSON.parse(loggedUserLs);
    } catch (err) {
        loggedUser = {};
    }
}

console.log(loggedUser);

if (loggedUser && loggedUser.name && loggedUser.name.trim().length > 0) {
    rightSideUnauthed.classList.add("d-none");
    rightSideAuthed.classList.remove("d-none");
    rightSideAuthed.classList.add("d-flex", "algin-items-center", "justify-content-center");
    if (loggedUser.role.toLowerCase() !== "admin") {
        document.querySelector("#Post_page_link").classList.add("d-none");
    } else {
        document.querySelector("#Post_page_link").classList.remove("d-none");
    }
}

const localStoragePosts = window.localStorage.getItem("posts");
let posts = [];

if (localStoragePosts && localStoragePosts.trim().length > 0) {
    try {
        posts = JSON.parse(localStoragePosts);
    } catch (err) {
        posts = [];
    }
}

logoutButton.addEventListener("click", () => {
    window.localStorage.removeItem("loggedUser");
    alert("Logout successful");
    window.location.reload();
});

onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id');
    const post = posts.find(item => item.id === productId);
    if (loggedUser && loggedUser.role && loggedUser.role.toLowerCase() === "admin") {
        editDeleteDiv.classList.remove("d-none");
        editDeleteDiv.classList.add("d-flex");
    }
    const postDate = post.date;
    const postYear = new Date(postDate).getFullYear();
    let postMonth = new Date(postDate).getMonth() + 1;
    let postCalendarDate = new Date(postDate).getDate();
    let postHour = new Date(postDate).getHours();
    let postMinutes = new Date(postDate).getMinutes();

    if (parseInt(postMonth) < 10) postMonth = `0${postMonth}`;
    if (parseInt(postCalendarDate) < 10) postCalendarDate = `0${postCalendarDate}`;
    if (parseInt(postHour) < 10) postHour = `0${postHour}`;
    if (parseInt(postMinutes) < 10) postMinutes = `0${postMinutes}`;

    const timeStampToDate = `${postYear}-${postMonth}-${postCalendarDate} ${postHour}:${postMinutes}`;

    productDate.innerHTML = `<strong>date of post:</strong> ${timeStampToDate}`;
    productTitle.innerHTML = post.title;
    productThumbnail.src = post.thumbnail;
    productDescription.innerHTML = post.description;
    productPrice.innerHTML = "Price: " + post.price + "€";
    editLink.href = `/pages/edit/edit.html?id=${productId}`;

    deleteButton.addEventListener("click", () => {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === productId && loggedUser && loggedUser.role && loggedUser.role.toLowerCase() === "admin") {
                posts.splice(i, 1);
                window.localStorage.setItem("posts", JSON.stringify(posts));
                alert("successfully deleted");
                return window.location = "/index.html";
            }
        }
    });
}
