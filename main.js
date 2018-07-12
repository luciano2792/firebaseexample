 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyD0IoYI_jy2ug7gWujawwKGQ6XORiQc-L8",
  authDomain: "chat-c300b.firebaseapp.com",
  databaseURL: "https://chat-c300b.firebaseio.com",
  projectId: "chat-c300b",
  storageBucket: "",
  messagingSenderId: "487354274980"
};
firebase.initializeApp(config);

const db = firebase.database();

$('button').click( function( event ) {
  event.preventDefault();
  var mensaje = $('#mensaje').val();
  var data = { usuario: 'Luci', mensaje: mensaje };
  db.ref('chat/').push(data, function(err){
    if(err) { throw err; }
    else 
    {
     console.info( 'Guardamos la informacion' );
     ponerMensaje(data);  
     $('mensaje').val('');
   }
 });
});

function ponerMensaje( pepito ){
  $('#caja').append( '<p>' + pepito.usuario + ': '+ pepito.mensaje + '<p>');
}

function iterar(data){
  for ( var xd in data ) {
    if (data.hasOwnProperty( xd ) ) {
      var element = data[xd];
      var gato = {
       usuario: element.usuario,
       mensaje: element.mensaje 
     };
     ponerMensaje( gato );
   }
 }
}

var traerMensajes = new Promise(function(res, rej){
  var mensajes = db.ref('/chat/').once('value').then(function(snapshot){
    return res (snapshot.val());
  });
  if (!mensajes) { return rej(); }
});

traerMensajes.then(function(data){
  iterar(data);
})