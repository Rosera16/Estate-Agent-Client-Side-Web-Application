$( function() {
			
			$( "#tab" ).tabs();	//tab widget
			$("button").button();	//button widget for the add to favourite list
			
			var $property = $( "#property" );
			var $favorite = $( "#favorite" );
			
			// property -> draggable
			$( "div", $property ).draggable({
				revert: "invalid", // when not dropped, the item will revert back to its initial position
				helper: "clone",
				cursor: "move"
			});
			
			// favorite -> droppable(stores favorite items)
			$favorite.droppable({
				accept: "#property > div",
				drop: function( event, ui ) {
					addFavorite( ui.draggable );
				}
			});
			
			// property -> droppable (stores the favorite items)
			$property.droppable({
				accept: "#favorite div",
				drop: function( event, ui ) {
					returnProperty( ui.draggable );
				}
			});
			
			// property adding function
			var returnIcon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Return back this property' class='ui-icon ui-icon-refresh'>Recycle image</a>";
			function addFavorite( $item ) {
				$item.fadeOut(function() {
				var $list = $( "section", $favorite ).length ?
					$( "section", $favorite ) :
					$( "<section class='property reset'/>" ).appendTo( $favorite );
					
				$item.find( "a.ui-icon-favorite" ).remove();
				$item.append( returnIcon ).appendTo( $list ).fadeIn(function() {
					$item
					.animate({ width: "48px" })
					.find( "img" )
						.animate({ height: "36px" });
				});
				});
				$favorite.find( "p" ).remove();
				$( "<p class='paragraph' style = 'color:#361f07'>*Property Added to Favourites*</p>" ).appendTo( $property );	//added when property is added to favorite
			}
			
			// property return back function
			var delIcon = "<a href='link/to/favorite/script/when/we/have/js/off' title='add favorite property' class='ui-icon ui-icon-favorite'>favorite property</a>";
			function returnProperty( $item ) {
				$item.fadeOut(function() {
					$item
						.find( "a.ui-icon-refresh" )
							.remove()
						.end()
						.css( "width", "96px")
						.append( delIcon )
						.find( "img" )
							.css( "height", "72px" )
						.end()
						.appendTo( $property )
						.fadeIn();
				});
				$( "<p class='paragraph' style = 'color:#361f07'>*Drag the property to favorites if you like*</p>" ).appendTo( $favorite );
				$property.find( ".paragraph" ).remove();//removed when property is removed
			}
			
			// when the icons are pressed
			$( "section.property > div" ).on( "click", function( event ) {
				if ( $( event.target ).is( "a.ui-icon-favorite" ) ) {
					addFavorite( $( this ) );
				} else if ( $( event.target ).is( "a.ui-icon-refresh" ) ) {
					returnProperty( $( this ) );
				}
				return false;
			});
			
} );

$(document).ready(function(){
	
			var favProperties;
			$("#fav_button").on("click", function () {	//when the add to favourite list button on property page is clicked  
				try{
			
					$(this).attr('disabled',true);
					
					//get the property id to be added to the favorite list
					var propertyToAdd = $(this).closest("p").attr("id");	
					favProperties=JSON.parse(localStorage.getItem("favProp"));
					if(favProperties==null){
						favProperties=[];
					}
					
					//add the property id to the arrays of the favorite property
					favProperties.push(propertyToAdd);	

					//add the content in the array to the local storage
					localStorage.setItem("favProp", JSON.stringify(favProperties));
					
				}catch (e) {
					
					if (e == QUOTA_EXCEEDED_ERR){
						console.log("Error:exceed")
					}
					else{
						console.log("Error:save")
					}
					
				}
					
			});
			
			$("#view_fav").on("click", function () {	//when view favorite properties button on the favorite page is clicked 
				
				console.log("Retrieving and storing data from local storage");
				
				favProperties = JSON.parse(localStorage.getItem("favProp"));
				var output="<div>";
				if(favProperties !=null){
					for (var i = 0; i < data.properties.length; i++){
						for (j=0; j< favProperties.length; j++){
							if (data.properties[i].id == favProperties[j])	// getting data of the property
							{
								output+="<section class = 'property' >" + 
								 "<br>" + "<img src=../" + data.properties[i].picture + " alt = 'favourite_img' >" + "<br>" +
								 "<ul> <li>" + data.properties[i].description + "</li>" + 
								 "<li>" + "$" +data.properties[i].price + "</li>" + 
								 "<li>" +"<a href=../" + data.properties[i].url + ">" + "click to view property" + "</a>" + "</li>" + 
								 "</ul>"+ "<br> </section>";
							}
						}
					}
				}
				output+="</div>";
				document.getElementById("favourite_placeholder").innerHTML = output;	//output is shown on the favourite page
			});
});