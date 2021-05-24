import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { ERROR_MESSAGES } from 'src/utils/ocnstants';

export class authService {
  private readonly userRepo = getRepository(User);

  async hashPassword(pass: string) {
    return bcrypt.hash(pass, 10);
  }

  createTokens(user: Partial<User>): { refreshToken: string; accessToken: string } {
    const refreshToken = sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: '14d',
    });
    const accessToken = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '15min',
    });

    return { refreshToken, accessToken };
  }

  async comparePassword(password: string, hashedPass: string) {
    return await bcrypt.compare(password, hashedPass);
  }

  async register(user: User, res: Response) {
    if (await this.userRepo.findOne({ email: user.email }))
      return res.status(400).send(ERROR_MESSAGES.email_in_use);

    try {
      const createdUser = await this.userRepo
        .create({ ...user, password: await this.hashPassword(user.password) })
        .save();

      (createdUser.password as any) = undefined;
      return { ...createdUser, ...this.createTokens(createdUser) };
    } catch (error) {
      return res.status(400).send(ERROR_MESSAGES.iss);
    }
  }

  async login(password: string, email: string, res: Response) {
    const user = await this.userRepo.findOne(
      email.includes('@') ? { where: { email: email } } : { where: { username: email } },
    );
    if (!user) return res.status(400).send(ERROR_MESSAGES.email_pass_incorrect);
    if (!(await this.comparePassword(password, user.password))) {
      return res.status(400).send(ERROR_MESSAGES.email_pass_incorrect);
    }

    (user.password as any) = undefined;

    return {
      ...user,
      ...this.createTokens(user),
    };
  }
}
