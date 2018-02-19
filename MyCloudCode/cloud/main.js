
Parse.Cloud.define("addUniqueService", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.

  var currentUser = request.user;
  var serviceObject =request.params.obj;
  var userCurrentServices = currentUser.get( "CurrentServices" );
  var duplicateFlag = false;

  console.log( "serviceId = " + serviceObject.serviceId );


  for ( var index = 0 ; index < userCurrentServices.length ; index ++ )
  {
    if ( userCurrentServices[index].serviceId == (serviceObject).serviceId )
    {
      duplicateFlag = true;
    }
  }

  if ( !duplicateFlag )
  {
    console.log( "duplicateFlag = " + duplicateFlag );
    currentUser.add( "CurrentServices", serviceObject );
    currentUser.save();
  }

 // Save the user.
 currentUser.save(null, 
 {
    success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
    },
    error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
    }
  });


});


Parse.Cloud.define("removeNonPackageService", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.

  var currentUser = request.user;
  var objectid = request.params.Id;
  var userCurrentServices = currentUser.get( "CurrentServices" );
  var packageFlag = false;
  var exsistFlag = false;


  for ( var index = 0 ; index < userCurrentServices.length ; index ++ )
  {
    if ( objectid == userCurrentServices[index].serviceId )
    {
      exsistFlag = true;

      if ( (userCurrentServices[index]).isServicePackage == false)
      {
        currentUser.remove( "CurrentServices", userCurrentServices[index] );
        currentUser.save();
        break;
      }
      else
      {
        packageFlag = true;
      }
    }
  }

  if ( !exsistFlag )
  {
    alert( "Service does not exist ");
  }
  else if ( packageFlag )
  {
    alert( "Service is currently part of package. Please contacto customer representative ");
  }

 // Save the user.
 currentUser.save(null, 
 {
    success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
    },
    error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
    }
  });


});




/////////------- upper part is self services -----------/////



Parse.Cloud.define("removeNonPackageServiceFromAnotherUser", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.

  var query = new Parse.Query( Parse.User );
  var objectid = request.params.newserviceId;
  var userCurrentServices;
  var packageFlag = false;
  var exsistFlag = false;


  query.get( request.params.objectId,{
    success: function(anotherUser) 
    {
      userCurrentServices = anotherUser.get( "CurrentServices" );

      for ( var index = 0 ; index < userCurrentServices.length ; index ++ )
      {
        if ( objectid == userCurrentServices[index].serviceId )
        {
          exsistFlag = true;

          if ( (userCurrentServices[index]).isServicePackage == false)
          {
            anotherUser.remove( "CurrentServices", userCurrentServices[index] );
            anotherUser.save();
            break;
          }
          else
          {
            packageFlag = true;
          }
        }
      }

      if ( !exsistFlag )
      {
        alert( "Service does not exist ");
      }
      else if ( packageFlag )
      {
        alert( "Service is currently part of package. Please contacto customer representative ");
      }

      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function( error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });

    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });


});



// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("addServiceToAnotherUser", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.
  var packageRequest = request.params.packageRequest;
  var packageId = request.params.packageId;
  var query = new Parse.Query( Parse.User );
  var services = Parse.Object.extend( "Services" );
  var serviceQuery = new Parse.Query ( services );
  var serviceObject = new Object();
  //query.equalTo("objectId", request.params.objectId);

  // Get the first user which matches the above constraints.
  query.get( request.params.objectId,{
    success: function(anotherUser) {

      // Successfully retrieved the user.
      // Modify any parameters as you see fit.
      // You can use request.params to pass specific
      // keys and values you might want to change about
      // this user.
      serviceQuery.get( request.params.newserviceId )
      .then( function ( newservice ) 
      {

        if( packageRequest )
        {
          serviceObject = {
                          serviceId: newservice.id,
                          serviceName: newservice.get("name"),
                          serviceCost: newservice.get("price"),
                          serviceActive: newservice.get("active"),
                          isServicePackage: true,
                          packageRelatedTo: packageId
                        };
        }
        else
        {
          serviceObject = {
                          serviceId: newservice.id,
                          serviceName: newservice.get("name"),
                          serviceCost: newservice.get("price"),
                          serviceActive: newservice.get("active"),
                          isServicePackage: false
                        };
        }

      }).then(function () 
      {
        var duplicateFlag = false;
        var userCurrentServices = anotherUser.get( "CurrentServices" );
        for ( var index = 0 ; index < userCurrentServices.length ; index ++ )
        {
          if ( userCurrentServices[index].serviceId == (serviceObject).serviceId )
          {
            duplicateFlag = true;
          }
        }

        if ( !duplicateFlag )
        {
          anotherUser.add( "CurrentServices", serviceObject );
          anotherUser.save();
          return response.success("Successfully Added");
        }
        else
        {
          return response.error("User already has service(s)");
        }

      }); // serviceQuery.get( request.params.newserviceId )

    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });
});



