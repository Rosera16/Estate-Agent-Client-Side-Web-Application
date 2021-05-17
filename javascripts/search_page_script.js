var output="<ul>";
$(document).ready(function(){
	
	$(".TYPE").checkboxradio();	//checkboxradio widget for type of property
	$("#slider-range").slider({	//slider widget for price of the property
		range: true,
		min: 0,
		max: 700000,
		values: [ 100000, 200000 ],
		slide: function( event, ui ) {
		$( "#PRICE" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$("#PRICE").val( "$" + $( "#slider-range" ).slider( "values", 0 ) +" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	$(".BEDROOMS").selectmenu(); //selectmenu widget for no.of bedrooms of property
	$("#DATE_ADDED").datepicker({ //datepicker widget for date added of property
		changeMonth: true,
		changeYear: true
	});
	$('#DATE_ADDED').datepicker().datepicker('setDate', 'today'); //set current date as initial value of datepicker widget  
	$("button").button();	//button widget to submit form 
	
	$( "#search" ).click( function( event ) {	//when the search button of the form is clicked
		
		var userType=$(".TYPE").val();	//get type of property choosen
		var userMinPrice=$( "#slider-range" ).slider( "values", 0 );	//get min price of property choosen
		var userMaxPrice=$( "#slider-range" ).slider( "values", 1 );	//get max price of property choosen
		var userMinBedrooms=$("#BEDROOMS_MIN").val();	//get min no.of bedrooms of the property choosen
		var userMaxBedrooms=$("#BEDROOMS_MAX").val();	//get max no.of bedrooms of the property choosen
		
		var date = $("#DATE_ADDED").datepicker('getDate');	//get date of property choosen
		var userDay = date.getDate();	//get day of the date choosen
		var userMonth = date.toLocaleString('default', { month: 'long' });	//get month of the date choosen
		var userYear = date.getFullYear();	//get year of the date choosen
		
		var found = "false";	//boolean variable initialised as property not found at the beginning of the search
		
		var output="<div>";
		for (var i in data.properties) {
			
			if( ( (userType == data.properties[i].type) || (userType == "Any") )&&
				 ((userMinPrice <= data.properties[i].price)&& (userMaxPrice >= data.properties[i].price))&&
				 (userMinBedrooms <= userMaxBedrooms) &&
				 ((userMinBedrooms <= data.properties[i].bedrooms) && (userMaxBedrooms >= data.properties[i].bedrooms)) &&
				 (userDay == data.properties[i].added.day) && (userMonth == data.properties[i].added.month) && (userYear == data.properties[i].added.year)){
				 
				 found = "true";
				 
				 //happens if property is found 
				 output+="<section class = 'property' >" + 
						 "<br>" + "<img src=" + data.properties[i].picture + " alt = 'property_img' >" + "<br>" +
						 "<ul> <li>" + data.properties[i].description + "</li>" + 
						 "<li>" + "$" +data.properties[i].price + "</li>" + 
						 "<li>" +"<a href=" + data.properties[i].url + ">" + data.properties[i].url + "</a>" + "</li>" + 
						 "</ul>"+ "<br> </section>";
			}
		}
		
		//happens if property is not found 
		if (found == "false"){
				output+="<section class = 'property' style = 'text-align : center'> <p> NO PROPERTIES AVILABLE FOR THE DETAILS YOU CHOOSED!!! </p> </section>";	
				alert("NO PROPERTIES AVILABLE FOR THE DETAILS YOU CHOOSED!!!");
		}
				
		output+="</div>";
		document.getElementById("placeholder").innerHTML=output;	//result is shown on the search page
		
	});	
});