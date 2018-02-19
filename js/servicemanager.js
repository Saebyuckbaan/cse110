Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

/*
*
* Name: addServices 
* Purpose: this methods is calling helper methods to add services to user
* Return: true if added, false otherwise
* 
 */
var addServices = function ( checkboxname, user )
{
	var currentUser = Parse.User.current();

	if (( currentUser.get("role") == "user" ) || ( currentUser.get("role") == "comUser" ) )
	{
		selfAddService ( checkboxname);
		return true;
	}
	else if ( ( currentUser.get("role") == "cr" ))
	{
		//delegateAddService ( checkboxname, user );
		return true;
	}
	else if ( ( currentUser.get("role") == "mr" ) )
	{
		omniAddService ();
		return true;
	}

	return false;
};


/*serviceId
*
* Name: var selfAddService = function ( checkboxname )
* Purpose: User add services by his/herself 
* Return: none
* 
 */
var selfAddService = function ( checkboxname )
{

	//fetch the current logged-in user data
	var service = Parse.Object.extend( "Services" );
	var query = new Parse.Query ( service );
	var checkbox  	= document.getElementsByName(checkboxname);
	var currentUser = Parse.User.current();
	var thresholdAmt = Number( currentUser.get("threshold") );
	var userCurrentBill = Number( currentUser.get("bill") );
	var bool = false;
	var serviceObject;

	currentUser.fetch().then( function ( )
	{
		//if the current account is the user account then add services
		if (currentUser ) 
		{
		  // do stuff with the user
		  for (var i = 0, length = checkbox.length; i < length; i++) 
		  {
		    if (checkbox[i].checked) 
		    {
	        bool = true;

					//find value service
					query.get( checkbox[i].value , 
					{ 
					  success: function( services ) 
					  { 

					  	serviceObject = new Object();
					  	currentUser.fetch();
					  	var arr = currentUser.get("CurrentServices");

					  	serviceObject = {
								  							serviceId: services.id,
								  							serviceName: services.get("name"),
								  							serviceCost: services.get("price"),
								  							serviceActive: services.get("active"),
								  							isServicePackage: false
					  									};
					  	console.log( serviceObject.serviceId );
					  	
					  	Parse.Cloud.run('addUniqueService', { obj: serviceObject }, 
				      {
				          success: function(status) 
				           {
				         			alert("Added Service(s)");
				           },
				          error: function(error)
				          {
				          	alert("User already has service"); 
				          } // error
						  }).then( function () {

						  	Parse.Cloud.run('calculateBill', { flag: false, objectId: "NULL" }, 
					      {
					        success: function(status) { },
					        error: function(error){ } // error
							  });//Parse.Cloud.run

						  });//Parse.Cloud.run

					  },
					  error: function(error) 
					  {
					  	alert("Error: " + error.code + " " + error.message);
					    // The login failed. Check error to see why.
					  }
					});//query.get
		    } // if
		  } // for

		} // if
		else 
		{
		  // show the signup or login page
		  alert( "Please Log in First" );
		} // else
	});

}; // selfAddService()


var selfAddPackage = function ( checkboxname )
{ 
	//create Query variable to search on DB
	//var user = Parse.Object.extend( Parse.User );
	var checkbox  	= document.getElementsByName(checkboxname);
	var bool = false;
	var duplicateflag;

	for (var i = 0; i < checkbox.length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
		  checkboxflag = true;
		  //get the package object id
		  //packageObjId.push(checkbox[i].value);

		  Parse.Cloud.run('addPackageToCurrentUser', { newpackageId: checkbox[i].value }, 
		  {
	      success: function(status) {
	      	alert( "Package Added ");
	      },
	      error: function(error) 
	      {
	              // error
	        alert( "User already has service(s) in that package");
	      }
			})
			.then( function( ) 
			{
				Parse.Cloud.run('calculateBill', {flag: false, objectId: "NULL"}, 
				{
				  success: function(status) { },
				  error: function(error){ } // error
				});//Parse.Cloud.run			
			});
		}
	}

}; // addPackageToCustomer()



/*
*
* Name:var omniAddService = function()
* Purpose: the function that add new services to Parse Datbase.
* 					ONLY FOR MARKETING REPRESENTATIVE!
* Return: true if added, false if not.
* 
 */
