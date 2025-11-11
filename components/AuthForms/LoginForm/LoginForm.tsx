'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useAuth } from '@/lib/hooks/useAuth';
import { LoginRequest } from '@/types/auth';
import styles from '../RegistrationForm/RegistrationForm.module.css';
import { loginSchema } from '@/lib/validation/authSchemas';

const LoginForm = () => {
  const { login, isSubmitting } = useAuth();

  const initialValues: LoginRequest = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginRequest) => {
    await login(values);
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Вхід</h1>
      <p className={styles.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Пошта*
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${styles.input} ${
                  errors.email && touched.email ? styles.inputError : ''
                } ${!errors.email && touched.email && values.email ? styles.inputValid : ''}`}
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль*
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className={`${styles.input} ${
                  errors.password && touched.password ? styles.inputError : ''
                } ${!errors.password && touched.password && values.password ? styles.inputValid : ''}`}
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Входимо...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
