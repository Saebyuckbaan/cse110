Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");
$(document).ready( function () {

	if ( Parse.User.current() )
	(Parse.User.current()).fetch();
	
});

/*
* Name: var displayFullName = function ()
* Purpose : Retrieve username and combine first and lastname together.
* Parameter: NONE
* Return: NONE
*/
var getFromCurrentUser = function ( key )
{
		var currentUser = Parse.User.current();
		
		if (currentUser) 
		{
		    // do stuff with the user
		    return ( currentUser.get( key ) );
		} 
		else 
		{
		    // show the signup or login page
		    alert("Please Log in First");
		    return false;
		}
};




var displayCurrentServices = function ( string )
{
		//flag
		var flag = false;

		//Query variable
		var currentUser = Parse.User.current();
		var length = ( currentUser.get("CurrentServices") ).length;
		var ar =  currentUser.get("CurrentServices");
		var service = Parse.Object.extend("Services");
		var query = new Parse.Query(service);


		//DOM OBJECT
		var serviceid = "";
		var text = "";
		var br = "";

		currentUser.fetch();

		if (currentUser) 
		{			
			for ( var index = 0 ; index < length ; index ++ )
	  	{
		  	query.get(ar[index], {
	  		success: function( serve ) {
	    		// The object was retrieved successfully.
	    		serviceid = document.getElementById( string );
    			serviceid.appendChild(checkbox ( serve.id, "currservice")  );
	    		
		  		text = document.createTextNode( "       Name: " + serve.get("name") + "." + " Price: " + serve.get("price") );
		  		serviceid.appendChild(text);

		  		br = document.createElement("br");
		  		serviceid.appendChild(br);

		  		br = document.createElement("br");
		  		serviceid.appendChild(br);

		  		flag = true;
	  		},
	  		error: function(object, error) {
	    	// The object was not retrieved successfully.
	   	  // error is a Parse.Error with an error code and message.
	   	  	flag = false;
  			}
				});

	  	}
		    // do stuff with the user
		} 
		else 
		{
		    // show the signup or login page
		    alert( "Please Log in First" );
		    flag = false;
		}

		return flag;
};

