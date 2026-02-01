
export enum FamilyStatus {
  TOGETHER = 'ພໍ່ແມ່ຢູ່ນໍາກັນ',
  SEPARATED = 'ແຍກກັນ',
  DIVORCED = 'ຢ່າຮ້າງ',
  OTHER = 'ອື່ນໆ'
}

export enum TitleType {
  PHRA = 'ພຣະ',
  SN = 'ສ.ນ'
}

export interface Address {
  wat: string;
  village: string;
  district: string;
  province: string;
}

export interface FamilyMember {
  fullName: string;
  age: string;
  job: string;
  nationality: string;
  ethnicity: string;
  tribe: string;
  address: {
    village: string;
    district: string;
    province: string;
  };
  phone: string;
}

export interface MonkRecord {
  id: string;
  recordYear: string;
  personalInfo: {
    photo: string;
    code: string;
    fullName: string;
    birthDate: string;
    age: string;
    pansa: string;
    title: TitleType;
    originalAddress: Address;
    ordinationPlace: Address;
    ordinationDate: string;
    upatchaName: string;
    moveDate: string;
    suttiBookId: string;
    educationLevel: string;
    nationality: string;
    ethnicity: string;
    tribe: string;
    birthPlace: {
      village: string;
      district: string;
      province: string;
    };
  };
  contactInfo: {
    currentAddress: string;
    village: string;
    district: string;
    province: string;
    phone: string;
  };
  familyInfo: {
    father: FamilyMember;
    mother: FamilyMember;
    guardian: FamilyMember;
    status: FamilyStatus;
    statusOther?: string;
  };
  documents: string[];
  notes: {
    transferOut: { monk: string; novice: string; date: string };
    transferIn: { monk: string; novice: string; date: string };
    resigned: { monk: string; novice: string; date: string };
    deaths: { monk: string; novice: string };
    totalWats: string;
    watHasMonks: string;
    watNoMonks: string;
    sim: { wat: string; hasSim: string };
  };
  languageGroup: 'Lao-Tai' | 'Mon-Khmer' | 'Chinese-Tibetan' | 'Hmong-IuMien';
}