var omniAddService = function()
{
	var servicename = document.getElementById("ServiceName").value;
	var servicepricedollar = document.getElementById("ServicePriceDollar").value;
	var servicepricecent = document.getElementById("ServicePriceCent").value;
	var nameflag = false;
	var dollarflag = false;
	var centflag = false;
	var priceflag = false;
	var serviceprice;

	//check if the servicename is not empty string
	if ( servicename != "" )
		nameflag = true;

	//check if dollar is Number
	if ( ( servicepricedollar != "" ) && ( !isNaN( servicepricedollar ) )  )
		dollarflag = true;

	//check if cent if number
	if ( ( servicepricecent != "" ) && ( !isNaN( servicepricecent ) )  )
		centflag = true;


	//if dollar and cent is valid then convert that into price
	if ( dollarflag && centflag )
	{
		serviceprice = Number(servicepricedollar + "." + servicepricecent);
		priceflag = true;
	}


	//if the name and the price is valid, then add service
	if ( priceflag && nameflag )
	{
		//create Query variable to search on DB
		var services = Parse.Object.extend( "Services" );
		var service = new services();

		var query = new Parse.Query(services);

		query.equalTo("name", servicename );
		query.first(
		{
	  	success: function(results) 
	  	{
	  		if ( results)
	  		{
		  		alert("Service already exists");
		    }	
		  	else
		  	{
		  		service.set("name", servicename )
		  		service.set( "price", serviceprice );
		  		service.set( "active", true );
		      service.save();
		      alert("service added");
		      location.href = "market-rep-add-service.html";
		  	}	
	  	},//query.find success
	  	error: function(error) 
	  	{
	    	alert("Error: " + error.code + " " + error.message);
	  	}	//query.find error

		});
	}
	else if ( !priceflag && !nameflag )
	{
		alert( "Price and name are not valid. Please try again");
	}
	else if ( !priceflag )
	{
		alert( "Price is not valid number. Please try again");
	}
	else if ( !nameflag )
	{
		alert( "Name is not valid. Please try again");
	}


};


/*
*
* Name: var removeService = function ( checkboxname, user )
* Purpose: super method to call correspond sub method 
* Return: true if added, false if not.
* 
 */
var removeService = function ( checkboxname, user )
{
	var currentUser = Parse.User.current();

	if (( currentUser.get("role") == "user" )  || ( currentUser.get("role") == "comUser" ))
	{
		selfRemoveService ( checkboxname);
		return true;
	}

	return false;
};



/*
*
* Name: var selfRemoveService = function ( checkboxname )
* Purpose: USER REMOVES SERVICE ONESELF
* Return: NONE
* 
 */
var selfRemoveService = function ( checkboxname )
{
	var checkbox  	= document.getElementsByName(checkboxname);
	var currentUser = Parse.User.current();
	var userCurrentServices = currentUser.get( "CurrentServices" );
	currentUser.fetch().then(function()
	{
		if (currentUser) 
		{
		  // do stuff with the user
		  for (var i = 0, length = checkbox.length; i < length; i++) 
			{
		    if (checkbox[i].checked) 
		    {
		    	var objectid = checkbox[i].value;

		    	Parse.Cloud.run('removeNonPackageService', { Id: objectid }, 
				      {
				        success: function(status) 
				        {

				        },
				          error: function(error){ } // error
						  }).then( function () {

						  	Parse.Cloud.run('calculateBill', { flag: false, objectId: "NULL" }, 
					      {
					        success: function(status) { },
					        error: function(error){ } // error
							  });//Parse.Cloud.run

						  });//Parse.Cloud.run

		      //currentUser.remove("CurrentServices",checkbox[i].value );		  	
			  }
			}
			alert("Service(s) Removed");
			location.reload();
		} 
		else 
		{
		  // show the signup or login page
		  alert( "Please Log in First" );
		}
	});


};



/*
*
* Name: var selfRemovePackage = function ( checkboxname )
* Purpose: USER REMOVES SERVICE ONESELF
* Return: NONE
* 
 */
