/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */

"use strict";

const uuid = require("uuid/v4");
const cds = require("@sap/cds");

/**
 * Register handlers to events.
 * @param {Object} entities
 * @param {Object} entities.TAXI_ATG
 * @param {Object} entities.TAXI_ATG_SYN
 */
module.exports = function (entities) {
	const {
		Catalog
	} = entities;

	/*	this.before("READ", entities.POs, (entity) =>{
			
		});*/

	this.before("CREATE","SUPP1", async(Taxi) => {
		console.log("Before User Create");
		
		const {
			data
		} = Taxi;
		if (data.length < 1) {
			return null;
		}
		
		const dbClass = require(global.__base + "utils/dbPromises");
		var client = await dbClass.createConnection();
		let db = new dbClass(client);
		
		var hdbext = require("@sap/hdbext");
		const updStatement = await db.loadProcedurePromisified(hdbext, null, "MAXID");
		const updResults = await db.callProcedurePromisified(updStatement, {});
		var taxID = updResults.outputScalar.TAXID;
		console.log(taxID);
		data.ID_ATDTAKSVADREG = taxID;
		console.log(data.ID_ATDTAKSVADREG);
	});

	this.on("CREATE", "SUPP1", async(Taxi) => {
		const {
			data
		} = Taxi;
		if (data.length < 1) {
			return null;
		}

		const dbClass = require(global.__base + "utils/dbPromises");
		var client = await dbClass.createConnection();
		let db = new dbClass(client);
		const insStatement = await db.preparePromisified(
			`call INSERT_TAKSVADREG(
			IN_VARDS=>?,
			IN_UZVARDS=>?,
			IN_NMR_KODS=>?,
			IN_PERS_KODS_ATD=>?,
			IN_TX_VAD_REG_NR=>?,
			IN_STATUSS=>?,
			IN_ID_NODOKLMAKS=>?,
			IN_VAD_APL_NUMURS=>?,
			IN_ID_DATUMS_ATD=>?,
			O_ZINOJUMS=>?)`
		);
		console.log(insStatement);
		const updResults = await db.statementExecPromisified(insStatement,
	  [	data.VARDS, 
		data.UZVARDS, 
		data.NMR_KODS, 
		data.PERS_KODS_ATD,
		data.TX_VAD_REG_NR,
		data.STATUSS,
		data.ID_NODOKLMAKS,
		data.VAD_APL_NUMURS,
		data.ID_DATUMS_ATD]);

		console.log(JSON.stringify(data));
		return data;

	});

	this.on("UPDATE", "SUPP1", async(User) => {
		console.log("Before User Update");
		const {
			data
		} = User;
		if (data.length < 1) {
			return null;
		}

		const dbClass = require(global.__base + "utils/dbPromises");
		var client = await dbClass.createConnection();
		let db = new dbClass(client);
		const statement = await db.preparePromisified(
			`call SEARCH_ROW_IN_TAKSVADREG(
				IN_ID_ATDTAKSVADREG=>?,
				O_SELECT=>?)`);
		const userResults = await db.statementExecPromisified(statement, [data.ID_ATDTAKSVADREG]);
		
		// Object.keys(data).forEach(function (key) {
		// 	userResults[0][key] = data[key];
		// });
		
		const updStatement = await db.preparePromisified(
			` call UPDATE_ROW_IN_TAKSVADREG(
			IN_ID_ATDTAKSVADREG=>?,
			IN_VARDS=>?,
			IN_UZVARDS=>?,
			IN_NMR_KODS=>?,
			IN_PERS_KODS_ATD=>?,
			IN_TX_VAD_REG_NR=>?,
			IN_STATUSS=>?,
			IN_ID_NODOKLMAKS=>?,
			IN_VAD_APL_NUMURS=>?,
			IN_ID_DATUMS_ATD=>?,
			O_ZINOJUMS=>?)`
		);
		console.log('good');
		console.log(data);
		
		const updResults = await db.statementExecPromisified(updStatement,
	  [	
	  	data.ID_ATDTAKSVADREG,
		data.VARDS, 
		data.UZVARDS, 
		data.NMR_KODS,
		data.PERS_KODS_ATD,
		data.TX_VAD_REG_NR,
		data.STATUSS,
		data.ID_NODOKLMAKS,
		data.VAD_APL_NUMURS,
		data.ID_DATUMS_ATD
		]);
		
		
		// var d1 = new Date(userResults[0].DATUMS_NO).toISOString();
		// console.log(userResults[0]);
		
		// return userResults[0];
	});

	this.on("DELETE", "SUPP1", async(User) => {
		console.log("Delete");
		const {
			data
		} = User;
		if (data.length < 1) {
			return null;
		}
		
		const dbClass = require(global.__base + "utils/dbPromises");
		var client = await dbClass.createConnection();
		let db = new dbClass(client);
		const statement = await db.preparePromisified(
			`call DELETE_ROW_IN_TAKSVADREG(?,?)`);
		const userResults = await db.statementExecPromisified(statement, [data.ID_ATDTAKSVADREG]);
		// Object.keys(data).forEach(function (key) {
		// 	userResults[0][key] = data[key];
		// });
		 console.log("Deleted successfully");
		return userResults[0];
	});
};	