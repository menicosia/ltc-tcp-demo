// Includes
var http = require('http') ;
var url = require('url') ;
var strftime = require('strftime') ;
var mysql = require('mysql') ;

// Global Vars
var dbClient = mysql.createConnection(process.env.MariaURI) ;
dbClient.connect(function(err) {
    if (err) { console.error("Broken: " + err.code) ; }
}) ;

var demoServer = http.createServer(function(request, response) {
    var requestParts = url.parse(request.url, true) ;
    var rootCall = requestParts["pathname"].split('/')[1] ;
    switch (rootCall) {
    case "write":
        var timeStamp = strftime("%Y-%m-%d %H:%M:%S") ;
        var sql = "insert into SampleData VALUES ('" + requestParts["query"]["key"] + "','" + timeStamp + "')" ;
        console.log("Writing data: " + sql) ;
        dbClient.query(sql, function (error, results, fields) {
            if (error) { console.error("write error: " + error ) ; } else { response.end("Done.") }
        }) ;
        break ;
    case "":
        dbClient.query('SELECT K, V from SampleData', function (error, results, fields) {
            if (error) { console.log("read error: " + error) }
            else {
                tableHTML = "<table border=1><tr><th>Key</th><th>Value</th></tr>\n" ;
                for (var kv in results) {
                    result = results[kv] ;
                    tableHTML += "<tr><td>" + result['K'] + "</td><td>"
                        + result['V'] + "</td></tr>\n" ;
                }
                tableHTML += "</table>\n" ;

                response.end(tableHTML) ;
            }
        }) ;
    }
}) ;

demoServer.listen(8080);
console.log("Demo server up and listening on port 8080.") ;
