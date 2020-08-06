"use strict";
var express = require("express");
var soap = require("soap");

module.exports = function () {
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var app = express.Router();
    
    app.get("/check", function(req, res)  {

				var url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";
				var args = {countryCode: req.query.countryCode,
		  			        vatNumber: req.query.vatNumber };
		  			  console.log(req.query);
		  soap.createClient(url, function(err, client) {
		      client.checkVat(args, function(err, result) {
		          //console.log(result);
		          res.json(result);
		      });
		      
		  });
    
    });
    
    return app;
};