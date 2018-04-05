


$('.toolbar a').click(function(e) {
    document.execCommand($(this).data('command'), false, null);
  });//end



if(localStorage.getItem("user_email")){

$("#username").text(localStorage.getItem("user_email").split('@')[0]);

}
else{
  $("#username").text("Guest");
}






var url = "https://gentle-mesa-23788.herokuapp.com/webhook";
var treerenderpointer = document.getElementById('treeload'); // id of dom element where tree is going to render
var treenodid = '';
var newtreeid = '';
var i; //id
var previousid;// for parent or child


/*

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

    i = data.finali;
    console.log(i);
    }   
}).done(function( msg ) {

  console.log(msg.uid)
  console.log(localStorage.getItem("uid"))
  if(localStorage.getItem("uid"))
  {
    if(msg.uid != localStorage.getItem("uid"))
    {
      console.log("non editable")
      $('#contentload div').attr("contenteditable",false);
     

    }else{
      console.log("editable")
      $('#contentload div').attr("contenteditable",true);


       $(".navy").hide();
      $(".navz").show();

      $("#restore").attr("reference",String(msg.heading))
    }
  }else{
    console.log("non editable 1")

    $('#contentload div').attr("contenteditable",false);
  

  }

    $('#loader').hide();
    

    
    console.log(msg);
});
}
*/


function get_data(){
$('#loader').show();
query="{'head':"+"'"+String(window.location.hash.substring(1))+"'}"
console.log(query)

$.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,

    type: "GET",
    
    contentType: "application/json",

    success: function( data ) { 
        console.log(  data );
        //myJson=data.json()
        $("#contentload").html(data[0].html);
    $("#treeload").html(data[0].tree);

    i = data[0].finali;
    console.log(i);
    }   
}).done(function( msg ) {

  console.log(msg[0].uid)
  console.log(localStorage.getItem("uid"))
  if(localStorage.getItem("uid"))
  {
    if(msg[0].uid != localStorage.getItem("uid"))
    {
      $('#contentload div').attr("contenteditable",false);
     

    }else{
      $('#contentload div').attr("contenteditable",true);


       $(".navy").hide();
      $(".navz").show();

      $("#restore").attr("reference",String(msg[0].head))
    }
  }else{

    $('#contentload div').attr("contenteditable",false);
  

  }

    $('#loader').hide();


    
    //image popup
      $( "#contentload div img" ).bind( "click", function( event ) {

        // console.log("asdddve",this.getAttribute("src"));

         var modalImg = document.getElementById("img01");

         modalImg.src =this.getAttribute("src");

         $("#imgModal").modal("show");
      } );

    
  
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
      targetEl = $('a[name=' + clickRef + ']').parent('h6'); // select the element this link is pointing to

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
     $('#saveloader').show();

    // updateId();
  });


$('#restore').click(function(e) {
    console.log("clicked")
    $("#restoreloader").show();
    check_active_status_from_mongo(set_restore_flag_in_mongo)


    //get_tree_and_blob_html(1,send_to_mongo);

     //$('#saveloader').show();

    // updateId();
  });



function set_restore_flag_in_mongo()
{   

  object={"$set":{'restore':"yes"}}
    query="{'head':'"+ $("#restore").attr("reference") +"'}"
    console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,

    type: "PUT",
    data: JSON.stringify( object ),
    contentType: "application/json"
}).done(function( msg ) {
    $("#restoreloader").hide();
    
    console.log(msg);
});



}


function check_active_status_from_mongo(callback)
{

  uid=localStorage.getItem("uid")

   query="{'uid':'"+String(uid) +"','active_status':'yes'}"
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,

    type: "GET",
    
    contentType: "application/json"
}).done(function(active_object){
  console.log(active_object)

  if(active_object.length!=0)
  {

    

      $('#activeWarn').modal('show')


    
    

  }else
  {

    callback()

  }

})
}






function get_tree_and_blob_html(id,callback)
{
  head= window.location.hash.substring(1)
  content_html=$('#contentload').html()
  tree_html=$('#treeload').html()
  callback(content_html,tree_html,head)
  

}


function send_to_mongo(html,tree_html,head)
{
    object={"$set":{'html':html,'tree':tree_html,'synced_with_popup':"no","finali":i}}
    query="{'head':'"+String(head) +"'}"
    console.log(query)
    console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query+"&u=true")
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query+"&u=true",

    type: "PUT",
    data: JSON.stringify( object ),
    contentType: "application/json"
}).done(function( msg ) {
    $('#saveloader').hide();
    console.log(msg);
});

}



