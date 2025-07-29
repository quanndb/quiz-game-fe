export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface AccountType {
  id: string;
  deleted: boolean;
  email: string;
  fullName: string;
  avatarUrl?: string;
  gender?: Gender;
  status: AccountStatus;
  phoneNumber?: string;
}
