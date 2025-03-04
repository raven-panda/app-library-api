import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    if (typeof value !== 'string') throw new NotFoundException();

    const validObjectId = Types.ObjectId.isValid(value);
    if (!validObjectId) throw new NotFoundException();

    return Types.ObjectId.createFromHexString(value);
  }
}