/*
function to get id -->i
*/


function child (e){
  
  treenodid = e.getAttribute('value');
  
}



document.getElementById('childbtn').addEventListener("click", function(){

  if (treenodid){

  newtreeid = 'treenode' + i;
  var treeleaves = document.getElementById(treenodid);  
  var nodeName = document.getElementById('child').value;

  if(nodeName != ''){
  
  var x = newtreeid + 'x';


  treeleaves.innerHTML = treeleaves.innerHTML + `
  <ul id= '`+ newtreeid+`' style=" list-style: none; padding-left: 17px; border-left : 1px solid #BDBDBD;" >
  <li style = 'color: #ffffff; margin-bottom: 4px;'> 
    <span id= '`+ newtreeid+`' value="del" class="glyphicon glyphicon-remove remove"></span>
    <span class="glyphicon glyphicon-arrow-right"></span><a href="#`+ i +`" style="color:#ffffff;" id="`+ i +`"> &nbsp;`+ nodeName+` &nbsp;</a>
  
     <span value="`+ i +`" id='edit' class="glyphicon glyphicon-pencil hov rightmargn" style="color:#17acf4;"></span>
    <span id= '`+x+`' value= '`+ newtreeid+`' class="glyphicon glyphicon-plus-sign hov" data-toggle="modal"
   data-target="#myModal1"></span>
  </li></ul>`;

  
  var id =  i++;  //id tracker
  // localStorage.setItem("FinalI",String(i));

  section(id,newtreeid , nodeName);
  // setCurrentId(id)

  }
  
  }
  document.getElementById('child').value = '';

 });

$('#treeload').on('click', 'ul span', function() {
  //do something
    

    if($(this).attr("value") =='del'){
        removetree($(this).attr("id"));
    }
    else if($(this).attr("id") =='edit'){
        
        edittree($(this).attr("value"));
    }
    else{
    child(this);
     }
});


var editablespace = document.getElementById('contentload'); // id of the right section
 
    
function section(id, treeid , value){

    console.log('id',id);
    console.log('treeid',treeid);

    console.log('value',value);



    // console.log($('#' + treeid ).parent()[0].getElementsByTagName("ul").length - 1);
    /*
    -->get child elemenr
    -->find its parent
    -->then find the number of ul(child) in that parent
    --> find the last ul(child)
    --> if yes then find the id of li tag inside ul 

    -->if no ul(child) then find the closest li tag
    -->find the id of the li tag
    -->create section
    */
    var allSelects = $('#' + treeid ).parent()[0].getElementsByTagName("ul");
    var lastSelect = allSelects[allSelects.length-2];


    if(!lastSelect){
        parentid = $('#' + treeid).parent()[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute('href') + 'z';

    }
    else{
        parentid = lastSelect.getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute('href') + 'z';
    }

    
    // parentid = $('#' + treeid).parent()[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].getAttribute('href');

    
//--> create section

        
        // creating other section
        $( "<h6><a name='"+id+"'></a></h6><span id='"+ id+"zz' class='glyphicon glyphicon-arrow-right' style = 'margin-top: 17px;'></span><h4 style = 'font-weight: 500; display:inline;' id='"+ id+"zzz' >"+ value+":-</h4><div class='sections' id='"+ id+"z'  style= 'background-color : #efefef;' contenteditable></div> " ).insertAfter( parentid);
       
    
    // previousid = id ; // keeping track for first or other section


}


function removetree(nodetree){
    
    var treechilds =  $('#' + nodetree ).children();
  
    for (var indx = 0; indx < treechilds.length; indx++) {
        let childs = treechilds[indx].getElementsByTagName("a")[0].getAttribute('href') + 'z';
        console.log(childs);
        $( childs ).remove();
        $( childs + 'z').remove();
        $( childs + 'zz').remove();

    }
     $( '#'+ nodetree ).remove();
}


/*
@edit tree and related content
*/

function edittree(domid){
    console.log(domid);

      var value = $('#'+domid).attr('contenteditable');
      console.log(value);
    if (value == 'false') {
        
       $('#'+domid).attr('contenteditable','true');
        $('#'+domid).css("color","red");

        $('#'+domid).on('input',function() {
           
       $('#'+domid +'zzz').text($('#'+domid).text());

   });
    }
    else {
        

        $('#'+domid).attr('contenteditable','false');
       $('#'+domid).css("color","white");

       tree2db();

    }
}




// $( "#contentload div img" ).bind( "click", function( event ) {

//   console.log("asdddve");
// } );
