//Requerimos el framework de express
const express = require("express");


//modulo de MySQL
const mysql = require("mysql");
const myConnection = require("express-myconnection");

//modulo de express
const session = require("express-session");

//usaremos path para unir directorios
const path = require("path");

//usaremos morgan para los middlewares
const morgan = require("morgan");

//usamos el framework
const app = express();


//en donde esta a carpeta views
app.set('views', path.join(__dirname, '/views'));
//configurar las vistas de la aplicacion (motor de plantillas)
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//conectar a mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mauelchido1616$",
  port: "3306",
  database: "memorymaster",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed!!!", err);
  } else {
    console.log("Conectado con la base");
  }
});

//utilizamos la sesion
app.use(
  session({
    secret: "cat23",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
  res.sendFile('index.html', {root: 'public'});
});



app.get('/mostrar', urlencodedParser, function(req, res){
		db.query(`SELECT * FROM usuario WHERE user = ? AND password = ?`, [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect("/menu");
			} else {
				response.redirect("/errorInicio.html");
			}			
			response.end();
		});
});


//funcion para registrar al usuario
app.post('/registrar', urlencodedParser, function (req, res) {
  let reNom = /[a-zA-Z]/;
  let reAppat = /[a-zA-Z]/;
  let reApmat = /[a-zA-Z]/;
  let reUser = /[a-zA-Z]/;
  let rePass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
  db.connect(function (err){
    let sql = "INSERT INTO `usuario` (`nombre`, `appat`, `apmat`, `user`, `password`) VALUES ('" + req.body.name + "', '" + req.body.appat + "', '" + req.body.apmat + "', '" + req.body.user + "', '" + req.body.password + "')";
    console.log("conectado");
    db.query(sql, function (err, result) {
      if(err){
        res.json(err);
      };
    console.log("Añadido");
    });
    if(!reNom){
      res.json({success: "El nombre solo debe contener letras"});
    }
    if(!reAppat){
      res.json({success: "El nombre solo debe contener letras"});
    }
    if(!reApmat){
      res.json({success: "El nombre solo debe contener letras"});
    }
    if(!reUser){
      res.json({success: "El nombre solo debe contener letras"});
    }
    if(!rePass){
      res.json({success: "La contraseña debe de ser mayor a 8 caracteres, contener un caracter especial y mayusculas"});
    }
  });
  res.sendFile(__dirname + "/public/login.html");
});

//funcion para el inicio de sesion
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query(`SELECT * FROM usuario WHERE user = ? AND password = ?`, [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect("/menu");
			} else {
				response.redirect("/errorInicio.html");
			}			
			response.end();
		});
	} else {
		response.redirect("/errorInicio.html");
		response.end();
	}
});




//establecemos el servidor
app.set("port", process.env.PORT || 3000);

//configurar los middlewares se ejecutan antes de que vengan las peticiones del cliente
//vamos registrar las peticiones que llegan antes de procesarlas
app.use(morgan("dev"));

//Inicializamos el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor escuchando desde el puerto  ${app.get("port")}`);
});

