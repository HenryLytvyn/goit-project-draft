// AddStoryForm.tsx

'use-client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import css from './AddStoryForm.module.css';
import { useId, useState } from 'react';
import Image from 'next/image';
import StoryFormSchemaValidate from '@/YupSchemes/StoryFormSchemaValidate';

interface AddStoryFormTypes {
  variant: 'create-story' | 'edit-story';
}

export default function AddStoryForm({ variant }: AddStoryFormTypes) {
  const placeholderImage = '/img/AddStoryForm/placeholder-image.png';
  const fieldId = useId();
  const [preview, setPreview] = useState<string>(placeholderImage);

  const isImageDefault = preview === '/img/AddStoryForm/placeholder-image.png';

  //! ===========================================

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

  //!====================================================

  type InitialCategoryType = CategoryType | 'Категорія';

  interface CreateStoryType {
    title: string;
    article: string;
    category: InitialCategoryType;
    imageUrl: string;
  }

  const createStoryInitialValues: CreateStoryType = {
    title: '',
    article: '',
    category: 'Категорія',
    imageUrl: '/img/AddStoryForm/placeholder-image.png',
  };

  function handleSubmitCreateStory(
    values: CreateStoryType,
    actions: FormikHelpers<CreateStoryType>
  ) {
    console.log('Form data: ', values);
    actions.resetForm();
  }
  //   function sortCategories(categoryName) {
  //     if (categoryName === 'Азія') return '68fb50c80ae91338641121f0';
  //     if (categoryName === 'Гори') return '68fb50c80ae91338641121f1';
  //     if (categoryName === 'Європа') return '68fb50c80ae91338641121f2';
  //     if (categoryName === 'Америка') return '68fb50c80ae91338641121f3';
  //     if (categoryName === 'Африка') return '68fb50c80ae91338641121f4';
  //     if (categoryName === 'Пустелі') return '68fb50c80ae91338641121f6';
  //     if (categoryName === 'Балкани') return '68fb50c80ae91338641121f7';
  //     if (categoryName === 'Кавказ') return '68fb50c80ae91338641121f8';
  //     if (categoryName === 'Океанія') return '68fb50c80ae91338641121f9';
  //   }

  // textarea growing

  return (
    <Formik
      initialValues={createStoryInitialValues}
      validationSchema={StoryFormSchemaValidate}
      onSubmit={handleSubmitCreateStory}
      //   onSubmit={`${variant === 'create-story' ? handleSubmitCreateStory : () => {}}`}
    >
      {formik => (
        <Form className={css.form}>
          <ul className={css.fieldsList}>
            <li className={css.fieldItem}>
              <label
                htmlFor={`${fieldId}-cover`}
                className={`${css.inputLabel} ${css.coverLabel}`}
              >
                Обкладинка статті
              </label>

              <div className={css.imageWrapper}>
                <Image
                  src={preview}
                  alt="Зображення історії"
                  fill
                  style={{ objectFit: 'cover' }}
                  className={css.imagePreview}
                />
              </div>

              {/* hidden button */}
              <input
                id={`${fieldId}-cover`}
                type="file"
                accept="image/*"
                name="imageUrl"
                className={css.coverInput}
                onChange={e => {
                  if (!e.target.files || e.target.files.length === 0) return;
                  const file = e.target.files[0];
                  formik.setFieldValue('imageUrl', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              <label htmlFor={`${fieldId}-cover`} className={css.coverButton}>
                Завантажити фото
              </label>

              <ErrorMessage
                component="span"
                name="imageUrl"
                className={css.error}
              />
            </li>

            <li className={css.fieldItem}>
              <label htmlFor={`${fieldId}-title`} className={css.inputLabel}>
                Заголовок
              </label>
              <Field
                id={`${fieldId}-title`}
                type="text"
                name="title"
                className={`${css.title} ${css.inputField}`}
                placeholder="Введіть заголовок історії"
              />
              <ErrorMessage
                component="span"
                name="title"
                className={css.error}
              />
            </li>

            <li className={css.fieldItem}>
              <label
                htmlFor={`${fieldId}-category`}
                className={`${css.inputLabel}`}
              >
                Категорія
              </label>
              <Field
                id={`${fieldId}-category`}
                as="select"
                name="category"
                className={`${css.category} ${css.inputField} ${css.categoryInput}`}
                // placeholder="Категорія"
              >
                <option
                  value="Категорія"
                  disabled
                  //   selected
                  className={css.optionDisabled}
                >
                  Категорія
                </option>
                <option value="Європа">Європа</option>
                <option value="Азія">Азія</option>
                <option value="Пустелі">Пустелі</option>
                <option value="Африка">Африка</option>
                <option value="Гори">Гори</option>
                <option value="Америка">Америка</option>
                <option value="Балкани">Балкани</option>
                <option value="Кавказ">Кавказ</option>
                <option value="Океанія">Океанія</option>
              </Field>
            </li>

            {/* <li className={css.fieldItem}>
              <label
                htmlFor={`${fieldId}-description`}
                className={css.inputLabel}
              >
                Короткий опис
              </label>
              <Field
                id={`${fieldId}-description`}
                as="textarea"
                name="description"
                className={`${css.description} ${css.inputField}`}
                placeholder="Введіть короткий опис історії"
              ></Field>
            </li> */}

            <li className={css.fieldItem}>
              <label
                htmlFor={`${fieldId}-story-text`}
                className={css.inputLabel}
              >
                Текст історії
              </label>
              <Field
                name="article"
                as="textarea"
                id={`${fieldId}-story-text`}
                className={`${css.storyText} ${css.inputField}`}
                placeholder="Ваша історія тут"
              ></Field>
            </li>
          </ul>
          <div className={css.buttonsContainer}>
            <button
              type="submit"
              className={`${css.saveBtn} ${css.btnDisabled}`}
            >
              Зберегти
            </button>
            <button className={css.rejectBtn}>Відмінити</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
