export default function RegistrationForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // логіка реєстрації
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Реєстрація</h2>
      <input type="text" placeholder="Ім'я" name="name" required />
      <input type="email" placeholder="Email" name="email" required />
      <input type="password" placeholder="Пароль" name="password" required />
      <button type="submit">Зареєструватися</button>
    </form>
  );
}
