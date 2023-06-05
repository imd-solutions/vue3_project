export interface Customer {
  AccountNumber: String;
  Address: String;
  SystemName: String;
  Email: String;
  FirstName: String;
  LastName: String;
  CustomerRefNo: String;
  MobileNumber: String;
  PhoneNumber: String;
  PostCode: String;
  SortCode: String;
}

export interface CustomerResponse {
  systemName: String;
  referenceNumber: String;
  status: Number;
  title: String;
  firstName: String;
  lastName: String;
  address: String;
  postcode: String;
  phone: String;
  mobile: String;
  email: String;
  dob: String;
}
