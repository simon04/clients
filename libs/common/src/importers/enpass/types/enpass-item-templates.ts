enum Login {
  Default = "login.default",
}

enum CreditCard {
  Default = "creditcard.default",
}

enum Identity {
  Default = "identity.default",
}

enum Note {
  Default = "note.default",
}

enum Password {
  Default = "password.default",
}

enum Finance {
  Stock = "finance.stock",
  BankAccount = "finance.bankaccount",
  Loan = "finance.loan",
  MutualFund = "finance.mutualfund",
  Insurance = "finance.insurance",
  Other = "finance.other",
}

enum License {
  DriversLicense = "license.driving",
  HuntingLicense = "license.hunting",
  SoftwareLicense = "license.software",
  Other = "license.other",
}

enum Travel {
  Passport = "travel.passport",
  FlightDetails = "travel.flightdetails",
  HotelReservation = "travel.hotelreservation",
  Visa = "travel.visa",
  FrequentFlyer = "travel.freqflyer",
  Other = "travel.other",
}

enum Computer {
  Database = "computer.database",
  EmailAccount = "computer.emailaccount",
  FTP = "computer.ftp",
  Messaging = "computer.messaging",
  ISP = "computer.internetprovider",
  Server = "computer.server",
  WifiRouter = "computer.wifi",
  Hosting = "computer.hosting",
  Other = "computer.other",
}

enum Misc {
  Aadhar = "misc.Aadhar",
  Address = "misc.address",
  library = "misc.library",
  RewardProgram = "misc.rewardprogram",
  Lens = "misc.lens",
  ServiceProvider = "misc.service",
  VehicleInfo = "misc.vehicleinfo",
  ITIC = "misc.itic",
  ITZ = "misc.itz",
  PropertyInfo = "misc.propertyinfo",
  ClothSize = "misc.clothsize",
  Contact = "misc.contact",
  Membership = "misc.membership",
  CellPhone = "misc.cellphone",
  EmergencyNo = "misc.emergencyno",
  PAN_Card = "misc.pan",
  Identity = "misc.identity",
  RegCode = "misc.regcode",
  Prescription = "misc.prescription",
  Serial = "misc.serial",
  SocialSecurityNo = "misc.socialsecurityno",
  ISIC = "misc.isic",
  Calling = "misc.calling",
  Voicemail = "misc.voicemail",
  Voter = "misc.voter",
  CombinationLock = "misc.combilock",
  Other = "misc.other",
}

export const EnpassItemTemplates = {
  Login,
  CreditCard,
  Identity,
  Note,
  Password,
  Finance,
  License,
  Travel,
  Computer,
  Misc,
};
export type EnpassItemTemplates = typeof EnpassItemTemplates;
