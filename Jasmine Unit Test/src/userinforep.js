Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

$(document).ready( function () {

	//displayAllServices("services");

});

var retrieveUserInfo = function()
{
	/*
	$('#add1').empty();
	$("#add1").append("<span id = \"add\"> </span>");
	$('#myform').empty();
	$("#myform").append("<span id = \"id1\"> </span>");
	$("#myform").append("<span id = \"id2\"> </span>");
	
	 //initialize variables using each re-formatter 
  var firstname =  reFormatName( document.getElementById( "firstname" ).value ) ;
  var lastname  =  reFormatName( document.getElementById( "lastname" ).value );
  var ssn 		  =  Number( document.getElementById( "lastssn" ).value ); 
	*/

	var firstname = "Davis";
	var lastname  = "Yi";
	var ssn				=  Number('1234');

	var query = new Parse.Query(Parse.User);
	var flag	= false;

	query.equalTo("firstname", firstname );
	query.equalTo("lastname", lastname );
	query.equalTo("lastfourssn", ssn );

	flag = query.find({
  	success: function( userinfo ) {
    // Do stuff
 			return true;
  	},
  	error: function( error ) {
    // Do stuff
    	alert("Error: " + error.code + " " + error.message);
  	}
	})
	return flag;
};
/*

var displayCurrentServices = function ( currentUser, string )
{
		var length = ( currentUser.get("CurrentServices") ).length;
		var ar =  currentUser.get("CurrentServices");
		var service = Parse.Object.extend("Services");
		var query = new Parse.Query(service);
		var serviceid = document.getElementById( string );

		serviceid.appendChild( document.createTextNode("Username: " + currentUser.get("username")) );
		var br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);

		serviceid.appendChild( document.createTextNode("Firstname: " + currentUser.get("firstname")) );
		br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);

		serviceid.appendChild( document.createTextNode("Lastname: " + currentUser.get("lastname")) );
		br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);

		serviceid.appendChild( document.createTextNode("Email: " + currentUser.get("email") ));
		br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);

		serviceid.appendChild( document.createTextNode("Birthday: " + (currentUser.get("birthday").getMonth()+1) 
																										+ "/"				+ currentUser.get("birthday").getDate() 
																										+ "/"				+ currentUser.get("birthday").getFullYear() ) );
		br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);

		serviceid.appendChild( document.createTextNode("Address: " + currentUser.get("address")) );
		br = document.createElement("br");
		serviceid.appendChild(br);
		br = document.createElement("br");
		serviceid.appendChild(br);
	

	

		for ( var index = 0 ; index < length ; index ++ )
	  {
		  query.get(ar[index], {
	  		success: function( serve ) {
	    		// The object was retrieved successfully.
	    		var cb = document.createElement("INPUT");
    			cb.setAttribute("type", "checkbox");
    			cb.setAttribute("name", "currservice");
    			cb.setAttribute("value", serve.id );
    			serviceid.appendChild(cb);

	    		
		  		var text = document.createTextNode( "       Name: " + serve.get("name") + "." + " Price: " + serve.get("price") );
		  		serviceid.appendChild(text);

		  		br = document.createElement("br");
		  		serviceid.appendChild(br);

		  		br = document.createElement("br");
		  		serviceid.appendChild(br);

	  		},
	  		error: function(object, error) {
	    	// The object was not retrieved successfully.
	   	  // error is a Parse.Error with an error code and message.
  			}
			});
	  }

		var removebtn = document.createElement("input");
		removebtn.type = "button";
		removebtn.value = "Remove Service(s)";
		removebtn.onclick = function ( ) { 

				removeService( "currservice", currentUser );
				$('#add1').empty();
				$("#add1").append("<span id = \"add\"> </span>");
				$('#myform').empty();
				$("#myform").append("<span id = \"id1\"> </span>");
				$("#myform").append("<span id = \"id2\"> </span>");
				displayCurrentServices( currentUser, string );

			};
		document.getElementById( "id2" ).appendChild(removebtn);

		var addbtn = document.createElement("input");
		addbtn.type = "button";
		addbtn.value = "Add Service(s)";
		addbtn.onclick = function ( ) { 
				addServices ( "newservice", currentUser );
				$('#add1').empty();
				$("#add1").append("<span id = \"add\"> </span>");
				$('#myform').empty();
				$("#myform").append("<span id = \"id1\"> </span>");
				$("#myform").append("<span id = \"id2\"> </span>");
				displayCurrentServices( currentUser, string );
			};
		document.getElementById( "add" ).appendChild(addbtn);
};*/

