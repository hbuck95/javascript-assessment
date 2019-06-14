const API_KEY = "db138ac0";
const DATA_API = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const POSTER_API = `http://img.omdbapi.com/?apikey=${API_KEY}&`;

function makeRequest(method, url, body) {
    return new Promise((res, rej) => {
        const req = new XMLHttpRequest();
        req.open(method, api + url);

        req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
                res(req.responseText);
            } else {
                rej(req.statusText);
            }
        };
        req.send(body);
    });
}