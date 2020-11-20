

function validateForm(){
    var desc=document.getElementById("desc").value;
    if(desc==null||desc==""){
        alert("Animal description must be filled out");
        return false;
    }
    saveAnimal();
    return true;
}

function saveAnimal(){
    var id=Math.floor(Math.random() * 100);
    var breed=document.getElementById("breed").value;
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var sex=getSelectedSex();
    var desc=document.getElementById("desc").value;
    var animal={
        "id":id,
        "breed":document.getElementById("breed").value,
        "name":name,
        "age":age,
        "sex":sex,
        "desc":desc
    };
    console.log(JSON.stringify(animal));
    localStorage.setItem(id,JSON.stringify(animal));
}

function getSelectedSex(){
        var ele = document.getElementsByName('sex'); 
          
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            return ele[i].value; 
        } 
    } 

function printAnimals(){
    var text="<table border='1'>";
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        var animal = JSON.parse(localStorage.getItem(key)) ;
        
        text+="<tr><td>"+animal.name+"</td><td>"+animal.breed+"</td></tr>";
        
        
      }
      text+="</table>"
      document.getElementById("animals").innerHTML=text;
}