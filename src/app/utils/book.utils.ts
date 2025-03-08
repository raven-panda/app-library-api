import { BookFormatType } from '../../type/bookformat.type';
import { ValueTransformer } from 'typeorm';

export function isPhysicalFormat(format: BookFormatType) {
  return format === 'PAPERBACK' || format === 'POCKET';
}

export const bigintTransformer: ValueTransformer = {
  to: (value: number) => value, // ✅ Enregistre en tant que BIGINT
  from: (value: string | number) => Number(value), // ✅ Convertit en `number`
};
