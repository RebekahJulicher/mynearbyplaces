let API = "https://rebekahjulicher-nearbyplaces.herokuapp.com";

// Untested
let addPlace = (name, category, city, state) => {
    let data = {name: name, category: category, city: city, state: state};
    return(fetch(API + '/place', 
    {method: "POST", headers: {"CONTENT-TYPE": "application/json"}, body: JSON.stringify(data)})
    .then(x => x.json()));
}

let search = (city, state, category) => {
    let data = {city: city, state: state, category: category};
    return(fetch (API + "/review", {method: "GET", headers: {"CONTENT-TYPE": "application/json"}, body: JSON.stringify(data)})
    .then(x => x.json()));
}

let addReview = (place, review) => {
    //This I don't think I actually pass this an id yet, so this won't work 
    let data = {place: place.placeid, review: review};
    return(fetch(API + '/review/', 
    {method: "POST", headers: {"CONTENT-TYPE": "application/json"}, body: JSON.stringify(data)})
    .then(x => x.json()));
}

let getAllPlaces = () => {
    return(fetch (API + "/places").then(x => x.json()));
}

let server = {addPlace: addPlace, getAllPlaces: getAllPlaces, addReview: addReview,
    search: search};

export default server;