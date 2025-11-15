// StoryFormSchemaValidate.ts

import * as Yup from 'yup';

type CategoryType =
  | 'Європа'
  | 'Азія'
  | 'Пустелі'
  | 'Африка'
  | 'Гори'
  | 'Америка'
  | 'Балкани'
  | 'Кавказ'
  | 'Океанія';

const categories: CategoryType[] = [
  'Європа',
  'Азія',
  'Пустелі',
  'Африка',
  'Гори',
  'Америка',
  'Балкани',
  'Кавказ',
  'Океанія',
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const StoryFormSchemaValidate = Yup.object().shape({
  imageUrl: Yup.mixed<File>()
    .required('The image is required')
    .test('fileType', 'Дозволені тільки зображення', value => {
      if (!value) return false;
      return value instanceof File && value.type.startsWith('image/');
    })
    .test('fileSize', 'Максимальний розмір файлу — 2MB', value => {
      if (!value) return false;
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),

  title: Yup.string()
    .min(5, 'The title is too short. Tap at least 5 symbols')
    .max(80, '80 symbols is a maximum in this field')
    .required('This field is required'),

  article: Yup.string()
    .min(300, 'The minimum text capacity is 300 symbols')
    .max(2500, 'You incresed the maximum characters for this field')
    .required('This field is required'),

  category: Yup.string()
    .oneOf(categories, 'Будь ласка, виберіть категорію')
    .required('This option is required'),
});

export default StoryFormSchemaValidate;
