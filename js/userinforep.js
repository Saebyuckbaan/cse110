Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

$(document).ready( function () {

	$("#addservicebutton").hide();
	$("#addpackagebutton").hide();
	$("#removepackagebutton").hide();
	$("#removeservicebutton").hide();
	$("#user").hide();


});

var createAddServiceButton = function ( objId )
{
	var userObjId = objId;
	var addbtn = document.createElement("input");
	addbtn.className = "myButton";
	addbtn.type = "button";
	addbtn.value = "Add Service(s)";
	addbtn.onclick = function ( ) { 
		delegateAddService ( "newservice", userObjId );

	};
	document.getElementById( "addservicebutton" ).appendChild(addbtn);
};

var createAddPackageButton = function ( objId )
{
	var userObjId = objId;
	var addpbtn = document.createElement("input");
	addpbtn.className = "myButton";
	addpbtn.type = "button";
	addpbtn.value = "Add Package(s)";
	addpbtn.onclick = function ( ) { 
		addPackageToCustomer ( "newpackages", userObjId );
	};
	document.getElementById( "addpackagebutton" ).appendChild(addpbtn);
};

var createRemovePackageButton = function ( objId )
{
	var userObjId = objId;
	var removebtn = document.createElement("input");
	removebtn.className = "myButton";
	removebtn.type = "button";
	removebtn.value = "Remove Package(s)";
	removebtn.onclick = function ( ) { 
			delegateRemovePackages( "currpackage", userObjId );

			};
	document.getElementById( "removepackagebutton" ).appendChild(removebtn);
};


var createRemoveServiceButton = function ( objId )
{
	var userObjId = objId;
	var removebtn = document.createElement("input");
	removebtn.className = "myButton";
	removebtn.type = "button";
	removebtn.value = "Remove Service(s)";
	removebtn.onclick = function ( ) { 
			delegateRemoveService( "currservice", userObjId );
			};
	document.getElementById( "removeservicebutton" ).appendChild(removebtn);
};

var retrieveUserInfo = function()
{
	
	 //initialize variables using each re-formatter 
  var firstname =  reformatName( document.getElementById( "firstname" ).value ) ;
  var lastname  =  reformatName( document.getElementById( "lastname" ).value );
  var ssn 		  =  Number( document.getElementById( "lastssn" ).value ); 
	var userObjId;
	var query = new Parse.Query(Parse.User);
	var progress = true;
	//var flag = false;


	if ( ( firstname == "" ) || ( lastname == "" ) || (ssn == 0) )
	{
		return false;
	}

	query.equalTo("firstname", firstname );
	query.equalTo("lastname", lastname );
	query.equalTo("lastfourssn", ssn );


	query.first({
  	success: function( userinfo ) {
  		if(userinfo)
  		{
  			$("#addservicebutton").empty();
				$("#addpackagebutton").empty();
				$("#removepackagebutton").empty();
				$("#removeservicebutton").empty();
        createAddServiceButton(userinfo.id);
			 	createAddPackageButton(userinfo.id);
			 	createRemovePackageButton(userinfo.id);
			 	createRemoveServiceButton(userinfo.id);
  			return userinfo;
  	  }
  	    else
  	      progress = false;
  	    //alert(progress);
  	},
  	error: function( error ) {
    // Do stuff
    	alert("Error: " + error.code + " " + error.message);
  	}
	})
	.then(function ( currentUser )
	{
		$("#userinfo").empty();
		//Print Out User Personal information
		if(progress){

		//alert("here");
		var currentUserId = currentUser.id;
		var serviceid = document.getElementById( "userinfo" );

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

		return currentUser;

	    } // if actual user

	})//.then 1
	.then(function ( currentUser )
	{
   	//Print Out User Package Information
   	$("#usercurrentpackage").empty();     
		$("#usercurrentservice").empty();

		if(progress){

		var packages = Parse.Object.extend("Packages");
		var userCurrentPackages = currentUser.get("CurrentPackages");
		var userCurrentServices = currentUser.get("CurrentServices");

		var service = Parse.Object.extend("Services");
		var query = new Parse.Query(service);
		var length = ( currentUser.get("CurrentServices") ).length;
		var ar =  currentUser.get("CurrentServices");
		var serviceid = document.getElementById( "usercurrentservice" );
		var printnode = document.getElementById( "usercurrentpackage" );


		//Iterate through current packages that user has
		for( var packindex = 0 ; packindex < userCurrentPackages.length ; packindex ++ )
		{
			var cb = document.createElement("INPUT");
	    cb.setAttribute("type", "checkbox");
	    cb.setAttribute("name", "currpackage");
	    cb.setAttribute("value", userCurrentPackages[packindex].packageId );
	    printnode.appendChild(cb);

			var text = document.createTextNode( "Package Name: " + userCurrentPackages[packindex].packageName 
																						 +  ",  Price: " +  userCurrentPackages[packindex].packagePrice );
			printnode.appendChild(text);

			br = document.createElement("br");
			printnode.appendChild(br);

			var text = document.createTextNode( "Service(s) included: " );
			printnode.appendChild(text);

			br = document.createElement("br");
			printnode.appendChild(br);

			for ( var serviceindex = 0; serviceindex <  userCurrentServices.length ; serviceindex++ )
			{
				if ( userCurrentPackages[packindex].packageId == userCurrentServices[serviceindex].packageRelatedTo )
				{
					var text = document.createTextNode( userCurrentServices[serviceindex].serviceName );
					printnode.appendChild(text);

					br = document.createElement("br");
					printnode.appendChild(br);
				}
			}

		}


		for ( var serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex++ )
		{
			if ( userCurrentServices[serviceindex].isServicePackage == false)
			{
				var cb = document.createElement("INPUT");
	    	cb.setAttribute("type", "checkbox");
	    	cb.setAttribute("name", "currservice");
	    	cb.setAttribute("value", userCurrentServices[serviceindex].serviceId );
	    	serviceid.appendChild(cb);

				var text = document.createTextNode( "       Name: " + userCurrentServices[serviceindex].serviceName 
																						+ "." + " Price: " + userCurrentServices[serviceindex].serviceCost );
				serviceid.appendChild(text);

				br = document.createElement("br");
				serviceid.appendChild(br);

				br = document.createElement("br");
				serviceid.appendChild(br);
			}
		}

	  userObjId = currentUser.id;
	  return currentUser.id;

	  }// if actual user
	  else{alert("not a valid customer");}

	});//.then 2
  

	//console.log(userObjId);
	return true;
};





