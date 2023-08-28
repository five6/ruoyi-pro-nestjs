import { ResultBase } from './ResultBase';

export class Result extends ResultBase {
  constructor(payload: {
    data?: any;
    code: number;
    success?: boolean;
    message?: string;
  }) {
    super(payload.code, payload.success, payload.message);
    this.data = payload.data;
  }
  data?: any;
}
