function waitAsync(time: number = 1000): Promise<Object> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, time);
  });
}

export type AuthType = {
  username: string;
  token: string;
};

class AuthService {
  constructor() {}

  async login(username: string): Promise<AuthType> {
    await waitAsync();
    return { username, token: "abc#123" };
  }
}

export const authService = new AuthService();
