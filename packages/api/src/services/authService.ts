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

  async comparePassword(pass: string, email: string) {
    const user = await this.userRepo.findOne(email);
    if (!user) return new HttpError(400, "user doesn't exist !");
    return await bcrypt.compare(pass, user.password);
  }

  async register(user: User) {
    if (await this.userRepo.findOne({ email: user.email }))
      return new HttpError(400, 'Email already in use !');

    try {
      const createdUser = await this.userRepo
        .create({ ...user, password: await this.hashPassword(user.password) })
        .save();

      (createdUser.password as any) = undefined;
      return { ...createdUser, ...this.createTokens(createdUser) };
    } catch (error) {
      console.log(error);
      return new HttpError(500, 'Something went wrong.');
    }
  }

  async login(hashedPass: string, email?: string, username?: string) {
    const user = email
      ? await this.userRepo.findOne({ email: email })
      : await this.userRepo.findOne({ username: username });
    if (!user) return new HttpError(400, "User doen't exist !");
    if (!(await this.comparePassword(hashedPass, user.password)))
      return new HttpError(400, 'Wrong credentials provided !');
    (user.password as any) = undefined;

    return {
      ...user,
      ...this.createTokens(user),
    };
  }
}
