Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");



/*
*   Name: displayAllServices ( id )
*   Purpose: Display all services on the "id"
*   Parameter: id: html id
*   Return: NONE
*/
var displayAllServices = function ( id )
{
	var service = Parse.Object.extend( "Services" );
	var query = new Parse.Query ( service );

	//query.equalTo("name", servicename ); 
	query.exists("name" );

	query.find({
	  success: function( services ) 
	  {
	  	for ( var index = 0 ; index < services.length ; index ++ )
	  	{
		  	var printnode = document.getElementById(id);

    		printnode.appendChild(checkbox ( services[index].id, "newservice" ) );

		  	var text = document.createTextNode( services[index].get( 'name' ) + " : $" + services[index].get("price") );
		  	printnode.appendChild(text);

		  	var br = document.createElement("br");
		  	printnode.appendChild(br);

		  	br = document.createElement("br");
		  	printnode.appendChild(br);
	  	}
	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});

};



/*
*   Name: displaySpecificServices ( servicename, id )
*   Purpose: Display specific services on the "id"
*   Parameter: id: html id, place where you want to print out
*							 servicename: name of service that you want to print
*   Return: NONE
*/
var displaySpecificServices = function ( servicename , id )
{
	//create Query variable to search on DB
	var service = Parse.Object.extend( "Services" );
	var query = new Parse.Query ( service );


	//set key and value into query.
	query.equalTo( "name" ,  value ); 
	
	//find value service
	query.find({
	  success: function( services ) 
	  {
	  	for ( var index = 0 ; index < services.length ; index ++ )
	  	{
		  	var printnode = document.getElementById( id );

		  	printnode.appendChild(checkbox ( services[index].id, "newservice" ) );
		  	var text = document.createTextNode( services[index].get( 'name' ) + " : $" + services[index].get("price") );
		  	printnode.appendChild(text);
	  	}
	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});

};
