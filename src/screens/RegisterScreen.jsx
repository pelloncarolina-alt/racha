import { useState } from 'react'
import FormField from '../components/FormField'
import AvatarPicker from '../components/AvatarPicker'
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../utils/validation'

function RegisterScreen({ onSubmit, onBack }) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    avatar: 'fox',
  })
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const errors = {
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  }
  const isValid = !errors.username && !errors.email && !errors.password

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function touch(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ username: true, email: true, password: true })
    if (!isValid) return
    onSubmit({
      username: values.username.trim(),
      email: values.email.trim().toLowerCase(),
      avatar: values.avatar,
    })
  }

  const shown = (name) => (touched[name] ? errors[name] : '')

  return (
    <div className="register">
      <button className="register-back" onClick={onBack}>
        ← Volver
      </button>

      <h2 className="screen-title">CREÁ TU CUENTA</h2>
      <p className="register-subtitle">
        Elegí tu avatar y empezá tu primera racha.
      </p>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <AvatarPicker value={values.avatar} onChange={(id) => setField('avatar', id)} />

        <FormField label="USUARIO" error={shown('username')}>
          <input
            className="form-input"
            type="text"
            autoComplete="username"
            placeholder="ej: caro_neon"
            value={values.username}
            onChange={(e) => setField('username', e.target.value)}
            onBlur={() => touch('username')}
          />
        </FormField>

        <FormField label="MAIL" error={shown('email')}>
          <input
            className="form-input"
            type="email"
            autoComplete="email"
            placeholder="tumail@ejemplo.com"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => touch('email')}
          />
        </FormField>

        <FormField label="CONTRASEÑA" error={shown('password')}>
          <div className="form-input-group">
            <input
              className="form-input"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              value={values.password}
              onChange={(e) => setField('password', e.target.value)}
              onBlur={() => touch('password')}
            />
            <button
              type="button"
              className="form-input-toggle"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? 'OCULTAR' : 'VER'}
            </button>
          </div>
        </FormField>

        <button className="btn-primary" type="submit">
          CREAR CUENTA Y JUGAR
        </button>
      </form>
    </div>
  )
}

export default RegisterScreen