Parse.Cloud.define("addPackageToAnotherUser", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.
  var newpackageId = request.params.newpackageId;
  var query = new Parse.Query( Parse.User );
  var userCurrentPackages;
  var userCurrentServices;

  var services = Parse.Object.extend( "Services" );
  var serviceQuery = new Parse.Query ( services );
  var serviceFlag = false;
  var serviceInNewPackage;

  var packages = Parse.Object.extend( "Package" );
  var packageQuery = new Parse.Query ( packages );
  var packageObject = new Object();
  var packageFlag = false;

  var packageAdded = false;

  //query.equalTo("objectId", request.params.objectId);

  // Get the first user which matches the above constraints.
  query.get( request.params.objectId,
  {
    success: function(anotherUser) {

      userCurrentServices = anotherUser.get( "CurrentServices" );
      userCurrentPackages = anotherUser.get( "CurrentPackages" );

      //NO DUPLICATE PACKAGES
      for ( var packindex = 0; packindex < userCurrentPackages.length ; packindex++ )
      {
        if ( newpackageId == userCurrentPackages[packindex].packageId )
        {
          packageFlag = true;
          return Parse.Promise.error("User already has package");
        }
      }

      //IF PACKAGE IS  UNIQUE
      if ( packageFlag == false )
      {
        packageQuery.get( newpackageId,
        {
          success: function( newPackage ) 
          {
            //retrieve services
            serviceInNewPackage =  newPackage.get( "Services" );
            
            //Compare services in package to current user's services
            for ( var currservicesindex = 0; currservicesindex < userCurrentServices.length ; currservicesindex++ )
            {
              ///loop through package service
              for ( var newservicesindex = 0; newservicesindex < serviceInNewPackage.length ; newservicesindex++ )
              {
                //compare object id.
                if ( serviceInNewPackage[newservicesindex] == userCurrentServices[currservicesindex].serviceId )
                {
                  serviceFlag = true;
                  return Parse.Promise.error("User already has service");
                }//( serviceInNewPackage[newservicesindex] == userCurrentServices[currservicesindex].serviceId )
              }//for ( var newservicesindex = 0; newservicesindex < serviceInNewPackage.length ; newservicesindex++ )
            }//for ( var currservicesindex = 0; currservicesindex < userCurrentServices.length ; currservicesindex++ )

            return newPackage;
          },//success
          error: function(error) 
          {
            response.error("Could not find package");
          }

        })
        .then ( function( newPackage ) 
        {
          if ( !packageFlag && !serviceFlag )
          {
            //retrieve services
            serviceInNewPackage =  newPackage.get( "Services" );
            packageObject = { 
                              packageId: newPackage.id,
                              packageName: newPackage.get( "Name"),
                              packagePrice: newPackage.get( "Price"),
                              packageStartDate: Date()
                            };

            anotherUser.add( "CurrentPackages", packageObject );         
            anotherUser.save();


            for ( var newservicesindex = 0; newservicesindex < serviceInNewPackage.length ; newservicesindex++ )
            {
              callAddService( request.params.objectId, serviceInNewPackage[newservicesindex], newPackage.id );
            }//for ( var newservicesindex = 0; newservicesindex < serviceInNewPackage.length ; newservicesindex++ )
            anotherUser.save();
            packageAdded = true;
          }


          if ( packageAdded )
          {
            return response.success();
          }
          else
          {
            return response.error();
          }

        }); //End of packageQuery.get( newpackageId,


      }
/*
      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function(gameScore, error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });*/


    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });
});


var callAddService = function ( objId, serviceId, packId )
{
  Parse.Cloud.run('addServiceToAnotherUser', { objectId: objId, newserviceId: serviceId, 
                                               packageRequest: true, packageId: packId }, 
  {
    success: function(status){},
    error: function(error) 
    {
              // error
    }
  });


};


Parse.Cloud.define("removePackageFromAnotherUser", function(request, response) {
  // The rest of the function operates on the assumption that request.user is *authorized*
  Parse.Cloud.useMasterKey();

  // Query for the user to be modified by username
  // The username is passed to the Cloud Function in a 
  // key named "username". You can search by email or
  // user id instead depending on your use case.
/*
  var query = new Parse.Query( Parse.User );
  //query.equalTo("objectId", request.params.objectId);

  // Get the first user which matches the above constraints.
  query.get( request.params.objectId,
  {
    success: function( anotherUser ) {


      //TODO: 1) Retreve Package Info that passed to this function
      //      2) Compare today's date and package starting date.
      //      3) Ask users to comnfirm their early termination fee
      //      2) Retrieve all Services related to this packages and Remove them.
      //      3) Retrieve package from user.
     

    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });*/



  var query = new Parse.Query( Parse.User );
  var user = request.params.objectId;
  var packId = request.params.packageId;
  var userCurrentPackages;
  var userCurrentServices;
  var packageFlag = false;
  var serviceFlag = false;


  query.get( user,{
    success: function(anotherUser) 
    {
      userCurrentPackages = anotherUser.get( "CurrentPackages" );
      userCurrentServices = anotherUser.get( "CurrentServices" );

      for ( var packageindex = 0 ; packageindex < userCurrentPackages.length ; packageindex++ )
      {
        //if the package id matches
        if ( userCurrentPackages[packageindex].packageId == packId )
        {
          //remove package
          anotherUser.remove( "CurrentPackages",  userCurrentPackages[packageindex] );
          //anotherUser.save();
          packageFlag = true;
        }
      }


      if ( packageFlag )
      {
        for ( var serviceindex = 0 ; serviceindex < userCurrentServices.length ; serviceindex ++ )
        {
          if ( packId.toString() == userCurrentServices[serviceindex].packageRelatedTo )
          {
            anotherUser.remove( "CurrentServices", userCurrentServices[serviceindex] );
            //anotherUser.save();
            serviceFlag = true;
          }
        }

      }// if ( packageFlag )



      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated user.");
        },
        error: function( error) {
          // The save failed.
          // error is a Parse.Error with an error code and description.
          response.error("Could not save changes to user.");
        }
      });

      if ( !packageFlag )
      {
        return response.error();
      }
      else
      {
        return response.success();
      }

    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });


});
