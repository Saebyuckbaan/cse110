$( document ).ready( function() {

  var jbOffset = $( '.jbMenu' ).offset();
  $( window ).scroll( function() {
    if ( $( document ).scrollTop() > jbOffset.top ) {
         $( '.jbMenu' ).addClass( 'jbFixed' );
    }
    else {
      $( '.jbMenu' ).removeClass( 'jbFixed' );
    }
  });

  if ( Parse.User.current() == null )
    $( "#signbtn" ).append( "<a href=\"signin.html\">Sign In</a>" );
  else
    $( "#signbtn" ).append( "<a href=\"javascript:signOut();\">Sign Out</a>" );
});