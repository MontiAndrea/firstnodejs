   
var express = require("express")     
var apiServer = express();
var port = 3000;
var host = "localhost";
var fs  = require("fs");
const { request } = require("http");
apiServer.listen(port, host, () => {
    console.log("server running at http://%s:%d",
        host, port);
});

apiServer.get("/", (request, response) => {
    console.log("sono in get /", request);
    response.send("<h1>Ciao client sei in home<h1>"); 

});    

apiServer.get("/nome", (request, response) => {
    console.log("richiesta nome");
    response.send("<p1>Monti Andrea<p1>");
});
apiServer.get("/mioNome", (request, response) => {
    console.log(request.query.nome);
    response.send("ciao, il mio nome è: "+request.query.nome);
});   

apiServer.get("/somma", (request, response)=>{
    console.log("somma request", request.query);
    response.send("risultato = " + (parseInt(request.query.a) + parseInt(request.query.b)));
});

apiServer.get("/student", (request, response)=>{
    console.log("student id: ", request.query.id);
    fs.readFile("studenti.json", (err, data) => {
        if(err){
            console.log("error: " + err);
        }else{
            var students = JSON.parse(data);
            response.send(students.find(x => x.id === request.query.id)); 
        }
    });
});