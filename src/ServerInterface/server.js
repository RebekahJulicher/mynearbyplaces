import places from "./data.js";

let equality = (one, two) => {
    if (one.name === two.name && one.category === two.category && one.city === two.city
        && one.state === two.state && one.reviews === two.reviews) {
            return true;
        }
    return false;
}

let addPlace = (name, category, city, state) => {
    let newPlace = {name: name, category: category, city: city, state: state, reviews: [] };
    places.push(newPlace);
}

let removePlace = (name, category, city, state) => {
    let newPlace = {name: name, category: category, city: city, state: state};
    for(let i = 0; i < places.length; i++){
        let currPlace = places[i];
        if (equality(newPlace, currPlace)){
                places.splice(i,1);
            }
    }
}

let updatePlace = (place, name, category, city, state) => {
    for(let i = 0; i < places.length; i++){
        let currPlace = places[i];
        if (equality(place, currPlace)){
            if (name.length !== 0){
                places[i].name = name;
            }
            if (category.length !== 0){
                places[i].category = category;
            }
            if (city.length !== 0){
                places[i].city = city;
            }
            if (state.length !== 0){
                places[i].state = state;
            }
        }
    }
}

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
    let currPlace = places.find(x => equality(x, place));
    if (currPlace){
        currPlace.reviews.push(review);
    }
}
let getAllPlaces = () => {
    return places;
}
let server = {addPlace: addPlace, getAllPlaces: getAllPlaces, removePlace: removePlace,
     addReview: addReview, updatePlace: updatePlace, search: search};

export default server;