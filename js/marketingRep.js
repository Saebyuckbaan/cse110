Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");


/*
*   Name: var addNewServicesToExistingPackage = function (  )
*   Purpose: Add new services to existing package
*   Return: NONE
*/
var addNewServicesToExistingPackage = function (  )
{
	var packages = Parse.Object.extend( "Package" );
	var packageQuery = new Parse.Query ( packages );
	var checkbox  	= document.getElementsByName( "newpackages" );
	var packageObjId;
	var bool = false;
		
	for (var i = 0, length = checkbox.length; i < length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
	    packageObjId = checkbox[i].value;
	  }
	}
	

	packageQuery.get( packageObjId )//get package information
	.then( function( packages ) //then get service information
	{
		var checkbox  = document.getElementsByName( "newservice" );
		var currentPackage = packages.get("Services");
		for (var i = 0, length = checkbox.length; i < length; i++) 
		{
		  if (checkbox[i].checked) 
		  {
		  	bool = true;
		    packages.addUnique("Services",checkbox[i].value );
		  }
		}
		return packages;
	})
	.then( function( packages ) //then save package
	{
		if(bool == true) 
		{
			alert ( "Service(s) added" );
			packages.save();
	  }
	})
	.then( function( packages ) //then save package
	{
		window.location.href = "market-rep-edit-package.html";
	});
};


/*
*   Name: var addNewServicesToExistingPackage = function (  )
*   Purpose: Add new services to existing package
*   Return: NONE
*/
var removeExistingServicesFromExistingPackage = function (  )
{
	var packages = Parse.Object.extend( "Package" );
	var packageQuery = new Parse.Query ( packages );
	var checkbox  	= document.getElementsByName( "newpackages" );
	var packageObjId;
	var bool = false;
		
	for (var i = 0, length = checkbox.length; i < length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
	    packageObjId = checkbox[i].value;
	  }
	}
	

	packageQuery.get( packageObjId )//get package information
	.then( function( packages ) //then get service information
	{
		var checkbox  = document.getElementsByName( "existingservices" );
		var currentPackage = packages.get("Services");
		for (var i = 0, length = checkbox.length; i < length; i++) 
		{
		  if (checkbox[i].checked) 
		  {
		  	bool = true;
		    packages.remove("Services",checkbox[i].value );
		  }
		}
		return packages;
	})
	.then( function( packages ) //then save package
	{
		if(bool == true) 
		{
			alert ( "Service(s) removed" );
			packages.save();
	  }
	})
	.then( function( packages ) //then save package
	{
		window.location.href = "market-rep-edit-package.html";
	});
};





/*
*   Name:var retrievePackageInfo = function ()
*   Purpose: Print Package information
*   Return: NONE
*/
var retrievePackageInfo = function ()
{
	var checkbox  	= document.getElementsByName( "newpackages" );
	var checkboxflag = false;
	var packageObjId ;
	var packages = Parse.Object.extend( "Package" );
	var packageQuery = new Parse.Query ( packages );
	var services = Parse.Object.extend( "Services" );
	var serviceQuery = new Parse.Query ( services );
	var allServices = [];
	var availableServices = [];
	var availableServicesById = [];
	var existingServicesById = [];

	for (var i = 0; i < checkbox.length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
	  	checkboxflag = true;
	  	//get the package object id
	  	packageObjId = checkbox[i].value;
	  }
	}
	
	if ( ! checkboxflag )
	{
		return checkboxflag;
	}

	packageQuery.get( packageObjId )//get package information
	.then( function( packages ) //then get service information
	{
		var existingServices = packages.get("Services");
		

		serviceQuery.exists("name");

		serviceQuery.find({
		  success: function( servicesArr ) 
		  {
		  	//Retrieve all services
		  	for ( var index = 0 ; index < servicesArr.length ; index ++)
		  		allServices.push(servicesArr[index].id);
		  },
		  error: function(user, error) 
		  {
		  	alert("Error: " + error.code + " " + error.message);
		   // The login failed. Check error to see why.
		  }
		})//find then
		//sort out the services that can be added to current packages
		.then( function( result ) 
		{
			//retrieve only available services
			for ( var index2 = 0; index2 < allServices.length; index2++ )
			{
				if ( !( existingServices.indexOf( allServices[index2] ) > -1 ) )
				{
					availableServicesById.push( allServices[index2] );
				}
				else
				{
					existingServicesById.push( allServices[index2] );
				}
			}

		})//then
		//print out services
		.then( function( result ) 
		{
			//print out services
			var servicenode = document.getElementById( "servicelist" );
	 		var text = document.createTextNode( "Available Service(s) to add for this package: " );
	  	servicenode.appendChild(text);
		 	servicenode.appendChild(document.createElement("br"));
		 	servicenode.appendChild(document.createElement("br"));

	 		for ( var index = 0; index < availableServicesById.length; index ++ )
	 		{
				displaySpecificServicesByObjId( availableServicesById[index] , "servicelist", "newservice"  );
			}

		})//then 2
		.then( function( result ) 
		{
			//print out services
			var servicenode = document.getElementById( "existingServiceList" );
	 		var text = document.createTextNode( "Existing Service(s) from this package: " );
	  	servicenode.appendChild(text);
		 	servicenode.appendChild(document.createElement("br"));
		 	servicenode.appendChild(document.createElement("br"));

	 		for ( var index = 0; index < existingServicesById.length; index ++ )
	 		{
				displaySpecificServicesByObjId( existingServicesById[index] , "existingServiceList", "existingservices");
			}

		});//then 2

		//pass the packages to the next then function
		return packages;

	})//then
	//print out package information
	.then( function( packages ) 
	{
			var packageNode = document.getElementById( "packageinfo" );
			var serviceNode = document.getElementById( "existingServiceInfo" );
			//print out package information
			//var br = document.createElement("br");
		 	//packageNode.appendChild(br);

			var text = document.createTextNode( "Package Name : " + packages.get( 'Name' ) );
			packageNode.appendChild(text);

			br = document.createElement("br");
		 	packageNode.appendChild(br);

			text = document.createTextNode( "Package Price : $" + packages.get("Price") );
			packageNode.appendChild(text);

			br = document.createElement("br");
			packageNode.appendChild(br);
/*
			var br = document.createElement("br");
			printnode.appendChild(br);

			
			var br = document.createElement("br");
			printnode.appendChild(br);
*/
			var text = document.createTextNode("Package currently includes following services: ");
			serviceNode.appendChild(text);
			getServiceFromPackage ( packages.get("Services"), "existingServiceInfo" );

	});//then 3

	return checkboxflag;
};




