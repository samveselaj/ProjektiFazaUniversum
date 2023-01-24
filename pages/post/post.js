const postProductForm = document.querySelector("#Post_product_form");
let currentUser = {};

function protectPostPage() {
    let loggedUserLs = localStorage.getItem("loggedUser");
    let loggedUser;
    if (loggedUserLs && loggedUserLs.trim().length > 0) {
        try {
            loggedUser = JSON.parse(loggedUserLs);
            currentUser = JSON.parse(loggedUserLs);
        } catch (err) {
            loggedUser = {};
            currentUser = {};
        }
    }
    if (!loggedUser || !loggedUser.name || !loggedUser.name.trim().length > 0 || !loggedUser.name === "asdf") {
        alert("Only admin can see this page!");
        return window.location = "/index.html";
    }
}
protectPostPage();

let localStoragePostsString = localStorage.getItem("posts");
let localStoragePosts = [];

if (localStoragePostsString && localStoragePostsString.trim().length > 0) {
    try {
        localStoragePosts = JSON.parse(localStoragePostsString);
    } catch (err) {
        localStoragePosts = [];
    }
}

postProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const productThumbnail = this.product_file_input.files[0];
    const productName = this.product_name_input.value;
    const productDescription = this.product_desription_input.value;
    const productPrice = this.product_price_input.value;

    const reader = new FileReader();

    const validateTitle = productName && productName.trim().length > 0;
    const validateDescription = productDescription && productDescription.trim().length > 0;
    const validatePrice = productPrice && parseFloat(productPrice).toFixed(2);

    if (productThumbnail && this.product_file_input.files.length > 0 && validateTitle && validateDescription && validatePrice) {
        if (isNaN(productPrice)) {
            alert("Price should be a number");
        }
        reader.readAsDataURL(productThumbnail);
        reader.addEventListener('load', () => {
            const productObj = {
                id: Date.now() + '-' + Math.round(Math.random() * 1E9),
                thumbnail: reader.result,
                title: productName,
                description: productDescription,
                price: parseFloat(productPrice).toFixed(2),
                user: currentUser,
                date: Date.now()
            }
            localStoragePosts.push(productObj);
            window.localStorage.setItem("posts", JSON.stringify(localStoragePosts));
            alert("Post successful");
            return window.location = "/index.html";
        });
    } else alert("fill all fields please");
});