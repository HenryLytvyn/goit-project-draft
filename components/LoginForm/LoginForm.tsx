export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // логіка входу
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вхід</h2>
      <input type="email" placeholder="Email" name="email" required />
      <input type="password" placeholder="Пароль" name="password" required />
      <button type="submit">Увійти</button>
    </form>
  );
}
