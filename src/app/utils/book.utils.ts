import { BookFormatType } from '../../type/bookformat.type';
import { ValueTransformer } from 'typeorm';

export function isGivenFormatPhysical(format: BookFormatType) {
  return format === 'PAPERBACK' || format === 'POCKET';
}

export const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | number) => Number(value),
};
