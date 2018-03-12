var url = "https://gentle-mesa-23788.herokuapp.com/webhook";

function get_data(){
$('#loader').show();
$.ajax({
          headers: {  'Access-Control-Allow-Origin': '*'},

    url: "https://gentle-mesa-23788.herokuapp.com/webhook", 
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({'head': window.location.hash.substring(1)}),
    success: function( data ) { 
        console.log(  data );
        //myJson=data.json()
        $("#contentload").html(data.html);
    $("#treeload").html(data.tree);
    }   
}).done(function( msg ) {
    $('#loader').hide();
    console.log(msg);
});
}


 get_data()

$('#treeload').on('click', 'ul li a', function(e) {

console.log('ssd');
  e.preventDefault(); // don't jump like a typical html anchor

  // find the index of the "#" character in the href string...
  var startOfName = $(this).attr('href').indexOf("#"),
      // ...then use it as the argument in the slice() method (add 1 so you don't include the # character).
      clickRef = $(this).attr('href').slice(startOfName + 1),
      targetEl = $('a[name=' + clickRef + ']').parent('h4'); // select the element this link is pointing to

  // scroll there smoothly:
  scrollThere(targetEl, 400);

});


function scrollThere(targetElement, speed) {
    
    var scrollPosition = targetElement.parent().scrollTop();
    var postionOfTargetElement = targetElement.offset().top;
    
  // initiate an animation to a certain page element:
  $('html, body , #contentload').stop().animate(
    { scrollTop: postionOfTargetElement + scrollPosition - 115}, // move window so target element is at top of window
    speed, // speed in milliseconds
    'swing' // easing
  ); // end animate
} // end

$('.toolbar a').click(function(e) {
    document.execCommand($(this).data('command'), false, null);
  });//end



$('#save').click(function(e) {
    console.log("clicked")
    get_tree_and_blob_html(1,send_to_mongo);
  });



function get_tree_and_blob_html(id,callback)
{
  head= window.location.hash.substring(1)
  content_html=$('#contentload').html()
  tree_html=$('#treeload').html()
  callback(content_html,tree_html,head)
  

}


function send_to_mongo(html,tree_html,head)
{
    object={"$set":{'html':html,'tree':tree_html,'synced_with_popup':"no"}}
    query="{'head':'"+String(head) +"'}"
    console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query+"&u=true")
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query+"&u=true",

    type: "PUT",
    data: JSON.stringify( object ),
    contentType: "application/json"
}).done(function( msg ) {
    
    console.log(msg);
});

}

// var xhttp = new XMLHttpRequest();
// xhttp.open("POST","https://gentle-mesa-23788.herokuapp.com/webhook", true );
// // xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
// // xhttp.setRequestHeader("Content-type", "application/json");

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        // document.getElementById("demo").innerHTML = xhttp.responseText;
//        console.log(xhttp.responseText);
//     }
// };



// xhttp.send();

// $.ajax({
// 	method:'post',
//   url: "https://gentle-mesa-23788.herokuapp.com/webhook",
  
 
	
  
// })
//   .done(function( data ) {
//     if ( console && console.log ) {
//       console.log( "Sample of data:", data );
//     }
//   });
