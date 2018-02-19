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
    user.set( "address"   , document.getElementById("address").value);
    user.set( "state"     , document.getElementById("state").value);
    user.set( "city"      , document.getElementById("city").value);
    user.set( "zipcode"   , Number( document.getElementById("zip").value ) );
    user.set( "lastfourssn", Number( document.getElementById("SSN3").value ));
    user.set( "loginattempt"    , 0 );
    user.set( "role"      , "user" );
    user.set( "CurrentServices" , [] );
    user.set( "CurrentPackages" , [] );
    user.set( "terminationFee" , [] );
    user.set( "threshold" , 0 );
    user.set( "Bill" , 0 );
    user.set( "contract" , false );
    user.set( "threshold", -1 );

    functionflag = user.signUp(null, 
    {
      success: function(user) 
      {
        // Hooray! Let them use the app now.
        confirm ( "You are registered!");
        window.location.replace("signin.html");
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


  return functionflag;
}; // signUp()




//signUp2
var signUp2 = function ()
{
  //initialize variables using each re-formatter 

  var company = document.getElementById("company").value;

  var bphone = reformatPhoneNum(  document.getElementById("bareacode").value,
                                  document.getElementById("bphonemid").value,
                                  document.getElementById("bphoneend").value );

  var baddress = document.getElementById("baddress").value;

  var bcity = document.getElementById("bcity").value;

  var bstate = document.getElementById("bstate").value;

  var bzip = Number( document.getElementById("bzip").value )
  




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


  var functionflag = false;

 
  //if the password meets the password policy  
  if ( passwordPolicy ( password ) )
  {

    var user = new Parse.User();

    // Set the data into one object
    user.set( "company", company );
    user.set( "bphone", bphone );
    user.set( "baddress", baddress );
    user.set( "bcity", bcity );
    user.set( "bstate", bstate );
    user.set( "bzip", bzip );

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
    user.set( "address"   , document.getElementById("address").value);
    user.set( "state"     , document.getElementById("state").value);
    user.set( "city"      , document.getElementById("city").value);
    user.set( "zipcode"   , Number( document.getElementById("zip").value ) );
    user.set( "lastfourssn", Number( document.getElementById("SSN3").value ));
    user.set( "loginattempt"    , 0 );
    user.set( "role"      , "comUser" );
    user.set( "CurrentServices" , [] );
    user.set( "CurrentPackages" , [] );
    user.set( "terminationFee" , [] );
    user.set( "threshold" , 0 );
    user.set( "Bill" , 0 );
    user.set( "contract" , false );
    user.set( "threshold", -1 );

    functionflag = user.signUp(null, 
    {
      success: function(user) 
      {
        // Hooray! Let them use the app now.
        confirm ( "You are registered!");
        window.location.replace("signin.html");
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


  return functionflag;
}; // signUp2()

var getAccountType = function()
{
  var currentUser = Parse.User.current();
  if(currentUser.get("role") == "comUser")
    return "Commercial Customer";
  else if(currentUser.get("role") == "user")
    return "Retail Customer";
  else if(currentUser.get("role") == "mr")
    return "Marketing Representative";
  else if(currentUser.get("role") == "cr")
    return "Customer Representative";
} // getAccountType()

