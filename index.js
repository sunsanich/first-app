
var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)


// цвета участников


// WebSocket-сервер на порту 8081
var webSocketServer =  new WebSocketServer({server: server})
console.log("websocket server created")
  

  
  
var users = []; //список онлайн с добавлением списка айпи и имени...
var sex = []; //список для он лайн состоящий из списка айпи и пола....
var must = []; 
var privatep = []; // список подключений и для отправки всем для привата 

var id = [];  //массив для привата айпи соединения передачи на клиент

var person = {}; //имен масиив имен юзеров по айди .для он лайн списка
var privat = {}; //именованый массив соединений по айпи
var sexx = {};// имен массив пола по айпи
var musty ={};

var changeIPF ="";

var numUsers = 0;	//количество участников 

 console.log('SERVER RUN');

// при новом соединении
webSocketServer.on('connection', function (ws) {
	
 
 //var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
 //}, 10000)
	
	
	
	
	var addedUser = false;
	

	
	// проинициализируем переменные
 var ip =   Math.round(Math.random() * 10000);
  

  console.log("новое соединение " + ip); 
  privat[ip] = ws;
 
 console.log(ip+'-ip---privat--Ws-   '+ privat[ip]);
		
		// при входящем сообщении
	  
	ws.on('message', function (message) {
     
	console.log('получено сообщение ' + message);

 
var event = JSON.parse(message);





////////////////обработка//входящих...	

if (event.type === 'new message') {
		
	console.log('newage' + message);
		
		
	
	privatep.forEach (function (ws) {
		ws.send (JSON.stringify ({
		type: 'new message',
          username: event.username,
         message: event.message,
		}));
	});
};


	
	

//// ДОБАВИЛСЯ новый 
		
		
		if (event.type === 'add user') {
		
		//имеовеаный!!! масссив айди соединения и имени
		 person[ip] = event.username;
		
		sexx[ip] = event.sexy;
		musty[ip] = event.musty;
		
		console.log(ip+'-ip---add--name-   '+ event.sexy);
  	console.log(ip+'event.musty '+ event.musty);

		
		//именованый !! масссив айди соединения и сокет соединения 
	//	privat[ip] = ws;
		
		
		console.log(ip+'-ip---add--name-   '+ event.username);
	//	console.log(ip+'-ip---privat--Ws-   '+ privat[ip]);
		
		
		if (addedUser) return;
		username = event.username;
		
		
    	 
		///////////////////////////////
						
		
		++numUsers;
        addedUser = true;
		
		// добавим самого человека в список людей онлайн
		// ip текущего соединения + имя наме узера текущего
		// в еще один массив users для списка онлайн
		
		
		users.push (person[ip]);
		
		console.log('allserss---' + users);
		
		//POL//список пола по айпи
		sex.push (sexx[ip]);
		must.push (musty[ip])
		
	
		// добавем  соединение данное в список соединений с аийпи 
		// для передачи списка айпи номеров чтоб потом присвоить айди 
		// чтоб потом выбирать из списка юзеров нужного привату
		
		
		id.push	(ip)	
		
		
		
		
		//список соединений для привата 
		
		
		privatep.push (privat[ip]);
		
		
		console.log('allPRIVATES---' + privatep);
		
       //////////////////
	   	
		
		
		
		
		
	ws.send (JSON.stringify ({
					type: 'login',
		         numUsers: numUsers,	
				       ip: ip
			  
				}));
			

			
			/////////////
privatep.forEach (function (ws) {

		ws.send (JSON.stringify ({
			type: 'user joined',
           	username: username,    //имя
            numUsers: numUsers,    //количество
			userPers: users,       //список юзеров 
			priv: id,              // список Ip соединеий
		    sexy: sex,           //cписок с полами
			musty: must,        //список с кланами
		}));
	});


	
	
	
	 
  }; 
 
//////////////  
  
  
  
  if (event.type === 'typing') {
		
			
	privatep.forEach (function (ws) {
		ws.send (JSON.stringify ({
		type: 'typing',
  username: event.username,
		}));
	});
	
	
	
	};
  
 ////////
	
	if (event.type === 'stop typing') {
			

	
	privatep.forEach (function (ws) {
		ws.send (JSON.stringify ({
		type: 'stop typing',
 username: event.username,
		}));
	});

	};
	
	
	
	
	
	if (event.type === 'privat') {

	
console.log('PRIVAT' + message);
console.log('PRIVAT_change' + event.privi);


console.log(ip+'-ip-');

 
 
 // если не выбран никто то отправляем на данное соелинение

 var pm = event.privi;

if (pm === ""){
pm = ip	

}else {
	
// если пустота то выбираем текущее;

 pm = event.privi };
 

console.log( 'отправка в приват и себе тож ' +pm);

 var msg = {
	 
 type: 'new message',
 username: event.username,
 message: event.message,

 
 };


	privat[ip].send(JSON.stringify(msg));
   
   privat[pm].send(JSON.stringify(msg));
   
var msg ="";

	};
	
	

	

	
if (event.type === 'media') {

	
console.log('MEDIA' + message);
		
		
	
	privatep.forEach (function (ws) {
		ws.send (JSON.stringify ({
		 type: 'mediaMess',
         username: event.username,
         message: event.message,
		}));
	});
	};
	

 
 if (event.type === 'change') {
console.log(event.changeid+'-changeid-');

// 

var Ch = event.changeid

changeIPF = event.ipF 
console.log(changeIPF+'-ipFchangeid-'+event.ipF);
var msg = {
	
	 type: 'сhangeDi',
     youIp: ip,
	 
	 };
	  
 privat[Ch].send(JSON.stringify(msg));
   
 //// privat[pm].send(JSON.stringify(msg));
   
var msg ="";	 
	 



	
 };	
	
	
	
	
	
////////////////	

	
	
	if (event.type === 'dataFor') {

	//полуцчили данные от нужного юзера отправляем себе 

console.log(changeIPF+'-ipFchangeid-');

console.log('----dataFor----' + message);
	
console.log('---avva ----' + event.avva);	
console.log('---back ----' + event.back);
console.log('---face ----' + event.face);	
console.log('---face ----' + event.user);
console.log('--event.dataDat-' + event.dataDat);
console.log('--sex-' + event.sexChange);
console.log('--about-' + event.about);
console.log('--must-' + event.must);
console.log(ip+'---dataFor---p-');





var msg = {
	
	 type: 'newChange',
   avvaF: event.avva,
   backF: event.back,
   faceF: event.face, 
   userF: event.user,
    
   dataDatF: event.dataDat,
   dataDatYF: event.dataDatY,
   
   sexF: event.sexChange,
   aboutF: event.about,
   mustF: event.must,
 };

 
privat[changeIPF].send(JSON.stringify(msg));


var msg ="";

 };	
	
	
	
	

	if (event.type === 'rob') {

var us = event.username;
if (us === undefined)	{
us	= ip	
}else {
us = event.username };




var pm = event.privi;
if (pm === ""){
pm = ip	
}else {
	
// если пустота то выбираем текущее;

 pm = event.privi };

console.log( 'отправка в robrob приват ' +pm);

console.log( 'user ' +us);

 var message = '<'+event.stats+'-'+event.numBYTE+'-'+event.volume+'>';


var msg = {
	
	
     type: 'robote',
     username: us,
	 message: message,
	 statsF:  event.stats,
     numBYTEF: event.numBYTE,
     volumeF: event.volume,

 
 };

   privat[pm].send(JSON.stringify(msg));
   
var msg ="";

	};
	


	

	
	
//конец парсинга входящих	
	
  });  
  
  
  
  // выбор текущего елемента из массива
  
 Array.prototype.exterminate = function (value) {
	this.splice(this.indexOf(value), 1);
console.log("value"+value);
	}  
   
   
   
   
   ws.on ('close', function () {
	   
	   

	console.log( person[ip] + 'соединение закрыто ' + ip);					

	
	if (addedUser) {
	--numUsers;
                    //удаление из  списков
                        privatep.exterminate(privat[ip]);
                    	users.exterminate(person[ip]);
						id.exterminate(ip);
						sex.exterminate(sexx[ip]);
					   must.exterminate(musty[ip]);

			
	console.log(person[ip]+"----user--ip--" + ip);
	console.log(privat[ip]+"--PRIVAT---ip---" +ip);
	console.log("-------ID--------" + id);
     console.log("-------del sex-------"+ sexx[ip]);

	
privatep.forEach (function (ws) {
		ws.send (JSON.stringify ({
		type:     'user left',
	    username:  person[ip],
       numUsers: numUsers,
	userPers: users,
	priv: id,
	}));
	});



 }
    
 });
 
 
//конец 

});