export type HttpStatusCode = 200 | 201 | 203 | 404 | 401 | 403 | 500;

export interface IApiError {
  message: string;
  statusCode: HttpStatusCode | number;
}

export interface IApiResponse<T> {
  data?: T extends IApiError ? never : T;
  error?: T extends IApiError ? T : never;
}

export interface IBusiness {
  id: string;
  name: string;
  location: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  business: IBusiness | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProduct {
  id: string;
  name: string;
  price: number;
  unitCost: number;
  sellingPrice: number;
  quantity: number;
  discount: number;
  unitType: number;
  grossProfit: number;
  grossMargin: number;
  busines: IBusiness;
  status: string;
  category: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  products?: IProduct[];
}

export interface IUnit {
  id: string;
  name: string;
  shortName: string;
}
