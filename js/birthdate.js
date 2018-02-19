/***********************************************
* Drop Down Date select script- by JavaScriptKit.com
* This notice MUST stay intact for use
* Visit JavaScript Kit at http://www.javascriptkit.com/ for this script and more
* WARNING -------------------------------------------------------!-
* This javascript has been modified by *bdhacker* for real life use
* ishafiul@gmail.com
* http://bdhacker.wordpress.com
***********************************************/
function date_populate(dayfield, monthfield, yearfield){
    var today=new Date();
    var dayfield=document.getElementById(dayfield)
    var monthfield=document.getElementById(monthfield)
    var yearfield=document.getElementById(yearfield)
    for (var i=0; i<31; i++)
        dayfield.options[i]=new Option(i+1, i+1)
   
    for (var m=0; m<12; m++)
        monthfield.options[m]=new Option(m+1, m+1);
  
    var thisyear=today.getFullYear()
    for (var y=0; y<100; y++){
        yearfield.options[y]=new Option(thisyear, thisyear)
        thisyear-=1
    }
}


