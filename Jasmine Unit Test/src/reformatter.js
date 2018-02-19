Parse.initialize("QKtdBDbAUs7s8sTutviIQr2jWm0UpCZmJKyVwbhB", "5qyNdLnKtVZzi5jbDvRXFZbdvZo1a4jTZNs7aatX");


/*
* Name: reFormatName ( nameofuser ) 
* Purpose : reformat users' name first letter capitalized, and rest of them lowercase
* Parameter: string nameofuser
* Return: string reFormatName
*/
var reformatName = function( nameofuser )
{
  //create empty array
  var temp = [];

  //while the name string has elements
  for ( var index = 0; index < nameofuser.length ; index++ )
  {
    //first character converts into uppercase
    if ( index == 0 )
    {
      temp.push( nameofuser[ index ].toUpperCase() );
    }
     //other characters will be lowered.
    else
    {
      temp.push( nameofuser[ index ].toLowerCase() );
    }
           
  }

  //Merge all arrays into one string and return it.
  return temp.join("");
};//reFormatName



/*
* Name: SSN ( SSN1, SSN2, SSN3 ) 
* Purpose : Create one complete SSN from SSN1-SSN2-SSN3 from user input.
*           Also check if SSN is correct
* Parameter: string SSN1 - first 3 digits
*           ,       SSN2 - second 2 digits
*           ,       SSN3 - last 3 digits
* Return: temp.join("") - if SSN meets its policy, return SSN
*         false - if SSN input is incorrect
*/
var reformatSSN = function ( SSN1, SSN2, SSN3 )
{
  var temp = ( SSN1 + SSN2 + SSN3 );

  //if the SSN is below 9, something is wrong.
  if ( temp.length != 9 )
    return false;



  return Number( temp );
  
}; // SSN



/*
* Name: var phonenumber ( area, mid, last )
* Purpose : get phone number correctly together
* Parameter: area - area code
*            mid - 3 digit in the middle
*            last - last 4 digit
* Return: false - if phone number is not correct
*         temp.join("") - if phone number has 10 digit
*/
var reformatPhoneNum = function( area, mid, last )
{

  var temp = ( area + "-" + mid + "-" + last );
  //if the SSN is below 9, something is wrong.
  if ( temp.length != 12 )
    return false;


  return temp;
};



/*
* Name: dateOfBirth ( month, day, year )
* Purpose : to integrate information into mm/dd/year
* Parameter: month - month
*            day - day
*            year - year
* Return: false - if it is not correct
*         temp.join("") - if it  has 10 digit
*/
var reformatDOB = function ( month, day, year )
{
  //if user input is 1/dd/yyyy convert to 01/dd/yyyy
  if ( ( Number ( month )  < 10 ) && ( month.length < 2 ) )
    month = "0" + month;

  //if user input is mm/1/yyyy convert to mm/1/yyyy
  if ( ( Number ( day )  < 10 ) && ( day.length < 2 ) )
    day = "0" + day;

  var temp = ( month + "-" + day + "-" + year );
  //if the SSN is below 9, something is wrong.
  if ( temp.length != 10 )
    return false;


  return new Date( temp );

};




/*
* Name: var emailReFormat = function ( username , domain )
* Purpose : to modify user email input to lowercase and add @ between
*           domain and username
* Parameter: username - username of email
*            domain - mail service
* Return: return temp.join(""); - completed email address.
*/
var reformatEmail = function ( username , domain )
{

  var temp = ( username.toLowerCase() + "@" + domain.toLowerCase() );

  return temp;
};



/*
* Name: var setGender = function ( genderRadio )
* Purpose : to get gender from radio button, and set it.
* Parameter: genderRadio - gender radio name
* Return: return temp.join(""); - completed email address.
*/
var setGender = function ( radioname )
{
    var elements = document.getElementsByName(radioname);

    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
};



/*
* Name: passwordPolicy ( password ) 
* Purpose : check if password contains at least 1 uppercase and lowercase characters
*           and 1 number.
* Parameter: string password
* Return: true - if password meets password policy
*         false - if password does not meet password policy
*/
var passwordPolicy = function ( password )
{
 //create empty array
  var uppercount = 0;
  var lowercount = 0;
  var charcount = 0;
  var numcount = 0;

  //while the name string has elements
  for ( var index = 0; index < password.length ; index++ )
  {
    // if the current index in password is character 
    if ( isNaN( parseInt( password[ index ] ) ) )
    {
      //count character
      charcount++;

      //if current character is uppercase
      if ( password[ index ]=== password[ index ].toUpperCase() )
      {
        uppercount++;
      }
      //if current character is lowercase
      else
      {
        lowercount++;
      } 
    }
    else // if current index in password is number
    {
      numcount++;
    }
  } // for ( )
  
  //if password has one letter, one uppercase, one lowercase, one number
  if ( ( numcount > 0 ) && ( charcount > 0) && ( uppercount > 0 ) && ( lowercount > 0 ) )
  {
    return true;
  }
  else
    return false;           

}; // end of passwordPolicy

