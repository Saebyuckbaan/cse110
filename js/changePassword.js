Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");




/*
* Name: var changePassword = function ()
* Purpose : Send password change request according to the username and email address
* Parameter: NONE
* Return: NONE
*/
var changePassword = function ()
{
	//retrive email from user
  var email     = reformatEmail ( document.getElementById("email2").value,
                                  document.getElementById("domain2").value  );
  var username  =  document.getElementById("username").value.toLowerCase();

  //create new query and its container user.
	var query = new Parse.Query(Parse.User);
	
	//find exact user information from Parse Databse
	query.equalTo ( 'email' , email );

	query.find(
	{
  	success: function( userinfo ) 
  	{
	    	// Do stuff
			  if ( userinfo[0] && ( userinfo[0].getUsername() === username ) )
				{

					Parse.User.requestPasswordReset( email , 
					{
					  success: function() {
					    // Password reset request was sent successfully
					    confirm ( "E-mail has been sent! You may change your password.")
					  },
					  error: function(error) {
					    // Show the error message somewhere
					    alert("Error: " + error.code + " " + error.message);
					  }
					});// password reset

				}//if

				else 
				{
					alert ( "Your username and email address does not match.");
				}//else

  	},// success 

  	error: function( error ) 
  	{
    	alert("Error: " + error.code + " " + error.message);
  	}//error

	}); //find

};


/*
* Name: var fundUsername = function (  )
* Purpose : Retrieve the username according to the user emain address
* Parameter: NONE
* Return: NONE
*/
var findUsername = function ( )
{
	//retrive email from user
  var email     = reformatEmail ( document.getElementById("email").value,
                                  document.getElementById("domain").value  );

  //create new query and its container user.
	var query = new Parse.Query(Parse.User);

	//find exact user information from Parse Databse
	query.equalTo ( 'email' , email );

	query.find({
  	success: function( userinfo ) {
    // Do stuff
    	confirm ( "Your username is : " + userinfo[0].getUsername() );
  	},
  	error: function( error ) {
    // Do stuff
    	alert("Error: " + error.code + " " + error.message);
  	}
	}); //find

};// find user name


