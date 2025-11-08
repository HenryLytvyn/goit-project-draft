import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  name: Yup.string()
    .min(1, "Ім'я має містити мінімум 1 символ")
    .max(32, "Ім'я має містити максимум 32 символи")
    .required("Ім'я є обов'язковим полем")
    .trim(),

  email: Yup.string()
    .email('Некоректний формат email')
    .max(64, 'Email має містити максимум 64 символи')
    .required("Email є обов'язковим полем")
    .trim(),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль має містити максимум 128 символів')
    .required("Пароль є обов'язковим полем"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Некоректний формат email')
    .max(64, 'Email має містити максимум 64 символи')
    .required("Email є обов'язковим полем")
    .trim(),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль має містити максимум 128 символів')
    .required("Пароль є обов'язковим полем"),
});
