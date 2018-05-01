

var recieved_uid=window.location.hash.split("#")[1]
var destination=window.location.hash.split("#")[2]

/*
if(window.location.hash.split("#")[3])
{
	var destination=window.location.hash.split("#")[2]+"#"+window.location.hash.split("#")[3]
}else
{
	var destination=window.location.hash.split("#")[2]

}

*/





verify_user(recieved_uid,save_uid_and_redirect_user,redirect_to_login)





function verify_user(recieved_uid,success_callback,failure_callback)
{
	query="{'uid':'"+String(recieved_uid) +"'}"

    

    $.ajax({

    url: "https://api.mongolab.com/api/1/databases/knowmap/collections/knowmap_signup?apiKey=AdXhK_FZvkVq_6OZfgJKyANr_ZGSck_B&q="+query,
    type: "GET",
    contentType: "application/json"
}).done(function( object ) {
	console.log(object)

    if(object.length!=0)
    {


    	success_callback(object[0].email,object[0].uid)
       
    
    }
    else
    {
        failure_callback()

    }
    
});

}


function save_uid_and_redirect_user(email,uid)
{

		localStorage.setItem("user_email",email)
		localStorage.setItem("uid",uid)
		var dest="https://jasdeep06.github.io/knowmapwebdisp/"+ destination
    	//window.open(dest)
        window.location.href=dest



}

function redirect_to_login(destination)
{
	alert("xxxx")
}







