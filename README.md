AjaxLittl
===========

An personnal library for easy ajax request. 

## How to install

You can use bower : ``bower install ajaxLittl``

You can also use gitHub : ``git clone https://github.com/Jeremboo/ajaxLittl``

Then, add in your HTML page :

A javascript link : ``<script src="bower_components/ajaxRequest/ajaxLittl.js"></script>``

## How to use


If you want GET : :

		ajaxLittl.request({url : "www.my-url.com/"}, function(result){
			if(result.success){
				var resultData = result.data;
				// make somethings
			} else {
				console.log(result.error);
			}	
		});

If you want POST, add : 

		ajaxLittl.request({url : "www.my-url.com/", type : "POST", data : {name : "John Doe"}}, function(result){
			if(result.success){
				// you can receive data if exist
				var resultData = result.data;
				// make somethings
			} else {
				console.log(result.error);
			}	
		});


## Args

request({url:""[, data;{}][, type:""]}[, callback()])


url 

- **Required**
- **Type :** String
- To URL to the request.

data 

- **Type :** JSON
- JSON that is sent to the server.

type 

- **Type :** String
- Type of method to open HTTPXmlRequest. By default "GET", you can use the method as you want. Like "POST" but also "DELETE", "PUT" ...

callback 

- **Recommanded**
- **Type :** Function
- A callback function executed when the server respond.







