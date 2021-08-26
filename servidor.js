let http = require("http");
let fs = require("fs");
const hostname = 'localhost';
const port = 4000;


const server = http.createServer(function(req,res){
    if(req.url == "/archivos/index"){
        console.log("Pagina encontrada "+req.url);
        try{
            fs.readFile("./archivos/index.html",function(error,code){
                let text = code.toString();
                let variables = text.match(/[^\{\}]+(?=\})/g);
                let mensaje = "Mundo"
    
                for(let i = variables.length - 1; i >=0 ; i--){
                    let value = eval(variables[i]);
                    text = text.replace("{"+variables[i]+"}",value);
                };
    
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(text);
                res.end();
            });
        }catch{

        }
    }else{
        console.log("Pagina no encontrada "+req.url);
        try{
            fs.readFile("./archivos/notFound.html", function(error,code){
                res.write(code);
                res.end();
            });
        }catch( error){

        }
        
    }
    
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
    console.log("Recuerda que debes hacer las pruebas desde tu buscador");
  });
  