 /*eslint-env node, es6 */
 "use strict";

 module.exports = (app) => {
 	
 	app.use("/api/vat", require("./routes/vat")());


 	// app.use((req, res, next) => {
 		
 	// 	var client = req.db;
 	// 	var IP_ADR = req.headers["x-forwarded-for"];
 	// 	var IP_ADR_MAS = IP_ADR.split(',');
 	// 	var IP_ADR_0 = IP_ADR_MAS[0];
 	// 	var URL = decodeURIComponent(req.url).toString();
 	// 	var NMR = URL.match(/(?!IP_NMR_KODS=')(\d+)(?=')/);
 	// 	var IDENTIF = 'SUPP_TEHN_USER';
 	// 	var APR = `URL: ${URL}, Metode: ${req.method}`;
 	// 	// var scope = `${req.authInfo.xsappname}.taksi_access`;
		
		// // if(req.authInfo && !req.authInfo.checkScope(scope)) {
 	// // 		console.log("ALERT - USER HAS NO ACCESS");
 	// // 		APR = APR + ", Kļūda: Jums šī darbība ir aizliegta! <403>" ;
 	// // 	}
		
 	// 	// client.prepare("CALL TAKSI_ZURNALS(IP_ADRESE => ?, IDENTIFIKATORS => ?, APRAKSTS => ?)", (err, statement) => {
 	// 	// 	if (err) {
 	// 	// 		console.error(err);
 	// 	// 	} 
 	// 	// 	statement.exec([IP_ADR_0, IDENTIF, APR], (err, results) => {
 	// 	// 		if (err) {
 	// 	// 			console.error(err);
 	// 	// 		}  
 				
 	// 	// 		// if (req.authInfo.checkScope(scope)) {
 	// 	// 			if (!NMR) {
 	// 	// 				console.log("OK");
 	// 	// 				next();
 						
 	// 	// 			} else if (NMR !== null && NMR !== '') {
 	// 	// 				client.prepare("SELECT 1 SKAITS FROM D_ATD_TAKSVADREG WHERE NMR_KODS = ?", (err, statement) => {
 	// 	// 					var NMRR = NMR.slice(0, NMR.indexOf(',')).toString();
 	// 	// 					console.log(NMRR);
 	// 	// 					if (err) {
 	// 	// 						console.error(err);
 	// 	// 					}
 	// 	// 					statement.exec([NMRR], (err, results) => {
 	// 	// 						if (err) {
 	// 	// 							console.error(err);
 	// 	// 						} else {
 	// 	// 							if (results.length === 0) {
 	// 	// 								console.log("PVN Maksātājs neeksistē");
 	// 	// 								return res.type("text/plain").send("Šāds PVN maksātājs neeksistē.");
 	// 	// 							} else if (results.length > 0) {
 	// 	// 								console.log("Skaits: " + results.length);
 										
 	// 	// 							next();
 	// 	// 							}	
 	// 	// 						}
 	// 	// 					});
 	// 	// 				});
 	// 	// 			} 
 	// 	// 		// }
 	// 	// 		else{
 	// 	// 			return 	res.type("text/plain").status(403).send("Jums šī darbība ir aizliegta! <403>");
 	// 	// 		}
 	// 	// 	});
 	// 	//  });
 	// next();
 		
 	// });
 	
 	// Add : app.use((req, res, next) => {});
 	
 };