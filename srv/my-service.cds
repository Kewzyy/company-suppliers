using VENDORS as supp from '../db/data-model';

service CatalogService {

entity SUPP1 @(
		title: '{i18n>taxiService}',
		Capabilities: {
			InsertRestrictions: {Insertable: true},
			UpdateRestrictions: {Updatable: true},
			DeleteRestrictions: {Deletable: true}
		}
	) as projection on supp;     
     
  }
  
 