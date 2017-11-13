/**
 * http://usejsdoc.org/
 */
function sendDataToDatabase(){
	// stores size option selected by user

	var orderId = Math.floor((Math.random() * 10) + 1);
	var ht_elems = document.getElementsByName("ht");
	var size;
	//var i = 0;
	for (i = 0; i < ht_elems.length; i++) {
		if (ht_elems[i].checked) {  
			size = ht_elems[i].value;
		}

	}

	console.log("Size is ", size);
	// store all elements of name cheese in an array

	var cheeseElements = document.getElementsByName('cheese');
	var cheeseSelected = new Array();

	for(var i = 0; i < cheeseElements.length; i++){
		if(cheeseElements[i].checked){
			cheeseSelected.push(cheeseElements[i].value); 

		}  
	}

	console.log("Cheese is ", cheeseSelected);

	// store all elements of name sauce in an array
	var sauceElements = document.getElementsByName('sauce');
	var sauceSelection = new Array();

	for(var i = 0; i < sauceElements.length; i++){
		if(sauceElements[i].checked){
			sauceSelection.push(sauceElements[i].value); 

		}    
	}

	console.log("Sauce is ", sauceSelection); 


	// store all elements of name Meat in an array
	var meatElems = document.getElementsByName('meat');
	var meatOptions = new Array();
	for(var i = 0; i < meatElems.length; i++){
		if(meatElems[i].checked){
			meatOptions.push(meatElems[i].value); 

		}

	}
	console.log("Meat is ", meatOptions);  


	// store all elements of name Non meat in an array
	var nonMeatElems = document.getElementsByName('nonmeat');
	var nonMeatOptions = new Array();

	for(var i = 0; i < nonMeatElems.length; i++){
		if(nonMeatElems[i].checked){
			nonMeatOptions.push(nonMeatElems[i].value);
		}
	}

	console.log("NonMeat is ", nonMeatOptions);

	userSelection = {
			'orderid': orderId,
			'size': size,
			'cheese' : cheeseSelected,
			'sauce' : sauceSelection,
			'meat': meatOptions,
			'non_meat': nonMeatOptions
	};

	console.log("Gona send AJAX request");
	var post = $.ajax({
		type: "POST",
		dataType : "json",
		url: '/savedata',
		data: JSON.stringify(userSelection),
		contentType: "application/json",
		cache: false,
		timeout: 5000,
		complete: function() {
			//called when complete
			console.log('process complete');
		},
		success: function( data, textStatus, jqXHR) {
			console.log("Got response")
		},
		error: function() {
			console.log('process error');
		}
	});
	post.done(function(resp_values) {
		console.log("data: ", resp_values);
		// Draw pie chart from the response we got from the server
		draw_pie_chart(resp_values);
		// Draw sanky chart
		var sanky_chart_data = [
		                        ['Mozzerella','Salsa', 20],
		                        ['Italian Cheese', 'Pesto', 17 ],
		                        ['Italian Cheese', 'Salsa', 26 ],
		                        ['Italian Cheese', 'Ranch', 14 ],
		                        ['Italian Cheese', 'BBQ', 19 ],
		                        ['Italian Cheese', 'Pesto', 15 ],
		                        ['Blue Cheese' ,'Ranch', 6 ],
		                        ['Mozzerella' , 'Salsa', 22 ],
		                        ['Italian Cheese', 'BBQ' , 9 ],
		                        ['Blue Cheese' , 'Salsa', 25 ],
		                        ['Mozzerella' , 'Pesto', 14 ],
		                        ['Mozzerella' , 'Salsa', 8 ],
		                        ['Mozzerella' , 'Ranch', 19 ],
		                        ['Mozzerella' , 'BBQ', 6 ],
		                        ['Mozzerella' , 'Pesto', 4 ],
		                        ['Italian Cheese' ,'Ranch', 11 ],
		                        ['Blue Cheese' ,'Ranch',7 ],
		                        ['Blue Cheese' ,'Pesto',6 ],
		                        ['Blue Cheese' ,'Salsa',9 ],
		                        ['Blue Cheese' ,'BBQ',8 ],
		                        ['Mozzerella' ,'BBQ', 8 ],
		                        ['Italian Cheese' ,'BBQ', 3 ],
		                        ['Blue Cheese' ,'Salsa', 7 ],
		                        ['Salsa','Pepperoni',5],
		                        ['Salsa','Italian Sausage',15],
		                        ['Salsa','Sliced Italian Sausage',25],
		                        ['Salsa','Beef',35],
		                        ['Pesto','Pepperoni',48],
		                        ['Pesto','Italian Sausage',50],
		                        ['Pesto','Sliced Italian Sausage',7],
		                        ['Pesto','Beef',19],
		                        ['BBQ','Sliced Italian Sausage',13],
		                        ['BBQ','Italian Sausage',23],
		                        ['BBQ','Sliced Italian Sausage',37],
		                        ['BBQ','Beef',2],
		                        ['Ranch','Pepperoni',25],
		                        ['Ranch','Italian Sausage',27],
		                        ['Ranch','Sliced Italian Sausage',44],
		                        ['Ranch','Beef',30],
		                        ['Pepperoni','Garlic',25],
		                        ['Pepperoni','Black Olives',27],
		                        ['Sliced Italian Sausage','Green Peppers',44],
		                        ['Sliced Italian Sausage','Jalapeno Peppers',20],
		                        ['Beef','Onions',30],
		                        ['Beef','Garlic',25],
		                        ['Italian Sausage','Black Olives',25],
		                        ['Italian Sausage','Garlic',25]
		                        ];
		draw_sanky_chart(sanky_chart_data);
	});

	console.log("Successfully sent AJAX request");

}

