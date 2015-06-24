/**
 * ajaxLittl 1.0.0
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
}

AjaxLittl.prototype.request = function(params, callback){
	'use_strict';

	var result = {
	    	success : false,
			error : '',
			data : null
		},
		dataSend = null || JSON.stringify(params.data),
		type = "GET" || params.type
	;

	if(params.url){
		this.req.open(type, params.url, true);
		if(type == "POST"){
			this.req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		}
		this.req.send(dataSend);

		this.req.onreadystatechange = function(e) {
			if(this.req.readyState == 4){
				if(this.req.status == 200){
					result.success = true;
					result.data = JSON.parse(this.req.response);
				} else {
					result.error = "ERROR "+this.req.status+".";				
				}
				if(callback){
					callback(result);
				} 
			}
		}.bind(this);
	} else {
		result.error = "ERROR : you don't have 'url' argument";
		if(callback){
			callback(result);
		} else {
			console.error(result.error);
		}
	}
};