// types.ts
export interface FormDatas {
  name: string;
  email: string;
  password: string;
  country: string;
  terms: string;
}

export interface FormErrors {
  [key: string]: string | undefined; // allows optional properties
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  terms?: string;
}



