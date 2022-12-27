import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversionError extends HttpException {
  constructor(e) {
    if (e?.response?.statusCode) {
      super(e.response.message, e.response.statusCode);
    } else {
      if (e?.name) {
        super(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        super(e.errors, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