//function that cancels the Selections
function cancelOptions(){

	// cancels size option selected by user
	var ht_elems = document.getElementsByName("ht");
	var size;
	var i;
	for (i = 0; i < ht_elems.length; i++) {
		if (ht_elems[i].checked) {  
			ht_elems[i].checked = false;

		}        
	}

	console.log(size,"Cancelled");

	// cancels all elements of name cheese in an array
	var cheeseElements = document.getElementsByName('cheese');
	var cheeseSelected = new Array();

	for(var i = 0; i < cheeseElements.length; i++){
		if(cheeseElements[i].checked){
			cheeseElements[i] = false; 

		}  
	}

	console.log(cheeseSelected,"Cancelled");

	//cancels all elements of name sauce in an array
	var sauceElements = document.getElementsByName('sauce');
	var sauceSelection = new Array();

	for(var i = 0; i < sauceElements.length; i++){
		if(sauceElements[i].checked){
			sauceElements[i] = false;      
		}    

	}

	console.log(sauceSelection,"Success"); 


	// cancels all elements of name Meat in an array
	var meatElems = document.getElementsByName('meat');
	var meatOptions = new Array();
	var i;
	for(var i = 0; i < meatElems.length; i++){
		if(meatElems[i].checked){
			meatElems[i] = false; 
			meatOptions.push(meatElems[i].value); 

		}

	}
	alert(meatOptions,"Cancelled");
	console.log(meatOptions,"Cancelled");  


	//cancels all elements of name Non meat in an array
	var nonMeatElems = document.getElementsByName('nonmeat');
	var nonMeatOptions = new Array();

	for(var i = 0; i < nonMeatElems.length; i++){
		if(nonMeatElems[i].checked){
			nonMeatOptions.push(nonMeatElems[i].value);
		}
	}   

}

function draw_pie_chart(resp_values){
	if(resp_values) {
		console.log("Coming here");
		// Create the data table.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Topping');
		data.addColumn('number', 'Slices');

		// Iterate over the dictionary in the resp_values and add them to rows
		for (var key in resp_values) {
			console.log(key, ":", resp_values[key]);
			data.addRow([key, resp_values[key]]);
		}

		// Set chart options
		var options = {'title':'Pizza Dashboard',
				'width':400,
				'height':300};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('pizza_chart_div'));
		chart.draw(data, options);
	}
}

function draw_sanky_chart(sanky_chart_data) {
	if(sanky_chart_data) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Pizza');
		data.addColumn('string', 'Toppings');
		data.addColumn('number', 'number');
		data.addRows([
		              ['Mozzerella','Salsa', 20],
		              ['Italian Cheese', 'Pesto', 17 ],
		              ['Italian Cheese', 'Salsa', 26 ],
		              ['Italian Cheese', 'Ranch', 14 ],
		              ['Italian Cheese', 'BBQ', 19 ],
		              ['Italian Cheese', 'Pesto', 15 ],
		              ['Blue Cheese' ,'Ranch', 6 ],
		              ['Mozzerella' , 'Salsa', 22 ],
		              ['Italian Cheese', 'BBQ' , 9 ],
		              ['Blue Cheese' , 'Salsa', 25 ],
		              ['Mozzerella' , 'Pesto', 14 ],
		              ['Mozzerella' , 'Salsa', 8 ],
		              ['Mozzerella' , 'Ranch', 19 ],
		              ['Mozzerella' , 'BBQ', 6 ],
		              ['Mozzerella' , 'Pesto', 4 ],
		              ['Italian Cheese' ,'Ranch', 11 ],
		              ['Blue Cheese' ,'Ranch',7 ],
		              ['Blue Cheese' ,'Pesto',6 ],
		              ['Blue Cheese' ,'Salsa',9 ],
		              ['Blue Cheese' ,'BBQ',8 ],
		              ['Mozzerella' ,'BBQ', 8 ],
		              ['Italian Cheese' ,'BBQ', 3 ],
		              ['Blue Cheese' ,'Salsa', 7 ],
		              ['Salsa','Pepperoni',5],
		              ['Salsa','Italian Sausage',15],
		              ['Salsa','Sliced Italian Sausage',25],
		              ['Salsa','Beef',35],
		              ['Pesto','Pepperoni',48],
		              ['Pesto','Italian Sausage',50],
		              ['Pesto','Sliced Italian Sausage',7],
		              ['Pesto','Beef',19],
		              ['BBQ','Sliced Italian Sausage',13],
		              ['BBQ','Italian Sausage',23],
		              ['BBQ','Sliced Italian Sausage',37],
		              ['BBQ','Beef',2],
		              ['Ranch','Pepperoni',25],
		              ['Ranch','Italian Sausage',27],
		              ['Ranch','Sliced Italian Sausage',44],
		              ['Ranch','Beef',30],
		              ['Pepperoni','Garlic',25],
		              ['Pepperoni','Black Olives',27],
		              ['Sliced Italian Sausage','Green Peppers',44],
		              ['Sliced Italian Sausage','Jalapeno Peppers',20],
		              ['Beef','Onions',30],
		              ['Beef','Garlic',25],
		              ['Italian Sausage','Black Olives',25],
		              ['Italian Sausage','Garlic',25]
		              ]);

		// Sets chart options.
		var options = {
				'title':'Sanky Chart',
				width: 600,
		};

		// Instantiates and draws our chart, passing in some options.
		var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
		chart.draw(data, options);
	}
}
