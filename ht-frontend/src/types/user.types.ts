export type TUser = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phoneNo: string;
  dob: Date;
};

export type TUserPayload = Pick<
  TUser,
  'dob' | 'email' | 'fullName' | 'phoneNo'
>;
