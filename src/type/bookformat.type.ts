export type BookFormatType =
  // Physical
  | 'PAPERBACK'
  | 'POCKET'
  // Ebook
  | 'EPUB'
  | 'PDF'
  | 'AUDIO'
  | 'DAISY';

export const BookFormatValues: BookFormatType[] = [
  'PAPERBACK',
  'POCKET',
  'EPUB',
  'PDF',
  'AUDIO',
  'DAISY',
];
