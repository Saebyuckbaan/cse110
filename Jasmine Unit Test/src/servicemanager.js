Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

var addServices = function ( checkboxname, user )
{
	var checkbox  	= document.getElementsByName(checkboxname);

	if ( typeof user !== "undefined" )
	{
		var currentUser = user;
		
		for (var i = 0, length = checkbox.length; i < length; i++) 
		{
		    if (checkbox[i].checked) 
		    {
		      currentUser.addUnique("CurrentServices",checkbox[i].value );
			  	
		    }
		}
		alert (" Service(s) added");
		currentUser.save();
	}
	else
	{
		var currentUser = Parse.User.current();

		currentUser.fetch();
		if (currentUser) 
		{
		    // do stuff with the user
		  for (var i = 0, length = checkbox.length; i < length; i++) 
			{
		    if (checkbox[i].checked) 
		    {
		      currentUser.addUnique("CurrentServices",checkbox[i].value );
		    }
			}
			currentUser.save();
			Parse.User.current().fetch().then( function (currentUser) {
			//location.href = "myaccount.html";
			//location.reload();
			});
		} 
		else 
		{
		    // show the signup or login page
		    alert( "Please Log in First" );
		}
	}

	return true;
};




var removeService = function ( checkboxname, user )
{
	var checkbox  	= document.getElementsByName(checkboxname);

	if ( typeof user !== "undefined" )
	{
		var currentUser = user;
		
		for (var i = 0, length = checkbox.length; i < length; i++) 
		{
		    if (checkbox[i].checked) 
		    {
		      currentUser.remove("CurrentServices",checkbox[i].value );
			  	
		    }
		}
		alert (" Service(s) removed");
		currentUser.save();
	}
	else
	{
		var currentUser = Parse.User.current();

		currentUser.fetch();
		if (currentUser) 
		{
		    // do stuff with the user
		  for (var i = 0, length = checkbox.length; i < length; i++) 
			{
		    if (checkbox[i].checked) 
		    {
		      currentUser.remove("CurrentServices",checkbox[i].value );
			  	
		    }
			}
			currentUser.save();
			Parse.User.current().fetch().then( function (currentUser) {
			//location.href = "myaccount.html";
			//location.reload();
			});
		} 
		else 
		{
		    // show the signup or login page
		    alert( "Please Log in First" );
		}
	}
	return true;
};



