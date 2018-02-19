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
		    // 
		    //window.location.href="signin.html"
		    //alert("Please Log in First");

		    return false;
		}
};




var displayCurrentServices = function ( string )
{
	//flag
	var flag = false;

	//Query variable
	var currentUser = Parse.User.current();
	var text = "";
	var br = "";

	currentUser.fetch();

	if ( currentUser )
	{
		var currentServices = currentUser.get("CurrentServices");
		for ( var index = 0 ; index < currentServices.length ; index ++ )
	  {
	  	if ( ! currentServices[index].isServicePackage )
	  	{
			 	var printnode = document.getElementById(string);

	    	printnode.appendChild( checkbox ( currentServices[index].serviceId, "currservice" ) );


			 	var text = document.createTextNode( currentServices[index].serviceName + " : $" + currentServices[index].serviceCost );
			 	printnode.appendChild(text);

			 	var br = document.createElement("br");
			 	printnode.appendChild(br);

			 	br = document.createElement("br");
			 	printnode.appendChild(br);

			 	flag = true;
		  }
	  }
	}
	else 
	{
	  // show the signup or login page
   alert( "Please Log in First" );
    flag = false;
	}

		return flag;
}; // displayCurrentServices()



var displayCurrentPackages = function ( string )
{
	//Query variable
	var currentUser = Parse.User.current();
	var userCurrentPackages = currentUser.get("CurrentPackages");
	var userCurrentServices = currentUser.get("CurrentServices");
	var printnode = document.getElementById( string );
	var text = "";
	var br = "";
	var flag = true;

	currentUser.fetch();

	if ( currentUser )
	{

		//Iterate through current packages that user has
		for( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex ++ )
		{

			printnode.appendChild( checkbox ( userCurrentPackages[packindex].packageId, "currpackage" ) );
			var text = document.createTextNode( "Package Name: " + userCurrentPackages[packindex].packageName 
																						 +  ",  Price: $ " +  userCurrentPackages[packindex].packagePrice );
			printnode.appendChild(text);

			br = document.createElement("br");
			printnode.appendChild(br);

			text = document.createTextNode( "Service(s) included: " );
			printnode.appendChild(text);

			br = document.createElement("br");
			printnode.appendChild(br);

			for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
			{
				if ( userCurrentPackages[packindex].packageId == userCurrentServices[serviceindex].packageRelatedTo )
				{
					text = document.createTextNode( userCurrentServices[serviceindex].serviceName );
					printnode.appendChild(text);

					br = document.createElement("br");
					printnode.appendChild(br);
				}
			}
		}
		flag = true;
	}
	else 
	{
	  // show the signup or login page
   alert( "Please Log in First" );
    flag = false;
	}

		return flag;
}; // displayCurrentServices()









/*------------------------- BILL -----------------------------*/




var getUserPackagesInfo = function( currentUser )
{
	//retrieve package information from user account
	var packages = Parse.Object.extend("Packages");
	var service = Parse.Object.extend("Services");
	var query = new Parse.Query(service);

	var userCurrentPackages = currentUser.get("CurrentPackages");
	var userCurrentServices = currentUser.get("CurrentServices");
	var printnode = document.getElementById( "packagebill" );

	console.log(currentUser.get("firstname"));
	console.log(userCurrentPackages[0]);

	//Iterate through current packages that user has
	for( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex ++ )
	{

		var text = document.createTextNode( "Package Name: " + userCurrentPackages[packindex].packageName 
																					 +  ",  Price: $ " +  userCurrentPackages[packindex].packagePrice );

		printnode.appendChild(text);

		br = document.createElement("br");
		printnode.appendChild(br);

		text = document.createTextNode( "Service(s) included: " );
		printnode.appendChild(text);

		br = document.createElement("br");
		printnode.appendChild(br);

		for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
		{
			if ( userCurrentPackages[packindex].packageId == userCurrentServices[serviceindex].packageRelatedTo )
			{
				text = document.createTextNode( userCurrentServices[serviceindex].serviceName );
				printnode.appendChild(text);

				br = document.createElement("br");
				printnode.appendChild(br);
			}
		}
	}

};






