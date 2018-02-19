Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");


/*
* Name: var currentUserStatus = function ( permittedUser )
* Purpose : 1) check current user is valid user for webpage
* 					2) redirect to login if not
* Parameter: permittedUser = the status of user that 
* 													 permitted to correspond page
* Return: NONE
*/
var currentUserStatus = function ( permittedUser )
{
	var currentUser = Parse.User.current();


	if ( currentUser  && ( permittedUser != currentUser.get("role") ) )
	{
		alert( "You are not permitted on this page");
		Parse.User.logOut();
		window.location.href = "signin.html";
		return false;
	}

	return true;

};


