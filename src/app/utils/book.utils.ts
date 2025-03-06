import { BookFormatType } from '../../type/bookformat.type';

export function isPhysicalFormat(format: BookFormatType) {
  return format === 'PAPERBACK' || format === 'POCKET';
}
