/**
 * ajaxLittl 1.2.1
 * Apache 2.0 Licensing
 * Copyright (c) 2014 Jérémie Boulay <jeremi.boulay@gmail.com>
 * URL : https://github.com/Jeremboo/ajaxLittl
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Creative Commons Licence.
 *
 */

function AjaxLittl(){
	'use_strict';

	this.req = new XMLHttpRequest();
	this.result = {
    	success : true,
		status : null,
		data : null
	}
	this.headers = {};
	this.callback = false;

}

AjaxLittl.prototype.request = function(params, callback){
	'use_strict';

	this.callback = callback || false;

	var dataSend = JSON.stringify(params.data) || null,
		type =  params.type || "GET"
	;

	if(params.url){
		this.req.open(type, params.url, true);

		if(dataSend){
			this.setHeader("Content-type", "application/x-www-form-urlencoded");
		}
		
		if(this.headers){
			var arr = Object.keys(this.headers);
		    for (var i = 0 ; i < Object.keys(this.headers).length ; i++) {
		      var k = arr[i];
			  this.req.setRequestHeader(k, this.headers[k]);
		    };
		    this.headers = {};
		}

		this.req.send(dataSend);

		this.req.onreadystatechange = function(e) {
			if(this.req.readyState == 4){
				var status = Math.floor(this.req.status/100);

				this.result.status = this.req.status;
				this.result.data = (this.req.response || this.req.responseText) ? JSON.parse(this.req.response || this.req.responseText) : false;
				
				if( status == 4 || status == 5 ){
					this.result.success = false;
				}

				this.callCallback();
			}
		}.bind(this);
	} else {
		this.result.success = false;
		this.result.data = "ERROR : you don't have 'url' argument";
		this.callCallback();
	}
};

AjaxLittl.prototype.callCallback = function() {
	if(this.callback){
		this.callback(this.result);
	} else if(!this.result.success){
		console.error(this.result.data);
	}
};

AjaxLittl.prototype.setHeader = function(key, value) {
	if(!this.headers[key]){
		this.headers[key] = value;
	}
};
