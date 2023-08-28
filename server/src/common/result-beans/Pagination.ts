export class Pagination {
  constructor(payload: { pageNo: number; pageSize: number }) {
    this.pageNo = +payload.pageNo || 1;
    this.pageSize = +payload.pageSize || 10;
    this.skip = (this.pageNo - 1) * this.pageSize;
  }
  pageNo = 1;
  pageSize = 10;
  skip = 0;
}
