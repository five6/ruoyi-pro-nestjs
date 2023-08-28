export class ResultBase {
  constructor(code: number, success: boolean, message: string) {
    this.code = code;
    this.message = message;
    this.success = success;
  }

  code: number;
  message: string;
  success?: boolean;
}
