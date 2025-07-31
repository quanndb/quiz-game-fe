export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Account {
  id: string;
  deleted: boolean;
  email: string;
  fullName: string;
  avatarUrl?: string;
  gender?: Gender;
  status: AccountStatus;
  phoneNumber?: string;
}

export interface UserAuthorities {
  userId: string;
  isRoot: boolean;
  roles: string[];
  grantedPermissions: string[];
}
