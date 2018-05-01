$('#like-button').on('click', function() {

  if($("#like-button").attr("status") !== "liked")
  {
  increase_like_in_db($("#like-button").attr("head"))
  increase_like_visibility()
  register_like_to_user($("#like-button").attr("head"),"jasdeepchhabra94@gmail.com")
  }
});



function increase_like_in_db(head){
$('#loader').show();
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


/*
function increase_like_in_db(head)
{
  
  console.log("calling")
    
query="{'head':'"+String(head) +"'}"
    // console.log(query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+ query,

    type: "PUT",

    data:JSON.stringify({"$inc": {"likes": 1}}),
    contentType: "application/json"
}).done(function( object ) {

   //var intros=get_intros(object)
   console.log(object)

    
});

      

}
*/

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



function increase_like_visibility (){

	initial_value=parseInt($("#like-button").text())
	final_value=initial_value+1
	$("#like-button").text(String(final_value)+" Liked")
	$("#like-button").attr("status","liked")



}