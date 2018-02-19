Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");


var repSignIn = function ( )
{
		var username =  document.getElementById( "username" ).value ;
  	var password  =  document.getElementById( "password" ).value ;
  
		var rep = Parse.Object.extend("Representative");
		var query = new Parse.Query(rep);

		query.equalTo("username", username);
		query.equalTo("password", password);

		query.find({
  	success: function( userinfo ) {
    // Do stuff
    	if ( (userinfo.length != 0 ) && (userinfo[0].get("username") == username ) && (userinfo[0].get("password") == password) )
    	{
    		alert ( "Welcome Rep");
 				location.href = "rep-customer-search.html"
    	}
    	else
    	{
    		alert ( "You are not Rep");
    	}

  	},
  	error: function( error ) {
    // Do stuff
    	alert("Error: " + error.code + " " + error.message);
  	}
	})
}