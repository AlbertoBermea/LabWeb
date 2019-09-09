let dropdown = $('#category_types');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose A Category</option>');
dropdown.prop('selectedIndex', 0);

const url = 'data/grammys.json';
/*
$.getJSON(url, function(json) {
    console.log(json.fields[0].categories[0]); // this will show the info it in firebug console
});*/

$.getJSON(url, function (data) {
    $.each(data.fields, function (key, entry) {
        //console.log(entry.category_name)
      dropdown.append($('<option></option>').attr('value', entry.field_id).text(entry.field));
    })
  });

let $demo = $('#demo')
let $descripcion = $('#descripcion')

function changeH(){
    var x = document.getElementById("category_types").value;
    console.log(x)
    $demo.text(x)
    
    $.getJSON(url, function (data) {
        $.each(data.fields, function (key, entry) {
            if( entry.field_id == x ){
                $demo.text(entry.field)
                $descripcion.text(entry.description)

                let $list = $('#list_categories')

                $list.empty();
                //console.log(entry)
                $.each(entry.categories,function(key,new_entry){

                    var winner = new_entry.winner_id

                    var algo = '<section><h4>'+new_entry.category_name + "<ul>"

                    var cont = 0
                    $.each(new_entry.nominees,function(key,new_new_entry){
                        if(cont == winner){
                            algo += '<li class="winner">'+ new_new_entry.nominee+'<------- WINNER </li>'
                        }
                        else{
                            algo += '<li>'+ new_new_entry.nominee+'</li>'
                        }

                        cont = cont + 1
                    })

                    algo +='</ul></h4></section>'

                    //console.log(algo)

                    $list.append($(algo))

                    //$list.append($('<section><h4></h4></section>').attr('value',new_entry.category_id ).text(new_entry.category_name)).append($('<h5></h5>').attr('value',1).text("algo"));
                    /*$list.append($('<section><h4></h4></section>').attr('value',new_entry.category_id ).text(new_entry.category_name))
                        .append($.each(new_entry.nominees,function(key,new_new_entry){
                            ('<h5></h5>').attr('value',new_new_entry.nominee).text(new_new_entry.nominee)
                        }))*/
                })

            }
        })
    });

    


}



