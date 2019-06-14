const API_KEY = "db138ac0";
const DATA_API = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;
const POSTER_API = `http://img.omdbapi.com/?apikey=${API_KEY}&`;

loadHistory();

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

function displayData(data) {

    let results = JSON.parse(data); //Convert the json data to an object
    let dataTable = document.getElementById("tbl");
    let keys = ["Title", "Year", "Type", "More Detail"];

    //If the data table exists then delete it by removing it from the parent
    if (!!dataTable) {
        document.getElementById("data-table").removeChild(dataTable);
    }

    //Set up the initial table
    dataTable = document.createElement("table");
    dataTable.className = "table table-hover"; //Bootstrap
    dataTable.id = "tbl";
    let head = dataTable.createTHead();
    head.className = "thead-dark"; //Bootstrap        

    //Create table headers    
    for (let key of keys) {
        let cell = document.createElement("th");
        cell.innerHTML = "<b>" + key + "</b>";
        head.appendChild(cell);
    }

    //Attach the table to the document
    document.getElementById("data-table").appendChild(dataTable);

    //Start appending the data
    let body = dataTable.createTBody();

    //Create table rows

    for (let i = 0; i < 10; i++) {
        let movie = results.Search[i];
        row = body.insertRow();

        console.log(movie);
        console.log(movie[keys[0]]);

        for (let j = 0; j < keys.length; j++) {
            let cell = row.insertCell();

            if (j < keys.length - 1) {
                let text = document.createTextNode(movie[keys[j]]);
                cell.append(text);
            } else {
                let selector = document.createElement("INPUT");
                selector.setAttribute("type", "button");
                selector.setAttribute("id", movie["imdbID"])
                selector.setAttribute("class", "btn")
                selector.setAttribute("onclick", "viewMovieInfo(id)");
                selector.value = "More Detail"
                cell.append(selector);
            }
        }

    }
}

function viewMovieInfo(id) {
    console.log("id is " + id);
    localStorage.setItem("movie", id);
    window.location.assign("viewmovie.html")
}

function searchForFilm() {
    console.log("Search for film");
    let titleToSearch = document.getElementById("search-input").value;

    makeDataRequest(titleToSearch)
        .then(data => displayData(data))
        .catch(error => console.log(error));
}

function loadHistory() {
    var history = JSON.parse(localStorage.getItem("history"));

    console.log(history);

    //console.log(posterUrl);
    if (history === null) {
        return;
    }

    let historyField = document.getElementById("History");
    for (let url of history) {
        let img = document.createElement('img');
        img.src = url;
        historyField.appendChild(img);
        img.onclick = function() { viewMovieInfo(localStorage.getItem(url))};
    }


}