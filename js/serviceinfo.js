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
	query.exists( "name" );

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
	var myService = new service();


	//set key and value into query.
	query.equalTo( "name" ,  servicename ); 
	
	//find value service
	query.find({
	  success: function( services ) 
	  {
	  	for ( var index = 0 ; index < services.length ; index ++ )
	  	{
		  	var printnode = document.getElementById( id );

		  	myService.id = services[index].id;
		  	printnode.appendChild(checkbox ( myService, "newservice" ) );
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



/*
*   Name: displayAllPackages ( id )
*   Purpose: Display all packages on the "id"
*   Parameter: id: html id
*   Return: NONE
*/
var displayAllPackages = function ( id )
{
	var packages = Parse.Object.extend( "Package" );
	var query = new Parse.Query ( packages );

	//if there is package
	query.exists( "Name" );

	//find all matches
	query.find({
	  success: function( packages ) 
	  {
	  	//Create HTML DOM Objectd
	  	for ( var index = 0 ; index < packages.length ; index ++ )
	  	{
	  		if ( packages[index].get("Active") )
	  		{
		  		//create <div id= "package(index)"> <div id= "service(index)">  </div> </div>
		  		var packagelistid = "package" + index;
		  		var servicelistid = "service" + index;
		  		var breaklineid		= "brline"	+ index;
		  		var packagelist 	= "<div id =\"" + packagelistid + "\">" + "</div>" ;
					var servicelist 	= "<div id =\"" + servicelistid + "\">" + "</div>" ;
					var breakline 		= "<div id =\"" + breaklineid + "\">" + "</div>" ;


					//append new package div and append package info
		  		$( "#" + id ).append( packagelist );
				  getPackageInfo ( packages[index], packagelistid );

				  //append new service div in the package div and append package info
				  $( "#package" + index ).append( servicelist );
			  	getServiceFromPackage ( packages[index].get("Services"), servicelistid );

			  	//append breakline twice
			  	$( "#" + id ).append( "</br></br>" );
		  	}
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
*   Name: getPackageInfo ( id )
*   Purpose: Display all packages information on id
*   Parameter: packages: package that you want to retrieve data
*   					 id: html id
*   Return: NONE
*/
var getPackageInfo = function ( packages, id )
{
	var printnode = document.getElementById(id);

  printnode.appendChild(checkbox ( packages.id, "newpackages" ) );

 	var text = document.createTextNode( packages.get( 'Name' ) + " : $" + packages.get("Price") );
 	printnode.appendChild(text);

 	var br = document.createElement("br");
 	printnode.appendChild(br);

 	text = document.createTextNode( "Included Service: " );
 	printnode.appendChild(text);

};

/*
*   Name: getServiceFromPackage ( id )
*   Purpose: Display all packages' service(s) information on id
*   Parameter: serviceArr: services included in a package that you want to retrieve data
*   					 id: html id
*   Return: NONE
*/
var getServiceFromPackage = function ( serviceArr, id )
{
	var service = Parse.Object.extend( "Services" );
	var query = new Parse.Query ( service );
	var serviceid = document.getElementById( id );
	
	
	for ( var index = 0 ; index < serviceArr.length ; index ++ )
	 {

	  query.get( serviceArr[index], {
	 		success: function( serve ) {

    			var text = document.createTextNode( serve.get("name") + " ");
	  			serviceid.appendChild(text);

  		},
  		error: function(object, error) {
    	// The object was not retrieved successfully.
   	  // error is a Parse.Error with an error code and message.
 			}
		});

  }
		

};