var selfRemovePackage = function ( checkboxname )
{
	var checkbox  	= document.getElementsByName(checkboxname);
	var currentUser = Parse.User.current();
	var userCurrentServices = currentUser.get( "CurrentServices" );
	var userCurrentPackages = currentUser.get( "CurrentPackages" );
	var packageFlag = false;
	var serviceFlag = false;

	//contract date comparison
	var yearFlag = false;
	var monthFlag = false;
	var dayFlag = false;

	currentUser.fetch().then(function ( )
	{

		if (currentUser) 
		{
		  // do stuff with the user
		  for (var i = 0, length = checkbox.length; i < length; i++) 
			{
		    if (checkbox[i].checked) 
		    {
		    	var objectid = checkbox[i].value;

		    	for ( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex++ )
		    	{
		    		//check object id is same as package id
		    		if ( objectid == userCurrentPackages[packindex].packageId)
		    		{
		    			//----------------- check contract ----------------- //
		    			var packId = userCurrentPackages[packindex].packageId;
		    			var contractStart = new Date( userCurrentPackages[packindex].packageStartDate );
		    			var todaysDate = new Date();


		    			console.log ( contractStart );
		    			console.log ( contractStart.getFullYear() );
		    			console.log (  todaysDate.getFullYear() );

		 					if ( Number( todaysDate.getFullYear() - contractStart.getFullYear() ) >= 2  )
		 					{
		 						yearFlag = true;
		 						monthFlag = true;
		 						dayFlag = true;
		 					}

		    			if ( Number( todaysDate.getFullYear() - contractStart.getFullYear() ) == 1  )
		    			{
		    				yearFlag = true;

		    				if ( Number( todaysDate.getMonth() - contractStart.getMonth() ) >= 0  )
		    				{
		    					monthFlag = true;

			    				if ( Number( todaysDate.getDate() - contractStart.getDate() ) >= 0  )
			    				{
			    					dayFlag = true;	
			    				}				
		    				}
		    			}
		    				
		    			//Remove package corresponds to the result.
		    			if( yearFlag && monthFlag && dayFlag )
		    			{
		    				//Set cost
		    				var cost = Number( currentUser.get("Bill") + userCurrentPackages[packindex].packagePrice  );
	          		currentUser.set("Bill", cost);

	          		//remove paakcage
			    			currentUser.remove( "CurrentPackages", userCurrentPackages[packindex] );

			    			//Remove correspond services
			    			for ( serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex ++ )
		    				{
		    					if ( userCurrentServices[serviceindex].packageRelatedTo == packId )
		    					{
		    								currentUser.remove( "CurrentServices", userCurrentServices[serviceindex] );
		    					}
		    				}
		    				currentUser.save();
			    			packageFlag = true;	    				
		    			}
		    			else
		    			{
		    				var earlyTermFlag = confirm("If you remove this package at this"+ 
		    																		" time, you will be charged an early"+
		    																		" termination fee of $150. Do you want to continue?");
		    				if ( earlyTermFlag )
		    				{
		    					var tfee = new Object();
		    					tfee = {
		    										fee: 150,
		    										date: Date(),
		    										packageId: packId
		    					       };
		    					//remove package
		    					currentUser.remove( "CurrentPackages", userCurrentPackages[packindex] );

		    					//remove correspond services
		    					for ( serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex ++ )
		    					{
		    						if ( userCurrentServices[serviceindex].packageRelatedTo == packId )
		    						{
		    								currentUser.remove( "CurrentServices", userCurrentServices[serviceindex] );
		    						}
		    					}
		    					currentUser.add( "terminationFee", tfee );

		 							currentUser.save();
		    					packageFlag = true;	 
		    				}
		    				else
		    				{
		    				}
		    			}// else of ( yearFlag && monthFlag && dayFlag )
		    		}//( objectid == userCurrentPackages[packindex].packageId)
		    	} // for ( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex++ )
		  	
			  }
			}



		} 
		else 
		{
		  // show the signup or login page
		  alert( "Please Log in First" );
		}

	}).then( function( ) {

		Parse.Cloud.run('calculateBill', { flag: false, objectId: "NULL" }, 
			      {
			        success: function(status) { },
			        error: function(error){ } // error
					  });//Parse.Cloud.run

		console.log( "I AM HERE");
		if ( packageFlag )
		{
			alert("Package(s) Removed");
		}
		location.reload();
	});

};




/*
*
* Name:var omniAddService = function()
* Purpose: the function that add new services to Parse Datbase.
* 					ONLY FOR MARKETING REPRESENTATIVE!
* Return: true if added, false if not.
* 
 */
var omniRemoveService = function( checkboxname )
{
	var checkbox  = document.getElementsByName(checkboxname);
	var services = Parse.Object.extend( "Services" );
	var servicesQuery = new Parse.Query ( services );
	var packages = Parse.Object.extend( "Package" );
	var packagesQuery = new Parse.Query ( packages );
	var serviceId;

	for (var i = 0, length = checkbox.length; i < length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
	  	//get the service id
	  	serviceId = checkbox[i].value;

	  	//iterate through all existing packages
	  	packagesQuery.exists( "Name" );
	  	packagesQuery.find(
	  	{
			  success: function( packageinfo ) 
			  {
			  	//search through the package that has this service info, and remove them
			  	for ( var packindex = 0 ; packindex < packageinfo.length ; packindex ++ )
			  	{
			  		serviceInPack = packageinfo[packindex].get("Services");
			  		for ( var serviceindex = 0 ; serviceindex < serviceInPack.length ; serviceindex++ )
			  		{
			  			if(  serviceInPack[serviceindex] == serviceId )
			  			{
			  				packageinfo[packindex].remove("Services", serviceInPack[serviceindex] );
			  			}
			  		}
			  	}
			  },
			  error: function(user, error) 
			  {
			  	alert("Error: " + error + " " + error.message);
			    // The login failed. Check error to see why.
			  }
			})
			.then(function ()
			{
				servicesQuery.get(serviceId,
				{
					success: function( currservices ) 
					{
						currservices.destroy()
						alert("Service is deleted permanantly from database");
						window.location.href = "market-rep-delete-service.html";
					}
				});//servicesQuery.get(
			}); //.then(function ()

	  }
	}
};



