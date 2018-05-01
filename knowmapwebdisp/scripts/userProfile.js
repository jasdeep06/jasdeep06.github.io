
var bookload = document.getElementById('renderBook');



if(localStorage.getItem("user_email")){

$("#username").text(localStorage.getItem("user_email").split('@')[0]);

email(localStorage.getItem("user_email"));

}
else{
  $("#username").text("Guest");

  $("#signin_text").css("display","block");


}




function email(email){ 

  // console.log(email);
  get_from_mongo(email);
  $('#exploader').show();
  
}


function get_from_mongo(email)
{
  console.log("calling")
    
    query="{'email':'"+String(email) +"','real':'yes'}"
    console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?f={'email':1,'topic_heading':1,'head':1,'date':1,'intro':1,'likes':1,'views':1}&apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+ query,

    type: "GET",
    contentType: "application/json"
}).done(function( object ) {

  $("#exploader").hide();
   bookloader(object,render);

   
    
});

}










function bookloader(obj,callback){


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
    


    


    callback(email,head,topic_name,date,intro,likes,views);
  }

}


function render(email,link,topic_name,date,intro,likes,views){

 
  //var trimtopic = topic_name.split('&nbsp;').join('').split(' ').join('')
  var trimtopic = topic_name.trim();
  

  bookload.innerHTML = bookload.innerHTML + `<div class="col-ml-12 col-xs-6 col-sm-4">
                    <div class="be-post">
                      <a href="page1.html" class="be-img-block">
                     
                      </a>
                      <a  href='knowbook.html#${link}'  class="be-post-title" head='${link}'>${trimtopic}</a>
                      <span style='height: 60px;'>
                        "${intro}"
                      </span>

                      <div class="author-post">
                       
                        <span>by <a href="#">${email.split('@')[0]}</a></span>
                      </div>
                      
                      <div class="info-block">
                        <span ><i class="fa fa-thumbs-o-up " head='${link}'> ${likes}</i></span>
                        <span><i class="fa fa-eye"   head='${link}'>${views}</i></span>
                      </div>
                    </div>                    
                  </div>`




  
}
