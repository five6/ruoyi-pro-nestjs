export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: any;
  size: number;
  buffer: Buffer | string;
}
