// $('body').addClass('stop-scrolling');


var bookload = document.getElementById('bookload');




function get_from_mongo()
{
  console.log("calling")
    
    // query="{'email':'"+String(email) +"'}"
    // console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B")
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B",

    type: "GET",
    contentType: "application/json"
}).done(function( object ) {

 $('#exploader').hide();
   var intros=get_intros(object)
   console.log(intros)

   bookloader(object,intros,render);
    
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

get_from_mongo();







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
  // console.log(head.length);
  // initial_length=head.length
  // if(head.length< 100){
  //   var space = "</br>";
  //   for(var ii = 0 ; ii < 5 ; ii++){
  //     head  = head + space; 
  //   }
  // }
/*
<div class="checkbox checkbox-warning">
                        <input id="check2" type="checkbox" class="styled" checked>
                        <label for="check2">
                            Style 2
                        </label>
                    </div>

<input type="checkbox" value="" style="">
      <h4 style="font-weight: 500; display:inline-block">`+topic+`</h4 >



*/
  var trimtopic = topic.split('&nbsp;').join('').split(' ').join('')


  bookload.innerHTML = bookload.innerHTML + `
  <div class="w3-card-4" style="width:23%;  margin: 10px;  display: inline-block;">
    <header class="w3-container ">
      <div class="checkbox checkbox-success">
        <input id="checkbox" email="`+email+`" value="`+trimtopic+`" type="checkbox" class="styled check" >
        <label style=" font-weight: 500; font-size:15px;" >
            `+topic.split('&nbsp;').join('')+`               
         </label>
      </div>
      
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




function get_checkBox(){
     var val = "";
     var test ;
        $('.check:checked').each(function(i){4


          // val = val + '{"'+ $(this).attr("email")+ '":"'+$(this).attr("email") +'" },';
          val = val + `"`+$(this).attr("email") + $(this).attr("value") +`",`;
         
          // test[$(this).attr("email")] = $(this).attr("value")

        });

        

         // console.log("{" + val.slice(0,-1) + "}");
        // console.log(JSON.stringify(test))
        
          

        if(val != "" ){

        test = "[" + val.slice(0,-1) + "]" ;

        // console.log(JSON.parse(test));
        sessionStorage.setItem('data',test);

        window.open("docs/graph.html","_self");

        }else{
          return false;
        }

}