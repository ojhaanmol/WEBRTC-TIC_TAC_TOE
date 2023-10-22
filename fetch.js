const url = `http://localhost:3000`;
options = {
    method: 'POST',
    headers : {
        "Content-Type" : "application/json"
    },
    body
}
fetch(url,options)
.then(response => response.json)
.then(response => console.log(response));