/*
*
* Name: var omniAddService = function ( checkboxname, user )
* Purpose: called when representative add services for user
* Return: none
* 
 */
var delegateAddService = function ( checkboxname, objId )
{
	//create Query variable to search on DB
	var repId = Parse.User.current().id;
	var repPw = Parse.User.current().get("password");
	
	var services = Parse.Object.extend( "Services" );
  var serviceQuery = new Parse.Query ( services );
  var serviceObject = new Object();
	var query = new Parse.Query ( Parse.User );
	var checkbox  	= document.getElementsByName(checkboxname);
	var objectId = objId;
	var bool = false;

	//find value service
	console.log( "objectId = " + objectId );
	query.get( objectId )
	.then( function (currentUser){
		//Parse.Cloud.useMasterKey();
		for (var i = 0 ; i < checkbox.length; i++) 
		{
		  if (checkbox[i].checked) 
		  {
		  	bool = true; 
		  	console.log( "I am here");
		  	console.log( "checkbox[i].value = " + checkbox[i].value.toString() );
		  	
		  	Parse.Cloud.run('addServiceToAnotherUser', { objectId: objId, newserviceId: checkbox[i].value, 
		  																							 packageRequest: false, packageId: " "   }, {
            success: function(status) {
            			console.log ( "i = " + i);
            			alert("Added Service(s)");
			      			$("#userinfo").empty();
            			$("#usercurrentpackage").empty();
									$("#usercurrentservice").empty();
									$("#addservicebutton").empty();
									$("#addpackagebutton").empty();
									$("#removepackagebutton").empty();
									$("#removeservicebutton").empty();
									retrieveUserInfo();
                 //location.href = "rep-customer-search.html";// the user was updated successfully
                  },
             error: function(error) {

             			alert( "User already has service ");
             		
              // error
              }
				})
				.then( function( ) 
				{

							Parse.Cloud.run('calculateBill', {flag: true, objectId: objId}, 
							{
							  success: function(status) { },
							  error: function(error){ } // error
							});//Parse.Cloud.run
							
				})

		    //currentUser.addUnique("CurrentServices",checkbox[i].value );
		  }
		}

	});




};


