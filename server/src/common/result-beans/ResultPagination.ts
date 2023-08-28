import { ResultBase } from './ResultBase';

export class ResultPagination extends ResultBase {
  constructor(payload: {
    items: any[];
    code: number;
    success: boolean;
    message: string;
    totalCount: number;
  }) {
    super(payload.code, payload.success, payload.message);
    this.items = payload.items;
    this.totalCount = payload.totalCount;
  }
  items: any[];
  totalCount: number;
}
