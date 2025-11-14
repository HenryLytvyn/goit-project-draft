'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Story, Category } from '@/types/story';
import { createStory, updateStory, getCategories } from '@/lib/api/clientApi';
import { storySchema, updateStorySchema } from '@/lib/validation/storySchemas';
import css from './AddStoryForm.module.css';

interface AddStoryFormProps {
  initialStory?: Story | null;
  mode?: 'create' | 'edit';
}

interface StoryFormValues {
  title: string;
  article: string;
  category: string;
  img: File | string | null;
}

export default function AddStoryForm({
  initialStory = null,
  mode = 'create',
}: AddStoryFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialStory?.img || null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        if (cats.length === 0) {
          console.warn(
            'No categories found. Make sure there are stories in the database.'
          );
        }
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Не показуємо toast, оскільки getCategories вже обробляє помилки
        // і повертає порожній масив
      }
    };

    fetchCategories();
  }, []);

  const initialValues: StoryFormValues = {
    title: initialStory?.title || '',
    article: initialStory?.article || '',
    category: initialStory?.category?._id || '',
    img: initialStory?.img || null,
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue('img', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: StoryFormValues,
    { setFieldError }: FormikHelpers<StoryFormValues>
  ) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      // Додаємо поля тільки якщо вони змінені (для редагування) або обов'язкові (для створення)
      if (mode === 'edit') {
        // При редагуванні додаємо тільки змінені поля
        let hasChanges = false;

        if (values.title && values.title !== initialStory?.title) {
          formData.append('title', values.title);
          hasChanges = true;
        }
        if (values.article && values.article !== initialStory?.article) {
          formData.append('article', values.article);
          hasChanges = true;
        }
        if (
          values.category &&
          values.category !== initialStory?.category?._id
        ) {
          formData.append('category', values.category);
          hasChanges = true;
        }
        // Додаємо зображення тільки якщо це новий файл
        if (values.img instanceof File) {
          formData.append('img', values.img);
          hasChanges = true;
        }

        // Backend вимагає хоча б одне поле для оновлення
        if (!hasChanges) {
          toast.error('Внесіть хоча б одну зміну');
          setIsSubmitting(false);
          return;
        }
      } else {
        // При створенні всі поля обов'язкові
        if (!values.title || !values.article || !values.category) {
          toast.error("Заповніть всі обов'язкові поля");
          setIsSubmitting(false);
          return;
        }
        if (!values.img || !(values.img instanceof File)) {
          setFieldError('img', "Зображення обов'язкове");
          setIsSubmitting(false);
          return;
        }
        formData.append('title', values.title);
        formData.append('article', values.article);
        formData.append('category', values.category);
        formData.append('img', values.img);
      }

      let story: Story;
      if (mode === 'edit' && initialStory) {
        story = await updateStory(initialStory._id, formData);
        toast.success('Історію успішно оновлено!');
      } else {
        story = await createStory(formData);
        toast.success('Історію успішно створено!');
      }

      router.push(`/stories/${story._id}`);
    } catch (error: unknown) {
      console.error('Story submission error:', error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        if (
          errorMessage.includes('title') ||
          errorMessage.includes('Заголовок')
        ) {
          setFieldError('title', errorMessage);
        } else if (
          errorMessage.includes('article') ||
          errorMessage.includes('Стаття')
        ) {
          setFieldError('article', errorMessage);
        } else if (
          errorMessage.includes('category') ||
          errorMessage.includes('Категорія')
        ) {
          setFieldError('category', errorMessage);
        } else if (
          errorMessage.includes('img') ||
          errorMessage.includes('Зображення')
        ) {
          setFieldError('img', errorMessage);
        } else {
          toast.error(errorMessage || 'Помилка при збереженні історії');
        }
      } else {
        toast.error('Помилка при збереженні історії');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>
        {mode === 'edit' ? 'Редагувати історію' : 'Створити історію'}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={mode === 'edit' ? updateStorySchema : storySchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className={css.form}>
            {/* Image Upload */}
            <div className={css.fieldGroup}>
              <label htmlFor="img" className={css.label}>
                Зображення*
              </label>
              <div className={css.imageContainer}>
                {imagePreview && (
                  <div className={css.imagePreview}>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={300}
                      height={200}
                      className={css.previewImage}
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={e => handleImageChange(e, setFieldValue)}
                  className={css.fileInput}
                  disabled={isSubmitting}
                />
                <label htmlFor="img" className={css.fileInputLabel}>
                  {imagePreview ? 'Змінити зображення' : 'Вибрати зображення'}
                </label>
              </div>
              <ErrorMessage name="img" component="div" className={css.error} />
            </div>

            {/* Title */}
            <div className={css.fieldGroup}>
              <label htmlFor="title" className={css.label}>
                Заголовок*
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Введіть заголовок історії"
                maxLength={80}
                className={`${css.input} ${
                  errors.title && touched.title ? css.inputError : ''
                } ${
                  !errors.title && touched.title && values.title
                    ? css.inputValid
                    : ''
                }`}
                disabled={isSubmitting}
              />
              <div className={css.charCount}>{values.title.length}/80</div>
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            {/* Category */}
            <div className={css.fieldGroup}>
              <label htmlFor="category" className={css.label}>
                Категорія*
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className={`${css.select} ${
                  errors.category && touched.category ? css.inputError : ''
                } ${
                  !errors.category && touched.category && values.category
                    ? css.inputValid
                    : ''
                }`}
                disabled={isSubmitting}
              >
                <option value="">Оберіть категорію</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={css.error}
              />
            </div>

            {/* Article */}
            <div className={css.fieldGroup}>
              <label htmlFor="article" className={css.label}>
                Стаття*
              </label>
              <Field
                as="textarea"
                id="article"
                name="article"
                placeholder="Опишіть вашу історію..."
                maxLength={2500}
                rows={10}
                className={`${css.textarea} ${
                  errors.article && touched.article ? css.inputError : ''
                } ${
                  !errors.article && touched.article && values.article
                    ? css.inputValid
                    : ''
                }`}
                disabled={isSubmitting}
              />
              <div className={css.charCount}>{values.article.length}/2500</div>
              <ErrorMessage
                name="article"
                component="div"
                className={css.error}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === 'edit'
                  ? 'Зберігаємо...'
                  : 'Створюємо...'
                : mode === 'edit'
                  ? 'Зберегти зміни'
                  : 'Опублікувати історію'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
