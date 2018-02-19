Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");

/*
* Name: var signIn = function ()
* Purpose : 1) obtain username and password
*						2) Log in
*						3) redirect to home.html
* Parameter: NONE
* Return: NONE
*/
var signIn = function ()
{
	//obtain username and password. 
	var username  =		document.getElementById("username").value.toLowerCase();
	var password  = 	document.getElementById("password").value; 


	//user logIn method to log in
	Parse.User.logIn( username , password, 
	{
	  success: function(user) 
	  {
	    //confirm user has been logged in and redirect to home page
	    confirm ( "you are successfully logged in");
	    window.location.href = "home.html";
	  },
	  error: function(user, error) 
	  {
	  	alert("Error: " + error.code + " " + error.message);
	    // The login failed. Check error to see why.
	  }
	});	

};

/*
* Name: var signOut = function ()
* Purpose : logout user from this device
* Parameter: NONE
* Return: NONE
*/
var signOut = function ()
{
	//if ( Parse.User.current() != null )
	Parse.User.logOut();
	var currentUser = Parse.User.current();  // this will now be null
	alert ("You are successfully logged out!");
	window.location.replace("signIn.html");
};