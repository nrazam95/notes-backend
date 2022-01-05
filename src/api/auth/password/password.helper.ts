import { randomBytes, scrypt } from 'crypto';

export class PasswordHelper {
  public async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(64, (err, salt) => {
        if (err) {
          reject(err);
        }
        scrypt(password, salt, 64, (err, buffer) => {
          if (err) {
            reject(err);
          }
          resolve(`${buffer.toString('hex')}.${salt.toString('hex')}`);
        });
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
        resolve(buffer.toString('hex') === hashedPassword);
      });
    });
  }
}
