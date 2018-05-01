
var bookload = document.getElementById('renderBook');

if(localStorage.getItem("user_email")){

$("#username").text(localStorage.getItem("user_email").split('@')[0]);

}
else{
  $("#username").text("Guest");
}



function get_from_mongo()
{
  

  $('#loader').show();
  // console.log("calling")
    
    query="{'real':'yes'}"
    // console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B")
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?f={'email':1,'topic_heading':1,'head':1,'date':1,'intro':1,'likes':1,'views':1}&apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+ query,

    type: "GET",
    contentType: "application/json"
}).done(function( object ) {


    var content=object

    query="{'email':'"+String(localStorage.getItem("user_email")) +"'}"
    // console.log(query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_stats?&apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+ query,

    type: "GET",
    contentType: "application/json"
}).done(function(obj){



  $('#loader').hide();
   bookloader(object,render,obj[0].liked);
    
})});

      

}


get_from_mongo();







function bookloader(obj,callback,liked_list){


  for (var i = 0; i < obj.length; i++) {
    // console.log(intros[0][i]);
    var email = obj[i].email;
    var head = obj[i].head;
    var topic_name = obj[i].topic_heading;
    var date=obj[i].date;
    if(obj[i].likes)
    {
      var likes=obj[i].likes;

    }else{
      var likes=0;

    }
    if(obj[i].intro)
    {
      var intro=obj[i].intro;

    }else{
      var intro="";

    }
    if(obj[i].views)
    {
      var views=obj[i].views;

    }else{
      var views=0;

    }
    


    


    callback(email,head,topic_name,date,intro,likes,views,liked_list);
  }

}


function render(email,link,topic_name,date,intro,likes,views,liked_list){

 
  //var trimtopic = topic_name.split('&nbsp;').join('').split(' ').join('')
  var trimtopic = topic_name.trim();
  if(localStorage.getItem("user_email"))
  {

  if(liked_list.indexOf(link) == -1)
  {


    bookload.innerHTML = bookload.innerHTML + `<div class="col-ml-12 col-xs-6 col-sm-4">
                    <div class="be-post">
                      <a href="page1.html" class="be-img-block">
                     
                      </a>
                      <a  link=${link}  class="be-post-title" onclick="handle_views(this)" head='${link}'>${trimtopic}</a>
                      <span style='height: 60px;'>
                        "${intro}"
                      </span>

                      <div class="author-post">
                       
                        <span>by <a href="#">${email.split('@')[0]}</a></span>
                      </div>
                      
                      <div class="info-block">
                        <span ><i onclick="handle_likes(this)" class="fa fa-thumbs-o-up " head='${link}'> ${likes}</i></span>
                        <span><i class="fa fa-eye"   head='${link}'>${views}</i></span>
                     
                      </div>
                    </div>                    
                  </div>`


  }
  else
  {
    bookload.innerHTML = bookload.innerHTML + `<div class="col-ml-12 col-xs-6 col-sm-4">
                    <div class="be-post">
                      <a href="page1.html" class="be-img-block">
                     
                      </a>
                      <a  link=${link}  onclick="handle_views(this)" class="be-post-title" head='${link}'>${trimtopic}</a>
                      <span style='height: 60px;'>
                        "${intro}"
                      </span>

                      <div class="author-post">
                       
                        <span>by <a href="#">${email.split('@')[0]}</a></span>
                      </div>
                      
                      <div class="info-block">
                        <span ><i onclick="handle_unlikes(this)" class="fa fa-thumbs-o-up " head='${link}'> ${likes}</i></span>
                        <span><i class="fa fa-eye"  head='${link}'>${views}</i> </span>
                       
                      </div>
                    </div>                    
                  </div>`

  


  }
}
else
{

  bookload.innerHTML = bookload.innerHTML + `<div class="col-ml-12 col-xs-6 col-sm-4">
                    <div class="be-post">
                      <a href="page1.html" class="be-img-block">
                     
                      </a>
                      <a  link=${link}   onclick="handle_views(this)" class="be-post-title" head='${link}'>${trimtopic}</a>
                      <span style='height: 60px;'>
                        "${intro}"
                      </span>

                      <div class="author-post">
                       
                        <span>by <a href="#">${email.split('@')[0]}</a></span>
                      </div>
                      
                      <div class="info-block">
                        <span ><i class="fa fa-thumbs-o-up " head='${link}'> ${likes}</i></span>
                        <span><i class="fa fa-eye" head='${link}'>${views}</i></span>
                       
                      </div>
                    </div>                    
                  </div>`

  



}


  
}


 handle_likes = (e) =>{
  console.log($(e))
  increase_like_in_db($(e).attr("head"))
  register_like_to_user($(e).attr("head"),localStorage.getItem("user_email"))
  increase_like_visibility(e)

  

}

 function handle_views (e){
  // console.log(event)
  // event.preventDefault();
  // console.log("viewing")
  console.log($(e).attr("link"))
  // increase_views_in_db($(e).attr("head") )

  localStorage.setItem('view',$(e).attr("link"));
  // increase_view_visibility(e)
  window.open("knowbook.html#" + $(e).attr("link"),"_self");
  // return false
}


handle_unlikes = (e) =>{
  console.log($(e))
  decrease_like_in_db($(e).attr("head"))
  remove_like_from_user($(e).attr("head"),localStorage.getItem("user_email"))
  decrease_like_visibility(e)

}

function increase_like_in_db(head){
// $('#loader').show();
$.ajax({
    headers: {  'Access-Control-Allow-Origin': '*'},
    url: "https://gentle-mesa-23788.herokuapp.com/webhook", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({'head': head,'action':"likes"}),
}).done(function( msg ) {
   console.log(msg);
});
}





function decrease_like_in_db(head){
// $('#loader').show();
$.ajax({
    headers: {  'Access-Control-Allow-Origin': '*'},
    url: "https://gentle-mesa-23788.herokuapp.com/webhook", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({'head': head,'action':"unlikes"}),
}).done(function( msg ) {
   console.log(msg);
});
}



function register_like_to_user(head,email)
{
  
  console.log("calling")
    
query="{'email':'"+String(email) +"'}"
    // console.log(query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_stats?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&u=true&q="+ query,

    type: "PUT",

    data:JSON.stringify({"$addToSet": {"liked": String(head)}}),
    contentType: "application/json"
}).done(function( object ) {

   //var intros=get_intros(object)
   console.log(object)

    
});

      

}


function remove_like_from_user(head,email)
{
  
  console.log("calling")
    
query="{'email':'"+String(email) +"'}"
    // console.log(query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_stats?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&u=true&q="+ query,

    type: "PUT",

    data:JSON.stringify({"$pull": {"liked": String(head)}}),
    contentType: "application/json"
}).done(function( object ) {

   //var intros=get_intros(object)
   console.log(object)

    
});

      

}



function increase_like_visibility (e){

  initial_value=parseInt($(e).text())
  final_value=initial_value+1
  $(e).text(String(final_value))
  $(e).attr("onclick","handle_unlikes(this)")




}

function decrease_like_visibility (e){

  console.log($(e).text().split(" "))

  initial_value=parseInt($(e).text().trim().split(" ")[0])
  final_value=initial_value-1
  $(e).text(String(final_value))
  $(e).attr("onclick","handle_likes(this)")



}



// function increase_view_visibility (e){

//   initial_value=parseInt($(e).text())
//   final_value=initial_value+1
//   $(e).text(String(final_value))




// }






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