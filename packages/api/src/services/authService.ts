import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user';
import { HttpError } from 'routing-controllers';
import { sign } from 'jsonwebtoken';
require('dotenv').config();
export class authService {
  private readonly userRepo = getRepository(User);

  async hashPassword(pass: string) {
    return bcrypt.hash(pass, 10);
  }

  createTokens(user: User): { refreshToken: string; accessToken: string } {
    const refreshToken = sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: '14d',
      },
    );
    const accessToken = sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '15min',
      },
    );

    return { refreshToken, accessToken };
  }

  async comparePassword(password: string, hashedPass: string) {
    return await bcrypt.compare(password, hashedPass);
  }

  async register(user: User) {
    if (await this.userRepo.findOne({ email: user.email }))
      throw new HttpError(400, 'Email already in use !');

    try {
      const createdUser = await this.userRepo
        .create({ ...user, password: await this.hashPassword(user.password) })
        .save();

      (createdUser.password as any) = undefined;
      return { ...createdUser, ...this.createTokens(createdUser) };
    } catch (error) {
      throw new HttpError(500, 'Something went wrong.');
    }
  }

  async login(password: string, email: string) {
    const user = await this.userRepo.findOne({ email: email });
    if (!user) throw new HttpError(400, "user doesn't exist !");
    if (!(await this.comparePassword(password, user.password)))
      throw new HttpError(400, 'Wrong credentials provided !');

    (user.password as any) = undefined;

    return {
      ...user,
      ...this.createTokens(user),
    };
  }
}
