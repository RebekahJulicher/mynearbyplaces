let API = "https://rebekahjulicher-nearbyplaces.herokuapp.com";
import places from "./data.js";

// Untested
let addPlace = (name, category, city, state) => {
    let data = {name: name, category: category, city: city, state: state};
    return(fetch(API + '/place', 
    {method: "POST", headers: {"CONTENT-TYPE": "application/json"}, body: JSON.stringify(data)})
    .then(x => x.json()));
}

// Unchanged because I haven't figured out how to do this yet
let search = (city, state, category) => {
    let result = [];
    if (city.length > 0) {
        result = places.filter(x => x.city === city);
    }
    if (state.length > 0) {
        if (city.length > 0){
            result = result.filter(x => x.state === state);
        }
        else {
            result = places.filter(x => x.state === state);
        }
    }
    if (category.length > 0) {
        if (city.length > 0 || state.length > 0){
            result = result.filter(x => x.category === category);
        }
        else {
            result = places.filter(x => x.category === category);
        }
    }
    if (city.length === 0 && state.length === 0 && category.length === 0){
        return places;
    }
    return result;
}

let addReview = (place, review) => {
    //This doesn't use ids because I haven't gotten that sorted yet.
    return(fetch(API + '/review/', 
    {method: "POST", headers: {"CONTENT-TYPE": "application/json"}, body: JSON.stringify(review)})
    .then(x => x.json()));
}

let getAllPlaces = () => {
    return(fetch (API + "/places").then(x => x.json()));
}

let server = {addPlace: addPlace, getAllPlaces: getAllPlaces, addReview: addReview,
    search: search};

export default server;