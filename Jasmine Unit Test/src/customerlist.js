Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

$(document).ready( function () {

	displayCustomersList();

});

var displayCustomersList = function()
{

	var query = new Parse.Query(Parse.User);

	query.exists("username");

	$("#customerlists").append("<table id=\"stupid\" border = \"1\" width = \"70%\">");
	query.find({
	  success: function( customers ) 
	  {
	  	$("#stupid").append("<tr id=\""+0+"\">");
	  	$("#0").append("<td id=\"row0col1\">");
	  	$("#0").append("<td id=\"row0col2\">");
	  	document.getElementById( "row0col1" ).appendChild( document.createTextNode("Username") );
	  	document.getElementById( "row0col2" ).appendChild( document.createTextNode("Current Services") );

	  	for ( var index = 0 ; index < customers.length ; index ++ )
	  	{
	  			$("#stupid").append("<tr id=\""+(index + 1)+"\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + 1) + "col1\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + 1) + "col2\">");
	  			$("#"+(index + 1)).append("<span id=\"" + "br" + (index + 1) + "\">");

	  			var serviceid = document.getElementById( index );
	  			var col1 = document.getElementById( "row" + (index + 1) + "col1" );
	  			var col2 = document.getElementById( "row" + (index + 1) + "col2" );
	  			var brid = document.getElementById( "br" + (index + 1) );
	  			var length = ( customers[index].get("CurrentServices") ).length;
					var ar =  customers[index].get("CurrentServices");

					col1.appendChild( document.createTextNode( customers[index].get("username") + " ") );

				  displayCurrentServiceOfCustomer ( ar, index);
				  br = document.createElement("br");
				  brid.appendChild(br);

					br = document.createElement("br");
					brid.appendChild(br);
	  	} // outer for loop
	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});
    
};


var displayCurrentServiceOfCustomer = function ( ar, index )
{
	
	var service = Parse.Object.extend("Services");
	var query2 = new Parse.Query( service );
	var col2 = document.getElementById( "row" + (index + 1) + "col2" );

	console.log ( ar.length );
	if ( ar.length == 0 )
	{
		col2.appendChild( document.createTextNode ( "No Services" ) );
	}
	else
	{
		for ( var index2 = 0 ; index2 < ar.length ; index2 ++ )
		{
			query2.get(ar[index2], {
				success: function( serve ) 
				{
			 		// The object was retrieved successfully.
			 		var text = document.createTextNode(  serve.get("name") + " Price: " + serve.get("price") + " " );
			 		col2.appendChild(text);
			 		col2.appendChild( document.createElement ( "br" ) );
				},
				error: function(object, error) 
				{
			  	// The object was not retrieved successfully.
			 	  // error is a Parse.Error with an error code and message.
				}
			});
	 } //inner for loop
	}

};