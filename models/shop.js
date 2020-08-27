//Model Structure
const product = {
    name: "",
    price: "",
    unit: "",
    rating: "",
    thumbnail: "",
    images: [
        ""
    ],
    addedOn: "",
    inStock: true,
    quantity: "",
    reviews: [
        review
    ]
}

const shop = {
    _id: "mongoid",
    name: "VK Snacks",
    address: "Main Market, Talwara",
    owner: "Er Shaifi",
    category: "Snacks",
    thumbnail: "imgUrl",
    gallery: [
        "img1",
        "img2",
        "img3"
    ],
    phone: "9417464709",
    rating: "5",
    location: {
        latitude: "30",
        longitude: "40"
    },
    products: [
        {
            product
        }
    ],
    dateAdded: new Date(),
}

const user = {
    name: "Sukrit",
    email: "sukrit.kapil2@gmail.com",
    password: "hkerulajelncp83ur78OBE78BXE7Q8WEX78XN",
    shopsNearby: [
        {
            shop
        }
    ]
}

module.exports = {
    shop,
    user
}