/*
*
* Name:var var omniRemovePackage = function( checkboxname )
* Purpose: the function that remove existing package to Parse Datbase.
* 					ONLY FOR MARKETING REPRESENTATIVE!
* Return: true if added, false if not.
* 
 */
var omniRemovePackage = function( checkboxname )
{

	var checkbox  = document.getElementsByName(checkboxname);
	var packages = Parse.Object.extend( "Package" );
	var packagesQuery = new Parse.Query ( packages );
	var packageId;

	for (var i = 0, length = checkbox.length; i < length; i++) 
	{
	  if (checkbox[i].checked) 
	  {
	  	//get the service id
	  	packageId = checkbox[i].value;

	  	//iterate through all existing packages
			packagesQuery.get(packageId,
			{
				success: function( currspackages ) 
				{
					currspackages.set( "Active", false );
					currspackages.save();
					alert("Service is deleted inactive from database");
					window.location.href = "market-rep-delete-package.html";
				}
			});//ackagesQuery.get(packageId,
	  }//if (checkbox[i].checked) 
	}//for (var i = 0, length = checkbox.length; i < length; i++) 

};




var selfCancelServices = function ( )
{
	var currentUser = Parse.User.current();
	var userCurrentServices = currentUser.get( "CurrentServices" );
	var userCurrentPackages = currentUser.get( "CurrentPackages" );
	var packageFlag = false;
	var serviceFlag = false;

	//contract date comparison
	var yearFlag = false;
	var monthFlag = false;
	var dayFlag = false;

	console.log (userCurrentPackages.length);
	for ( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex++ )
	{

		//----------------- check contract ----------------- //
		var packId = userCurrentPackages[packindex].packageId;
		var contractStart = new Date( userCurrentPackages[packindex].packageStartDate );
		var todaysDate = new Date();


		console.log ( contractStart );
		console.log ( contractStart.getFullYear() );
		console.log (  todaysDate.getFullYear() );

		if ( Number( todaysDate.getFullYear() - contractStart.getFullYear() ) >= 2  )
		{
			yearFlag = true;
			monthFlag = true;
			dayFlag = true;
		}

		if ( Number( todaysDate.getFullYear() - contractStart.getFullYear() ) == 1  )
		{
			yearFlag = true;

			if ( Number( todaysDate.getMonth() - contractStart.getMonth() ) >= 0  )
			{
				monthFlag = true;

				if ( Number( todaysDate.getDate() - contractStart.getDate() ) >= 0  )
				{
					dayFlag = true;	
				}				
			}
		}
			
		//Remove package corresponds to the result.
		if( yearFlag && monthFlag && dayFlag )
		{
			//Set cost
			var cost = Number( currentUser.get("Bill") + userCurrentPackages[packindex].packagePrice  );
	          		currentUser.set("Bill", cost);

	          		//remove paakcage
			currentUser.remove( "CurrentPackages", userCurrentPackages[packindex] );

			//Remove correspond services
			for ( serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex ++ )
			{
				if ( userCurrentServices[serviceindex].packageRelatedTo == packId )
				{
							currentUser.remove( "CurrentServices", userCurrentServices[serviceindex] );
				}
			}
			currentUser.save();
			packageFlag = true;		
		}
		else
		{
		
			var tfee = new Object();
			tfee = {
								fee: 150,
								date: Date(),
								packageId: packId
			       };
			console.log ( "Tfee.packId = " + tfee.packageId  );
			//remove package
			currentUser.remove( "CurrentPackages", userCurrentPackages[packindex] );

			//remove correspond services
			for ( serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex ++ )
			{
				if ( userCurrentServices[serviceindex].packageRelatedTo == packId )
				{
						currentUser.remove( "CurrentServices", userCurrentServices[serviceindex] );
				}
			}
			currentUser.add( "terminationFee", tfee );

			currentUser.save();
			packageFlag = true;	 
		}// else of ( yearFlag && monthFlag && dayFlag )
	} // for ( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex++ )


	for ( var serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex++ )
	{
		if ( !userCurrentServices[serviceindex].isServicePackage )
		{
			Parse.Cloud.run('removeNonPackageService', { Id: userCurrentServices[serviceindex].serviceId }, 
			{
				success: function(status) 
				{

				},
				  error: function(error){ } // error
			}).then( function () {

				Parse.Cloud.run('calculateBill', { flag: false, objectId: "NULL" }, 
				{
					success: function(status) { },
					error: function(error){ } // error
				});//Parse.Cloud.run

			});//Parse.Cloud.run
		}
	}

	setTimeout(function(){
		alert("Service has cancelled")
		window.location.href = "myaccount.html";
	},4000)
		
	
};