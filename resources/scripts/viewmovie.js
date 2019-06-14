const API_KEY = "db138ac0";
const DATA_API = `http://www.omdbapi.com/?apikey=${API_KEY}&i=`;
const POSTER_API = `http://img.omdbapi.com/?apikey=${API_KEY}&`;
let posterUrl;

loadMovieDetails();


function loadMovieDetails() {
    let imdb_id = sessionStorage.getItem("movie");

    makeDataRequest(imdb_id)
        .then(data => displayMovieDetails(data))
        .catch(error => console.log(error));
}

function displayMovieDetails(data) {
    let movie = JSON.parse(data);
    let keys = ["Title", "Year", "Rated"];
    posterUrl = movie["Poster"];

    document.title = movie["Title"];

    for (let key of keys) {
        document.getElementById(key).innerText = movie[key];
    }

    let img = document.createElement('img');
    img.src = posterUrl;
    document.getElementById("Poster").appendChild(img);
}

function makeDataRequest(url) {
    return new Promise((res, rej) => {
        const req = new XMLHttpRequest();
        const u = DATA_API + url;
        console.log(u);
        req.open("GET", DATA_API + url);

        req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
                res(req.responseText);
            } else {
                rej(req.statusText);
            }
        };
        req.send();
    });
}

function goBack() {
    var history = JSON.parse(sessionStorage.getItem("history"));

    console.log(history);

    //console.log(posterUrl);
    if (history === null) {
        history = [];
    }

    if (!history.includes(posterUrl)) {
        history.push(posterUrl);
    }
    sessionStorage.setItem("history", JSON.stringify(history));
    window.location.assign("index.html")
}