import { DomainError } from '../errors/domain.error';

export class Password {
  private readonly value: string;

  constructor(password: string) {
    if (!this.isValidPassword(password)) {
      throw new DomainError(
        'INVALID_PASSWORD',
        'Password must be at least 8 characters with uppercase, lowercase and number',
      );
    }
    this.value = password;
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
}
