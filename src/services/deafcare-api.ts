import { ILandmarksBodyRequest } from "@/utils/media-pipe";
import { BaseAPI } from "./base-api";

export interface ILanguageRes {
    Class: string;
    Confidence: number;
};

interface IApiResponse<T> {
    status: number; 
    message: string; 
    data: T; 
}

interface IUser {
    UserId: number;
    Username: string;
    UserType: string;
    SIPAddress: string;
    FullName: string;
    Phone: string;
    Email: string;
    IsActive: boolean;
    Status: string;
    Access: string;
    Refresh: string;
}
  
export interface IContact {
    status: string;
    user_info: {
      full_name: string;
      phone?: string;
      email?: string;
      address?: string;
      date_of_birth?: string;
      gender?: string;
      avatar?: string | null;
      user_id?: number;
    };
}
  
class DeafCareAPI {
    private fetchAPI: BaseAPI;
    constructor() {
        this.fetchAPI = new BaseAPI("http://11.11.7.80:841");
        this.fetchAPI.header.append("Content-Type", "application/json");
    }

    async login(loginReq: { Username: string, Password: string }): Promise<IApiResponse<IUser>> {
        const res = await this.fetchAPI.post("v1/api/login", loginReq);
        return await res.json();
    }

    async signLanguage(signReq: ILandmarksBodyRequest): Promise<ILanguageRes[]> {
        const res = await this.fetchAPI.post("v3/api/sign-language/recognize-poc", signReq);
        return await res.json();
    }

    async getUsers(): Promise<IApiResponse<IContact[]>> {
        const res = await this.fetchAPI.get("v1/api/users");
        return await res.json();
    }
};

export const deafCareAPI = new DeafCareAPI();