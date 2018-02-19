Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

$(document).ready( function () {

	displayCustomersList();

});

var displayCustomersList = function()
{

	var query = new Parse.Query( Parse.User );
	var userQuery = new Parse.Query( Parse.User );

	query.exists("username");

	$("#customerlists").append("<table id=\"stupid\" border = \"1\" width = \"70%\">");
	query.find({
	  success: function( customers ) 
	  {
	  	$("#stupid").append("<tr id=\""+0+"\">");
	  	$("#0").append("<td id=\"row0col0\">");
	  	$("#0").append("<td id=\"row0col1\">");
	  	$("#0").append("<td id=\"row0col2\">");
	  	$("#0").append("<td id=\"row0col3\">");
	  	$("#0").append("<td id=\"row0col4\">");
	  	document.getElementById( "row0col0" ).appendChild( document.createTextNode("Client ID") );
	  	document.getElementById( "row0col1" ).appendChild( document.createTextNode("Username") );
	  	document.getElementById( "row0col2" ).appendChild( document.createTextNode("Current Unpackaged Services") );
	  	document.getElementById( "row0col3" ).appendChild( document.createTextNode("Current Packages") );
	  	document.getElementById( "row0col4" ).appendChild( document.createTextNode("User Role") );
	  	for ( var index = 0 ; index < customers.length ; index ++ )
	  	{

	  		var currentServices = customers[index].get("CurrentServices");
	  		var currentPackages = customers[index].get("CurrentPackages");
	  		var usertype = getUserType( customers[index].get("role") );
	  		var indexReducer = 0;

	  		console.log ( "usertype =" + usertype);
	  		if ( usertype != false )
	  		{
	  			$("#stupid").append("<tr id=\""+(index + indexReducer+ 1)+"\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + indexReducer + 1) + "col0\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + indexReducer + 1) + "col1\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + indexReducer + 1) + "col2\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + indexReducer + 1) + "col3\">");
	  			$("#"+(index + 1)).append("<td id=\"row" + (index + indexReducer+ 1) + "col4\">");	
	  			$("#"+(index + 1)).append("<span id=\"" + "br" + (index + 1) + "\">");

	  			var serviceid = document.getElementById( index );
	  			var col0 = document.getElementById( "row" + (index + indexReducer + 1) + "col0" )
	  			var col1 = document.getElementById( "row" + (index + indexReducer + 1) + "col1" );
	  			var col2 = document.getElementById( "row" + (index + indexReducer + 1) + "col2" );
	  			var col3 = document.getElementById( "row" + (index + indexReducer + 1) + "col3" );
	  			var col4 = document.getElementById( "row" + (index + indexReducer + 1) + "col4" );
	  			var brid = document.getElementById( "br" + (index + indexReducer + 1) );
	  			

	  			col0.appendChild( document.createTextNode( customers[index].id + " " ) );
					col1.appendChild( document.createTextNode( customers[index].get("username") + " ") );
					col4.appendChild( document.createTextNode( usertype ) );

	  			displayCurrentServiceOfCustomer ( currentServices, index + indexReducer );
	  			displayCurrentPackagesOfCustomer( currentPackages, currentServices, index + indexReducer );

				  br = document.createElement("br");
				  brid.appendChild(br);

					br = document.createElement("br");
					brid.appendChild(br);
				}
				else
				{
					indexReducer--;
				}
	  	} // outer for loop
	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});
    
    
};


var displayCurrentServiceOfCustomer = function ( currentServices, index )
{
	var col2 = document.getElementById( "row" + (index + 1) + "col2" );
	var serviceCount = 0;

	console.log ( currentServices.length );
	if ( currentServices.length == 0 )
	{
		col2.appendChild( document.createTextNode ( "No Services" ) );
	}
	else
	{
		for ( var index2 = 0 ; index2 < currentServices.length ; index2 ++ )
		{
	 		// The object was retrieved successfully.
	 		if ( ! currentServices[index2].isServicePackage)
	 		{
	 			var text = document.createTextNode(  currentServices[index2].serviceName + " Price: " + currentServices[index2].serviceCost + " " );
	 			col2.appendChild(text);
	 			col2.appendChild( document.createElement ( "br" ) );
	 			serviceCount++;
	 		}
	 	}

	 	if ( serviceCount == 0 )
	 	{
	 		col2.appendChild( document.createTextNode ( "No Services" ) );
	 	}

	} //inner for loop

};




var displayCurrentPackagesOfCustomer = function ( currentPackages, currentServices, index )
{
	var col3 = document.getElementById( "row" + (index + 1) + "col3" );


	console.log ( currentPackages.length );
	if ( currentPackages.length == 0 )
	{
		col3.appendChild( document.createTextNode ( "No Packages" ) );
	}
	else
	{
		for ( var packageindex = 0 ; packageindex < currentPackages.length ; packageindex ++ )
		{
	 		// The object was retrieved successfully.
	 		var text = document.createTextNode(  "Name: " + currentPackages[packageindex].packageName 
	 																			+ " Price: $" + currentPackages[packageindex].packagePrice + " " );
	 		col3.appendChild(text);
	 		
	 		col3.appendChild( document.createElement ( "br" ) );

	 		var text = document.createTextNode( "Service(s) included:");
	 		col3.appendChild(text);
	 		col3.appendChild( document.createElement ( "br" ) );

	 		
	 		for ( var serviceindex = 0 ; serviceindex < currentServices.length ; serviceindex++ )
	 		{
	 			if ( currentServices[serviceindex].packageRelatedTo == currentPackages[packageindex].packageId)
	 			{
	 				var text = document.createTextNode( currentServices[serviceindex].serviceName );
	 				col3.appendChild(text);
	 				col3.appendChild( document.createElement ( "br" ) );
	 			}
	 		}


	 		col3.appendChild( document.createElement ( "br" ) );
	 		col3.appendChild( document.createElement ( "br" ) );


	 } //inner for loop
	}

};

var getUserType = function ( string )
{

	if ( string == "user" )
		return "Retail User";
	else if ( string == "comUser") 
		return "Commercial User"

	return false;
};