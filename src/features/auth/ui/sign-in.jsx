import { useState } from 'react';
import { Button } from '@mui/material';
import { Input } from '@shared/ui';

export const Signin = ({ onSubmit }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValue = form.email.trim();
    const passwordValue = form.password.trim();

    const nextErrors = {
      email: emailValue ? '' : 'Email is required',
      password: passwordValue ? '' : 'Password is required',
    };

    const hasErrors = Boolean(nextErrors.email || nextErrors.password);

    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({ email: emailValue, password: passwordValue });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          withAsterisk
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          withAsterisk
          error={errors.password}
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </form>
    </>
  );
};
