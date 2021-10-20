import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '../prisma';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
}

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

class AuthenticateUserService {
  private github_client_id = GITHUB_CLIENT_ID;
  private github_client_secret = GITHUB_CLIENT_SECRET;
  private jwt_secret = JWT_SECRET;

  public async execute(code: string) {
    try {
      const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>('https://github.com/login/oauth/access_token', null, {
        params: {
          client_id: this.github_client_id,
          client_secret: this.github_client_secret,
          code
        },
        headers: {
          'Accept': 'application/json'
        }
      });
  
      const response = await axios.get<IUserResponse>('https://api.github.com/user', {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`
        }
      });

      const { id, name, login, avatar_url } = response.data;

      let user = await prismaClient.user.findFirst({
        where: {
          github_id: id
        }
      });

      if (!user) {
        user = await prismaClient.user.create({
          data: {
            github_id: id,
            login,
            name,
            avatar_url,
          }
        });
      }

      if (!this.jwt_secret) {
        throw new Error('[Error]: JWT_SECRET is missing');
      }

      const token = sign({
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        }
      }, this.jwt_secret, {
        subject: user.id,
        expiresIn: '1d'
      });

      return {
        token,
        user,
      };
    } catch(err: any) {
      throw new Error(err);
    }
  }
}

export { AuthenticateUserService }