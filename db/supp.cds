	@cds.persistence.exists
entity VENDORS {
  key VENDOR_ID : Integer64         @(title: '{i18n>IDTaksi}');
  CODE          : Integer64          @(title: '{i18n>Vards}');
  NAME          : hana.VARCHAR(100)  @(title: '{i18n>Uzvards}');
  DPMNT         : hana.VARCHAR(100)  @(title: '{i18n>NmrKods}');
  STATUS        : hana.VARCHAR(13)   @(title: '{i18n>PersKodsAtd}');
  VENDORDATE    : DateTime           @(title: '{i18n>VATnumber}');
}