/*
*   Name: displaySpecificServices ( servicename, id )
*   Purpose: Display specific services on the "id"
*   Parameter: id: html id, place where you want to print out
*							 servicename: name of service that you want to print
*   Return: NONE
*/
var displaySpecificServicesByObjId = function ( objectId , id, checkboxid )
{
	//create Query variable to search on DB
	var service = Parse.Object.extend( "Services" );
	var query = new Parse.Query ( service );

	//find value service
	query.get( objectId, {
	  success: function( services ) 
	  {
		  	var printnode = document.getElementById( id );

		  	printnode.appendChild(checkbox ( services.id, checkboxid ) );
		  	var text = document.createTextNode( services.get( 'name' ) + " : $" + services.get("price") );
		  	printnode.appendChild(text);
			 	printnode.appendChild(document.createElement("br"));
			 	printnode.appendChild(document.createElement("br"));

	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});

};




/*
*   Name: var setNewPackagePrice = function()
*   Purpose: Edit price of selected package
*/
var setNewPackagePrice = function()
{
	var checkbox  	= document.getElementsByName( "newpackages" );
	var packageprice = document.getElementById("newPriceOfPackage").value;
	var packages = Parse.Object.extend( "Package" );
	var packageQuery = new Parse.Query ( packages );

	//if new price of package is acceptable
	if ( packageprice > 0 )
	{

		for (var i = 0; i < checkbox.length; i++) 
		{
		  if (checkbox[i].checked) 
		  {

		  	//get the package object id
		  	packageObjId = checkbox[i].value;
		  	packageQuery.get( packageObjId )//get package information
				.then( function( currPackages ) //then get service information
				{

					currPackages.set( "Price", Number( packageprice ) );
					currPackages.save();
				}).then (function ( ){
				alert( "Package price has changed" );
				setTimeout(function(){
					window.location.href = "market-rep-edit-package.html";
				},2000)
				//
				});

				return true;
		  }
		}
		
	}
	else
	{
		return false;
	}
};


/*
*   Name: var setNewPackagePrice = function()
*   Purpose: Edit price of selected package
*/
var addNewPackageToParse = function()
{
	var checkbox  	= document.getElementsByName( "newservice" );
	var packagename = document.getElementById( "nameOfPackage").value;
	var packageprice = Number( document.getElementById("priceOfPackage").value );
	var serviceId = [];

	var packages = Parse.Object.extend( "Package" );
	var packageQuery = new Parse.Query ( packages );
	var newPackage = new packages();

	var nameFlag = false;
	var priceFlag = false;
	var duplicateFlag = false;

	packageQuery.exists( "Name" );
	packageQuery.find(
	{
		success: function( packageArr ) 
		{
			//Retrieve all services
		  for ( var index = 0 ; index < packageArr.length ; index ++)
		  {
		  	if ( packageArr[index].get("Name") === packagename )
		  	{
		  		duplicateFlag = true;
		  	}  		
		  }
		  console.log("I am here");
		},
		error: function( error) 
		{
			alert("Error: " + error.code + " " + error.message);
		  // The login failed. Check error to see why.
		}
	})//find then
	.then( function()
	{
			console.log( "duplicateFlag = " + duplicateFlag);
			if ( !duplicateFlag )
			{
				//if new price of package is acceptable
				if ( packageprice > 0 )
				{
					priceFlag = true;
				}
				if ( packagename != "" )
				{
					nameFlag = true;
					
				}

				console.log ("priceFlag = " +priceFlag );
				console.log ("nameFlag = " +nameFlag );
				if ( nameFlag && priceFlag )
				{
					//collect list of checkbox checked value
					for (var i = 0; i < checkbox.length; i++) 
					{
					  if (checkbox[i].checked) 
					  {
					  	//push service id into the array
					  	serviceId.push(checkbox[i].value);
					  }
					}
					console.log( "serviceId = " + serviceId );
					newPackage.set("Name",packagename );
					newPackage.set("Price",packageprice );
					newPackage.set("Services",serviceId );
					newPackage.set("Active",true );
					newPackage.save();
					alert("New Package has added to database");
					window.location.href = "market-rep-add-package.html";
					return true;
				}
				else
				{
					alert( "Your name/price input is invalid");
					return false;
				}
			}
			else
			{
				alert( "Package name is already exist in the system. Please try another name" );
			}
		},
		function( error ) 
		{
			alert( "Package name is already exist in the system. Please try another name" );
		  // The login failed. Check error to see why.
	});

};

