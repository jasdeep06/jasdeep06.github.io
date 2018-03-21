var bookload = document.getElementById('bookload');


if(localStorage.getItem("user_email")){

$("#username").text(localStorage.getItem("user_email").split('@')[0]);

email(localStorage.getItem("user_email"));

}
else{
  $("#username").text("Guest");

  $("#signin_text").css("display","block");


}




function email(email){ 

  console.log(email);
  get_from_mongo(email);
  $('#exploader').show();
  
}


function get_from_mongo(email)
{
  console.log("calling")
    
    query="{'email':'"+String(email) +"'}"
    console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,

    type: "GET",
    contentType: "application/json"
}).done(function( object ) {

$('#exploader').hide();
 
   var intros=get_intros(object);
   console.log(intros);

   if(intros[0].length != 0  && intros[1].length != 0){
      
      bookloader(object,intros,render);
   }
   else{
    $("#signin_text").html("You have not created<br/> any KnowBook");
   }

   
    
});

}


function get_intros(object){



   var into_array = new Array();
   var heading_array=new Array();

  $.each(object, function(index, value) {
    var text=value.html
    var tree_text=value.tree
    console.log(text)
    try{
    intro=$("<div>"+text + "</div>").find("#1z")[0].textContent;
    
    into_array[index]=intro

  }catch(err){

        into_array[index]=""




  }

  try{
heading=$("<div>"+tree_text + "</div>").find("#1")[0].innerHTML;  
heading_array[index]=heading  

  }catch(err){

  heading_array[index]=""




  }

  
   
}); 

 return [into_array,heading_array]

}









function bookloader(obj,intros,callback){


  for (var i = 0; i < obj.length; i++) {
    console.log(intros[0][i]);
    var email = obj[i].email;
    var head = obj[i].head;

    callback(email,head,intros[0][i],intros[1][i]);
  }

}


function render(email,link,heading,topic){

  var head = heading.substring(0,100);

  bookload.innerHTML = bookload.innerHTML + `
  <div class="w3-card-4" style="width:23%; margin: 10px; display: inline-block;">
    <header class="w3-container w3-light-grey">
      <h4 style="font-weight: 500">`+topic+`</h4 >
    </header>


     <div class="w3-container" style="background-color: #fff; height: 150px;">

    <p style="text-align: left; margin-top:10px; overflow:hidden;">
   
     `+head+`
    </p>  
     <p>By @`+email.split('@')[0]+`</p>
      
    </div>
    <button class="w3-button w3-block w3-dark-grey" onclick="location.href='index.html#`+link+`';">Read</button>
  </div>

`

}