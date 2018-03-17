
var is_data = sessionStorage.getItem('data');

console.log(is_data)

var big_array = [];

if(is_data){
 
 var q = "";
 
 //{ "$or" : [{ "head" : "prabhjotsingh@gmail.comMachineLearning" },{ "head" : "jasdeepchhabra94@gmail.comStephenHawking" }]}


// {'$or':[{"head":"prabhjotsingh@gmail.comMachineLearning"},{"head":"jasdeepchhabra94@gmail.comStephenHawking"},]}
for(var k in JSON.parse(is_data)){

  var head = k + JSON.parse(is_data)[k];

  q = q + '{"head":"'+String(head) +'"},';
  
  
  
 }



 var new_head = "{'$or':[" + q + "]}"; 


  get_from_mongo(new_head);
}
else {
	console.log("err");
}

//---------------------------





//  var promise=function(tree_html)
// {

  

//   var parent=$("ul",'<div>'+tree_html + '</div>')
//   var obj={};
//   var child =[];
//   var index = 0;
//   $.each(parent,function(index,value){

    

//     //console.log(value)
//     var parent_link_id=value.id[value.id.length-1];
//     var parent_text=$("a#"+parent_link_id,'<div>'+tree_html + '</div>')[0].innerText;
    

//     // console.log(parent_text.trim();



//     child.push(parent_text.trim());


//     var children=$('ul#'+ value.id +  " > ul",'<div>'+tree_html + '</div>');

//     $.each(children,function(index1,value1){

//       //var child = value1
//       var child_link_id=value1.id[value.id.length-1];
//     var child_text=$("a#"+child_link_id,'<div>'+tree_html + '</div>')[0].innerText;
//     console.log(child_text);

//     child.push(child_text.trim());
//       //console.log(child)

//     });


//     obj['arr'+index] =child;
//     child = [];
    
//   })
 
	
// 	// callback(obj);
  
//   console.log(obj)
//   return obj;



// }




var promise=function(tree_html,blob_html)
{

  

  var parent=$("ul",'<div>'+tree_html + '</div>')
  var obj={};
  var child =[];
  obj['vid']=[]
  obj['img']=[]

  var index = 0;
  $.each(parent,function(index,value){
    var small_array_vid=[]
    var small_array_img=[]

    

    //console.log(value)
    var parent_link_id=value.id[value.id.length-1];
    var parent_text=$("a#"+parent_link_id,'<div>'+tree_html + '</div>')[0].innerText;

    if(parent_link_id==1)
    {
      obj["title"]= parent_text

    }
    

    // console.log(parent_text.trim();


    var video=$('div#'+parent_link_id+"z",'<div>'+ blob_html + '</div>').find("iframe")
    var image=$('div#'+parent_link_id+"z",'<div>'+ blob_html + '</div>').find("img")

    if(video.length)
    {
      small_array_vid.push(parent_text.trim())
    $.each(video,function(index,value){
      small_array_vid.push(video[index].src)
      console.log(video[index].src)

    })
    obj['vid'].push(small_array_vid)
   }


   if(image.length)
    {
      small_array_img.push(parent_text.trim())
    $.each(image,function(index,value){
      small_array_img.push(image[index].src)
      console.log(image[index].src)

    })
        obj['img'].push(small_array_img)

   }


    console.log(image)
    child.push(parent_text.trim());


    var children=$('ul#'+ value.id +  " > ul",'<div>'+tree_html + '</div>');

    $.each(children,function(index1,value1){

      //var child = value1
      var child_link_id=value1.id[value.id.length-1];
    var child_text=$("a#"+child_link_id,'<div>'+tree_html + '</div>')[0].innerText;
    console.log(child_text);
    

    child.push(child_text.trim());
      //console.log(child)

    });


    obj['arr'+index] =child;
    child = [];
    
  })
 
  
  // callback(obj);
  
  console.log(obj)
  return obj;



}






  function get_from_mongo(head)
{
 
    
    // query="{'head':'"+String(head) +"'}"

    // query = JSON.stringify(head);
    // query = JSON.stringify(head);

    query = head.slice(0,-3)+"]}";


    console.log(query);
    // console.log("https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query)
    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/know_html?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,

    type: "GET",
    contentType: "application/json"
}).done(function( object ) {

  // var html=object[0].tree;

  console.log(object);

  for(var ob of object){
    console.log(ob.tree)
   big_array.push(promise(ob.tree,ob.html));

  }

  // console.log(big_array);
  
    server_call(big_array);
});

}


















