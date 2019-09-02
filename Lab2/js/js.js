let btnButton = document.getElementById('newitem')

var contCheckBox = 6

btnButton.addEventListener('keydown',function(e) {
    //alert('CLICK')
    if(e.keyCode === 13){
        //alert('Click')
        var node = document.createElement("LI");
        var textElement = document.getElementById("newitem").value

        var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = contCheckBox;
            checkbox.name = "todo"
            checkbox.onclick = checkSomething()
            checkbox.id = contCheckBox

        contCheckBox = contCheckBox + 1;

        var otor = contCheckBox + 50
        //alert(textElement)
        var textSpan = document.createElement('span')
            textSpan.textContent = textElement
            textSpan.id = otor

        node.appendChild(checkbox);
        node.appendChild(textSpan);
        document.getElementById("myList").appendChild(node);

        document.getElementById("newitem").value = ""

    }
    /*
    let name = document.getElementById('name')
    let name_error = document.getElementById('name_error')

    if( name.value == "" ) {
        name_error.classList.remove('hidden')
        
    }
    else{
        name_error.classList.add('hidden')
    }
    */

})

function checkSomething(){
    for( var i = 1 ; i < contCheckBox ; i++ ){
        var checkVar = document.getElementById(i);
        var ii = i + 50
        if(checkVar.checked == true){
            
             document.getElementById(ii).classList.add('done')
        }
        else{
            document.getElementById(ii).classList.remove('done')
        }
    }    
}
