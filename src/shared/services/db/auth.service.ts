import { IAuthDocument } from "@auth/interfaces/auth.interface";
import { Helpers } from "@global/helpers/helpers";
import { AuthModel } from '@auth/models/auth.schema';

class AuthService {
  public async createAuthUser(data: IAuthDocument): Promise<void> {
    await AuthModel.create(data);
  }

  public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
    const query = {
      $or: [{username: Helpers.firstLetterUppercase(username)}, { email: Helpers.firstLetterUppercase(email)}]
    };
    const user: IAuthDocument = await AuthModel.findOne(query).exec() as IAuthDocument;
    return user;
  }

  public async getUserByUsername(username: string): Promise<IAuthDocument> {
    const user: IAuthDocument = await AuthModel.findOne({ username: Helpers.firstLetterUppercase(username) }).exec() as IAuthDocument;
    return user;
  }

  public async comparePassword(username: string, password: string): Promise<boolean> {
    const query = {
      $and: [{username: Helpers.firstLetterUppercase(username)}, { password: password }]
    };
    const user: IAuthDocument = await AuthModel.findOne(query).exec() as IAuthDocument;
    return user != null;
  }
}

export const authService: AuthService = new AuthService();