function server_call(obj){
	console.log(obj);

	// https://infinite-meadow-28119.herokuapp.com/webhook


 //    query="{'head':'"+String(head) +"'}"


       
    $.ajax({

    data : JSON.stringify(obj),	

    url: "https://infinite-meadow-28119.herokuapp.com/webhook",

    type: "POST",
    contentType: "application/json",
    

}).done(function( object ) {

  console.log(JSON.stringify(object));

  init(object);
    
});

}






function init(obj) {
                var neo4jd3 = new Neo4jd3('#neo4jd3', {
                    highlight: [
                        {
                            class: 'Project',
                            property: 'name',
                            value: 'neo4jd3'
                        }, {
                            class: 'User',
                            property: 'userId',
                            value: 'eisman'
                        }
                    ],
                    icons: {
//                        'Address': 'home',
                        'Api': 'gear',
                        'Video':'video-camera',
                        'Image':'image',
//                        'BirthDate': 'birthday-cake',
                        'Cookie': 'paw',
//                        'CreditCard': 'credit-card',
//                        'Device': 'laptop',
                        'Email': 'at',
                        'Git': 'git',
                        'Github': 'github',
                        'Google': 'google',
//                        'icons': 'font-awesome',
                        'Ip': 'map-marker',
                        'Issues': 'exclamation-circle',
                        'Language': 'language',
                        'Options': 'sliders',
                        'Password': 'lock',
                        'Phone': 'phone',
                        'Project': 'folder-open',
                        'SecurityChallengeAnswer': 'commenting',
                        'User': 'user',
                        'zoomFit': 'arrows-alt',
                        'zoomIn': 'search-plus',
                        'zoomOut': 'search-minus'
                    },
                    images: {
                        'Address': 'img/twemoji/1f3e0.svg',
//                        'Api': 'img/twemoji/1f527.svg',
                        'BirthDate': 'img/twemoji/1f382.svg',
                        'Cookie': 'img/twemoji/1f36a.svg',
                        'CreditCard': 'img/twemoji/1f4b3.svg',
                        'Device': 'img/twemoji/1f4bb.svg',
                        'Email': 'img/twemoji/2709.svg',
                        'Git': 'img/twemoji/1f5c3.svg',
                        'Github': 'img/twemoji/1f5c4.svg',
                        'icons': 'img/twemoji/1f38f.svg',
                        'Ip': 'img/twemoji/1f4cd.svg',
                        'Issues': 'img/twemoji/1f4a9.svg',
                        'Language': 'img/twemoji/1f1f1-1f1f7.svg',
                        'Options': 'img/twemoji/2699.svg',
                        'Password': 'img/twemoji/1f511.svg',
//                        'Phone': 'img/twemoji/1f4de.svg',
                        'Project': 'img/twemoji/2198.svg',
                        'Project|name|neo4jd3': 'img/twemoji/2196.svg',
//                        'SecurityChallengeAnswer': 'img/twemoji/1f4ac.svg',
                        'User': 'img/twemoji/1f600.svg'
//                        'zoomFit': 'img/twemoji/2194.svg',
//                        'zoomIn': 'img/twemoji/1f50d.svg',
//                        'zoomOut': 'img/twemoji/1f50e.svg'
                    },
                    // minCollision: 60,
                    // neo4jDataUrl: 'json/neo4jData.json',
                    'neo4jData': obj,
                    nodeRadius: 25,
                    onNodeDoubleClick: function(node) {
                        // switch(node.id) {
                        //     case '25':
                        //         // Google
                        //         window.open(node.properties.url, '_blank');
                        //         break;
                        //     default:
                        //         var maxNodes = 50,
                        //             data = neo4jd3.randomD3Data(node, maxNodes);
                        //         neo4jd3.updateWithD3Data(data);
                        //         break;
                        // }
                    },
                    onRelationshipDoubleClick: function(relationship) {
                        console.log('double click on relationship: ' + JSON.stringify(relationship));
                    },
                    zoomFit: false
                });
            }

            // window.onload = init;