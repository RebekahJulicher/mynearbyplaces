import places from "./data.js";

let addPlace = (name, category, city, state) => {
    let newPlace = {name: name, category: category, city: city, state: state};
    places.push(newPlace);
}
let server = {addPlace: addPlace};

export default server;