function getdata()
{
	var city_name;
	var weather;
	city_name = document.getElementById("city").value;
	var apistart = "http://api.openweathermap.org/data/2.5/forecast?q=";
	var units = '&units=' + getunits();
	var apkey = "&APPID=fdd1908dfdd36efbfff64c7bb3761f9e";
	var mod = "&mode=xml";
	var url = apistart + city_name + apkey + units + mod;
	console.log(url);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			myFunction(this);
		}
		else if(this.readyState == 4 && this.status == 404)
		{
			a = document.getElementById("info");
			a.innerHTML = "<img style='width:200px; height:200px; border-radius:25%;' src='https://img.dog-learn.com/dog-breeds/pug/pug-puppy-i14-sz6.jpg'>";
			a.innerHTML += '<h3> Wrong City Name  </h3>';
		}
		else 
		{
		 document.getElementById("info").innerHTML = "<div class='loader' style='left:43%; position:fixed; align:center;'> </div>";
		}	
	};
  xhttp.open("GET", url, true);
  xhttp.send();
}
function myFunction(xml) 
{
	var units = document.getElementsByClassName('dropdown-toggle')[0].text;
	var i;
	var xmlDoc = xml.responseXML;
	console.log(xmlDoc);
	var table="<table class='table'> <thead class='thead-dark'> <tr> <th>Date</th> <th>TIME</th>  <th>TEMPERATURE"
		table+='<br>(' + units+ ") </th>  <th>HUMIDITY<br>(%)</th>";
		table+="<th>Cloudiness</th>  <th>Pressure (in hPa)</th> </tr> </thead>";
	var x = xmlDoc.getElementsByTagName("time");
	for (i = 0; i<x.length; i++)	  
	{ 
		timebegin = x[i].getAttribute('from');  						//date and time
		var array = timebegin.split("T");
		var date = array[0];
		var time = array[1];
		var hours = time.split(":");
		var hrs=hours[0];
		var session="A.M.";
		var array =date.split("-");
		var year =array[0];
		var month=array[1];
		var day=array[2];
		var newdate = day + "/" + month + "/" + year;
		
		if(hrs == 12){
			session="P.M.";
		}			
		else if(hrs > 12){
				session="P.M.";
				hrs=hrs-12;
				hrs = '0' + String(hrs);
			}
		var temp = x[i].getElementsByTagName("temperature");
		  for (j = 0; j < temp.length; j++) { 
				tempvalue = temp[j].getAttribute('value') ;
				}
		
		var humid = x[i].getElementsByTagName("humidity");
			for (j = 0; j < humid.length; j++) { 
				humidvalue = humid[j].getAttribute('value') ;
				}
		
		var pressure = x[i].getElementsByTagName("pressure");
			for (j = 0; j < pressure.length; j++) { 
				pressurevalue = pressure[j].getAttribute('value') ;
				}
		
		var cloud = x[i].getElementsByTagName("clouds");
			for (j = 0; j < cloud.length; j++) { 
				cloudvalue = cloud[j].getAttribute('value') ;
				}
	table += "<tr><td>" + newdate + "</td><td>" + hrs + "&nbsp;" + session + "</td><td>" + tempvalue + "</td><td>" + humidvalue + "</td><td>" 
	table += cloudvalue + "</td><td>" + pressurevalue +"</td></tr>";
	}
	table+="</table>";
	information = '<h3>You searched for ' + document.getElementById("city").value + '</h3><br>' + table;
	document.getElementById("info").innerHTML = information;
}

function getunits()
{
	val = document.getElementsByClassName('dropdown-toggle')[0].text;
	if(val == 'Kelvin')
		units = '';
	else if(val == 'Celsius')
		units = 'metric';
	else
		units = 'imperial';

	return units;
}