var getUserServicesInfo = function( currentUser )
{
	//retrieve package information from user account
	var userCurrentServices = currentUser.get("CurrentServices");

	//declare query
	var service = Parse.Object.extend("Services");
	var serviceQuery = new Parse.Query(service);

	//declare dom object
	var printnode = document.getElementById( "currservices" );
	


	for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
	{
		if ( userCurrentServices[serviceindex].isServicePackage == false )
		{
			text = document.createTextNode( "Service Name: " + userCurrentServices[serviceindex].serviceName 
																			+ ", Price : $ " + userCurrentServices[serviceindex].serviceCost	);
			printnode.appendChild(text);

			br = document.createElement("br");
			printnode.appendChild(br);
		}
	}

};



var calculateBill = function()
{
	//variable email	

	var currentUser = Parse.User.current();
	var userCurrentPackages = currentUser.get("CurrentPackages");
	var userCurrentServices = currentUser.get("CurrentServices");
	var userCurrentTFee = currentUser.get("terminationFee");
	var printnode = document.getElementById( "cost" );
	var totalcost = 0;
	var originalcost = 0;
	var totalsave = 0;
	var totaltfee = 0;

	//Iterate through current packages that user has
	for( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex ++ )
	{
		totalcost += Number( userCurrentPackages[packindex].packagePrice );


		for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
		{
			if ( userCurrentPackages[packindex].packageId == userCurrentServices[serviceindex].packageRelatedTo )
			{
				originalcost += Number( userCurrentServices[serviceindex].serviceCost ); 
			}
		}
	}


	//iterate trhough unpackaged
	for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
	{
		if ( userCurrentServices[serviceindex].isServicePackage == false )
		{
			totalcost += Number( userCurrentServices[serviceindex].serviceCost );
			originalcost += Number( userCurrentServices[serviceindex].serviceCost );  
		}
	}

	if ( userCurrentTFee.length >= 1 )
	{
		//iterate trhough termination fee
		for ( var tfeeindex = 0; tfeeindex <  userCurrentTFee.length ; tfeeindex++ )
		{
				totaltfee += Number( userCurrentTFee[tfeeindex].fee );
		}
	}

	if ( originalcost > totalcost )
		totalsave =  originalcost - totalcost;
	else
		totalsave =  totalcost - originalcost;


	if ( totaltfee != 0  )
	{
		var text = document.createTextNode( "Early Termination Fee :  $" +  totaltfee.toPrecision( formatPrecision( totaltfee ) ) );
		printnode.appendChild(text);

		var br = document.createElement("br");
		printnode.appendChild(br);

		totalcost += totaltfee;
	}

	var text = document.createTextNode( "Original Cost :  $" +  originalcost.toPrecision( formatPrecision( originalcost ) ) );
	printnode.appendChild(text);

	var br = document.createElement("br");
	printnode.appendChild(br);

	if ( originalcost > totalcost )
		text = document.createTextNode( "Discount :  $" +  totalsave.toPrecision( formatPrecision( totalsave ) ) );
	else
		text = document.createTextNode( "Discount :  - $" +  totalsave.toPrecision( formatPrecision( totalsave ) ) );
	printnode.appendChild(text);

	br = document.createElement("br");
	printnode.appendChild(br);

	text = document.createTextNode( "Amount Due :  $" +  totalcost.toPrecision( formatPrecision( totalcost ) ) );
	printnode.appendChild(text);

	br = document.createElement("br");
	printnode.appendChild(br);

};

var formatPrecision = function ( number )
{
	if ( number > 10000 )
		return 7;
	else if( number > 1000 )
		return 6;
	else if( number > 100 )
		return 5;
	else if ( number > 10 )
		return 4;
	else if ( number >= 0 )
		return 3;

	return 0;
}


var setThreshold = function ( )
{
	var thresholdAmt =	Number( document.getElementById("thresholdamt").value );
	var currentUser = Parse.User.current();
	currentUser.set("threshold", thresholdAmt );
	currentUser.save();
	alert( "Threshold is set");
	
};