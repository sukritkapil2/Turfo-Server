//Model Structure
const product = {
    id: "",
    name: "",
    price: "",
    unit: "",
    rating: "",
    thumbnail: "",
    details: "",
    images: [
        ""
    ],
    addedOn: "",
    inStock: true,
    quantity: "",
    reviews: [
        review
    ],
    lastAdded: "",
    shopId: "",
    category: "",
    deliveryPrice: "",
    complaints: []
}

const shop = {
    _id: "mongoid",
    name: "VK Snacks",
    address: "Main Market, Talwara",
    owner: {
        name: "",
        pic: "",
        phone: ""
    },
    category: "Snacks",
    thumbnail: "imgUrl",
    gallery: [
        "img1",
        "img2",
        "img3"
    ],
    shopPhone: "9417464709",
    rating: "5",
    location: {
        latitude: "30",
        longitude: "40"
    },
    defaultDeliveryPrice: "",
    dateAdded: new Date(),
    verified: true,
    reviews: []
}

const user = {
    name: "Sukrit",
    email: "sukrit.kapil2@gmail.com",
    password: "hkerulajelncp83ur78OBE78BXE7Q8WEX78XN",
    seller: false,
    createdOn: "",
    shopsNearby: [
        {
            shop
        }
    ]
}