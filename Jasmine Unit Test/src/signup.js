//Sync with Parse DB
Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");
    


/*
*   Name: signUp ()
*   Purpose: Sign up the user into Parse Database correctly.
*   Parameter: NONE
*   Return: NONE
*/
var signUp = function ()
{
  var username  =  ("User1234").toLowerCase();
   
  var firstname = reformatName ( "user" );

  var lastname  = reformatName ( "lastname" ) ;
  
  var password  = "123MANDdas"; 

  var ssn       = reformatSSN( "123", "45", "1234"); //ssn

  var phone     = reformatPhoneNum( "123", "123", "1234");//phonenumber


  var dob       = reformatDOB(  "1", "3", "1990"   ); //dob


  var email     = reformatEmail ( "man", "domain.com" );

  var gender    = "M";
  /*
  //initialize variables using each re-formatter 
  var username  =  document.getElementById("username").value.toLowerCase();
   
  var firstname = reformatName ( document.getElementById( "firstname" ).value );

  var lastname  = reformatName ( document.getElementById("lastname").value ) ;
  
  var password  = document.getElementById("password").value; 

  var ssn       = reformatSSN( document.getElementById("SSN1").value,
                               document.getElementById("SSN2").value,
                               document.getElementById("SSN3").value ); //ssn

  var phone     = reformatPhoneNum( document.getElementById("areacode").value,
                                    document.getElementById("phonemid").value,
                                    document.getElementById("phoneend").value );//phonenumber


  var dob       = reformatDOB(  document.getElementById("dobmo").value,
                                document.getElementById("dobdate").value,
                                document.getElementById("dobyr").value    ); //dob


  var email     = reformatEmail ( document.getElementById("email").value,
                                  document.getElementById("domain").value  );

  var gender    = setGender( "gender" );
  */

  var functionflag = false;

 
  //if the password meets the password policy  
  if ( passwordPolicy ( password ) )
  {

    var user = new Parse.User();

    // Set the data into one object
    user.set( "username"  , username );
    user.set( "password"  , password );
    user.set( "firstname" , firstname );
    user.set( "lastname"  , lastname );
    user.set( "birthday"  , dob);
    user.set( "email"     , email );
    user.set( "ssn"       , ssn );
    user.set( "phone"     , phone );
    user.set( "active"    , true );
    user.set( "gender"    , gender);
    user.set( "address"   , "1234 Gilman Drive");
    user.set( "state"     , "CA");
    user.set( "city"      , "Los Angeles");
    user.set( "zipcode"   , Number( "92122" ) );
    user.set( "lastfourssn", Number( "1234" ));
    user.set( "loginattempt"    , 0 );
    user.set( "CurrentServices" , [] );

    functionflag = user.signUp(null, 
    {
      success: function(user) 
      {
        // Hooray! Let them use the app now.
        confirm ( "You are registered!");
        //window.location.replace("signin.html");
        return true;
      },
      error: function(user, error) 
      {
        // Show the error message somewhere and let the user try again.
        //alert("Error: " + error.code + " " + error.message);
        confirm("Error: " + error.message);
        return false;
      }
    });// user.signUp

  }//if passwordPolicy meet

  //if the password does not match with the confirmation
  else if ( document.getElementById('password').value != document.getElementById('confirmpassword').value )
  {
    //print error message and reset the password textfield;
    confirm ("Your password does not match");  
    document.getElementById('password').value='';
    document.getElementById('confirmpassword').value='';
  } // else if ( password != confirmpassword)

  //if the password policy does not meet
  else if ( !passwordPolicy (document.getElementById("password").value))
  {
    //print error message and reset the password textfield;
    confirm ("Your password must have at least 1 lowercase and uppercase characters, and 1 letter");  
    document.getElementById('password').value='';
    document.getElementById('confirmpassword').value='';
  }// else if passwordPolicy does not meet


  return false;
}; // signUp()