var addPackageToCustomer = function (checkboxname, objId)
{ 
	//create Query variable to search on DB
	//var user = Parse.Object.extend( Parse.User );
	var packages = new Parse.Object.extend ( "Package" ) ;
	var services = new Parse.Object.extend ( "Services" ) ;
	var packageQuery = new Parse.Query ( packages );
	var serviceQuery = new Parse.Query ( services );
	var query = new Parse.Query ( Parse.User );
	var checkbox  	= document.getElementsByName(checkboxname);
	var objectId = objId;
	var packageObjId = [] ;
	var bool = false;
	var duplicateflag;

	query.get(objectId).then(function ()
	{

		for (var i = 0; i < checkbox.length; i++) 
		{
		  if (checkbox[i].checked) 
		  {
		  	checkboxflag = true;
		  	//get the package object id
		  	//packageObjId.push(checkbox[i].value);

		  	Parse.Cloud.run('addPackageToAnotherUser', { objectId: objId, newpackageId: checkbox[i].value }, 
		  	{
	            success: function(status) {
	            			alert("Package(s) Added");
	 				 	        $("#userinfo").empty();
						        $("#usercurrentpackage").empty();
										$("#usercurrentservice").empty();
										$("#addservicebutton").empty();
										$("#addpackagebutton").empty();
										$("#removepackagebutton").empty();
										$("#removeservicebutton").empty();
										retrieveUserInfo();
	                 //location.href = "rep-customer-search.html";// the user was updated successfully
	                  },
	             error: function(error) {
	              // error
	             			alert( "User already has service(s) in that package");
	              }
				})
				.then( function( ) 
				{

							Parse.Cloud.run('calculateBill', {flag: true, objectId: objId}, 
							{
							  success: function(status) { },
							  error: function(error){ } // error
							});//Parse.Cloud.run
							
				});
		  }
		}

	});



}; // addPackageToCustomer()



/*
*
* Name: var delegateRemoveService = function ( checkboxname, user )
* Purpose: REPRESENTATIVE REMOVES SERVICES FOR USER
* Return NONE
 */
var delegateRemoveService = function ( checkboxname, objId )
{
	var query = new Parse.Query ( Parse.User );
	var checkbox  	= document.getElementsByName(checkboxname);
	var objectId = objId;
	var removeflag = false;

	//find value service
	query.get( objectId )
	.then( function (currentUser)
	{
			for (var i = 0, length = checkbox.length; i < length; i++) 
			{
			  if (checkbox[i].checked) 
			  {
						Parse.Cloud.run('removeNonPackageServiceFromAnotherUser', { objectId: objId, newserviceId: checkbox[i].value  }, 
						{
	            success: function(status){	

	            	alert("Removed Service(s)");
								$("#userinfo").empty();
								$("#usercurrentpackage").empty();
								$("#usercurrentservice").empty();
								$("#addservicebutton").empty();
								$("#addpackagebutton").empty();
								$("#removepackagebutton").empty();
								$("#removeservicebutton").empty();
								retrieveUserInfo();

	            },
	            error: function(error) { }
						}).then( function( ) 
						{

							Parse.Cloud.run('calculateBill', {flag: true, objectId: objId}, 
							{
							  success: function(status) { },
							  error: function(error){ } // error
							});//Parse.Cloud.run
							
						});
			  }
			}
			return currentUser;
	});
};




/*
*
* Name: var delegateRemovePackages = function ( checkboxname, user )
* Purpose: REPRESENTATIVE REMOVES SERVICES FOR USER
* Return NONE
 */
var delegateRemovePackages = function ( checkboxname, objId )
{
	var query = new Parse.Query ( Parse.User );
	var checkbox  	= document.getElementsByName(checkboxname);
	var objectId = objId;
	var removeflag = false;

	//find value service
	query.get( objectId )
	.then( function (currentUser)
	{
			for (var i = 0, length = checkbox.length; i < length; i++) 
			{
			  if (checkbox[i].checked) 
			  	
			  {
						Parse.Cloud.run('removePackageFromAnotherUser', { objectId: objId, packageId: checkbox[i].value  }, 
						{
	            success: function(status){	
	            	alert( "Package Removed" );           		            	
								$("#userinfo").empty();
								$("#usercurrentpackage").empty();
								$("#usercurrentservice").empty();
								$("#addservicebutton").empty();
								$("#addpackagebutton").empty();
								$("#removepackagebutton").empty();
								$("#removeservicebutton").empty();
								retrieveUserInfo();
	            },
	            error: function(error) { 
	            	alert( "Package DOES NOT EXSIST" );
	            }
						}).then( function( ) 
						{

							Parse.Cloud.run('calculateBill', {flag: true, objectId: objId}, 
							{
							  success: function(status) { },
							  error: function(error){ } // error
							});//Parse.Cloud.run

						});
			  }
			}
			return currentUser;
	});


};
