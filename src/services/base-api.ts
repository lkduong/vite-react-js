export class BaseAPI {
    public header: Headers = new Headers;
    
    constructor(protected baseUrl: string = "") {}

    get(path: string) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "GET",
            headers: this.header
        });
    }

    post(path: string, data: any) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.header
        });
    }

    put(path: string, data: any) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: this.header
        });
    }

    delete(path: string, data: any) {
        return fetch(`${this.baseUrl}/${path}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: this.header
        });
    }
};