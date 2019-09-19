
 var x = document.getElementById("error_comment");
 x.style.display = "none";

/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/

function functionHideResena() {
  var x = document.getElementById("seccion_comentario");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data) {
      //console.log(data)

      let newHtml = '<div id="reviews_chidos" class="review">'

      $(data).find('comment').each(function(){
        //console.log(this)
        newHtml += `
            <div class='nombre'>
              ${$(this).find("name").text()}
            </div>
            `
          var starHtml = getStarsSpans( $(this).find("stars").text())
          //console.log(e)

          newHtml += starHtml

          newHtml +=
            `
            <div class='review' >
              ${$(this).find("text").text()}
            </div>
            `
        //console.log(newHtml)
      })

      newHtml += '</div>'

      $('#seccion_reviews').append(newHtml)
  },
  error: function(errorMsg){
      console.log(errorMsg)
  },
})


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/


$("#btn-publicar").click(function(){

  let $nombre = $('#nombre').val()
  let $email = $('#email').val()
  let $comentario = $('#comentario').text()

  let estrellitas = $("input[name='rating']:checked").val()
  //alert(estrellitas)

  if( $nombre == "" || $comentario == ""){
    var x = document.getElementById("error_comment");
    x.style.display = "block";
    
  }

  else{
    //alert(document.getElementById('rating'))

    var x = document.getElementById("error_comment");
    x.style.display = "none";

    var div = document.getElementById('reviews_chidos');

  

    div.innerHTML += '<div class="nombre">' + $nombre + '</div>' 
  
    var starHtml = getStarsSpans( estrellitas )
    //console.log(e)
  
    div.innerHTML += starHtml
  
    div.innerHTML += '<div class="review">' + $comentario + '</div>'
  
    $('#nombre').val("")
    $('#email').val("") 
    $('#comentario').text("") 
  }
  
})


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$("#btn-limpiar").click(function(){
  $('#nombre').val("")
    $('#email').val("") 
    $('#comentario').text("") 
})


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