app.get('/menu', function(request, response) {

	if (request.session.loggedin) {
    var html= "";
    /*
html+="<!DOCTYPE html>";
html+="<html lang='en'>";
html+="  <head>";
html+="    <meta charset='UTF-8'>";
html+="    <meta http-equiv='X-UA-Compatible' content='IE=edge'>";
html+="   <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>"
html+="    <title>Menu</title>";
html+="    <link rel='stylesheet' href='./CSS/styleIndex.css'>";
html+="  </head>";
html+="  <body>";
html+="<header class='bg_animate'>";
html+="        <div class='header_nav'>";
html+="            <div class='contenedor'>";
html+="                <h1>"+request.session.username+"</h1>";
html+="                <nav>"
html+="                    <a href='perfil.html'>PERFIL</a>";
html+="                    ";
html+="                    <a href='login.html'>CERRAR SESIÓN</a>";
html+="                </nav>";
html+="            </div>";
html+="        </div>";
html+="";
html+="        <section class='banner contenedor'>";
html+="            <secrion class='banner_title'>";
html+="                <a href='Estresado.html' class='llamanos'>¿Estresado?</a>";
html+="            </secrion> <br>";
html+="            <secrion class='banner_title'>";
html+="                <a href='tipodememoria.html' class='llamanos'>Comienza ya!</a>";
html+="            </secrion>";
html+="            <secrion class='banner_title'>";
html+="                <a href='https://charsito12.herokuapp.com' class='llamanos'>Chatsito</a>";
html+="            </secrion>";
html+="            <div class='banner_img'>";
html+="                <img src='./img/kisspng-4-pics-1-word-word-brain-thought-action-game-snoring-transparent-png-5a76bf36785379.6988479815177316384929.png'>";
html+="            </div>";
html+="        </section>";
html+="";
html+="        <div class='burbujas'>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="        </div>";
html+="    </header>";
html+="  </body>";
html+="</html>";
html+="";*/


html+="<!DOCTYPE html>";
html+="<html lang='en'>";
html+="<head>";
html+="    <meta charset='UTF-8'>";
html+="    <meta http-equiv='X-UA-Compatible' content='IE=edge'>";
html+="    <meta name='viewport' content='width=device-width, initial-scale=1.0'>";
html+="    <link rel='stylesheet' href='./CSS/styleIndex.css'>";
html+="    <title>Index</title>";
html+="</head>";
html+="<body>";
html+="    <header class='bg_animate'>";
html+="        <div class='header_nav'>";
html+="            <div class='contenedor'>";
html+="                <h1>MemoryMaster</h1>";
html+="            </div>";
html+="            <div class='conte'>";
html+="                <h1>Bienvenido&nbsp"+request.session.username+"</h1>";
html+="            </div>";
html+="           ";
html+="              <section class='contenedor1'>";
html+="                  <a href='perfil.html'><img src='./img/4781818_account_avatar_face_man_people_icon.png' alt=''></a>";
html+="                </section>";
html+="              ";
html+="        </div>";
html+="                   ";
html+="            ";
html+="        ";
html+="        <div>";
html+="            <section class='banner contenedor'>";
html+="                <div class='banner_title1'>";
html+="                    <figure>";
html+="                    <a href='./Estresado.html' class='llamanos'><img src='./img/6056530_people_person_stress_tired_woman_icon (2).png' alt=''></a>";
html+="                    <div class='capa1'><h1>Juegos para desestresar</h1></div>  ";
html+="                    <div class='capaa1'><a href='./Estresado.html'><h1>Listo?</h1></a></div>           ";
html+="                    </figure>";
html+="                </div>";
html+="                <div class='banner_title2'>";
html+="                    <figure>";
html+="                    <img src='./img/2730389_brain_divide_inkcontober_sains_icon.png' alt=''>";
html+="                    <div class='capa2'><h1>Juegos de memoria</h1></div>";
html+="                    <div class='capaa2'><a href='tipodememoria.html' class='llamanos'><h1>Listo?</h1></a></div>     ";           
html+="                    </figure>";
html+="                </div>";
html+="                <br>";
html+="                <div class='banner_title3'>";
html+="                    <figure>";
html+="                    <img src='./img/2849821_multimedia_social_speak_chat_media_icon (1).png' alt=''>>";
html+="                    <div class='capa3'><h1>Chat</h1></div>";
html+="                    <div class='capaa3'><a href='https://charsito12.herokuapp.com' class='llamanos'><h1>Listo?</h1></a</div>    ";            
html+="                    </figure>";
html+="                </div>";
html+="                               ";
html+="            </section>";
html+="        </div>";
html+="";
html+="        <div class='burbujas'>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="            <div class='burbuja'></div>";
html+="        </div>";
html+="    </header>";
html+="";
html+="</body>";
html+="</html>";


		response.send(html);
	} 
  else{console.log("entro al else")}



  
});