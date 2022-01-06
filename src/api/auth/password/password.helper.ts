import { randomBytes, scrypt } from 'crypto';

export class PasswordHelper {
  public async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString('hex');
      scrypt(password, salt, 64, (err, buffer) => {
        if (err) {
          reject(err);
        }

        const hash = buffer.toString('hex') + '.' + salt;
        resolve(hash);
      });
    });
  }

  public async comparePassword(
    savedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hashedPassword, salt] = savedPassword.split('.');
      scrypt(suppliedPassword, salt, 64, (err, buffer) => {
        if (err) {
          reject(err);
        }

        if (buffer.toString('hex') === hashedPassword) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
