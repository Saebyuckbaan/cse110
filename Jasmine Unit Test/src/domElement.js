
var checkbox = function ( value, checkboxname )
{
	var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", checkboxname );
  checkbox.setAttribute("value", value);
  return checkbox;
};