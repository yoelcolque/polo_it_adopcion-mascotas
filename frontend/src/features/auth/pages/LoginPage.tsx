import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import BaseButton from '../../../components/BaseButton';
import InputWithIcon from '../../../components/InputWithIcon';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log('Iniciando login con:', { email });
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      console.error('Error capturado en LoginPage:', err);
      setError(err.message || 'Login fallido');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="h-[100px] bg-[#096A7F] text-white shadow-md flex items-center justify-center">
        <h1 className="text-2xl font-bold">Ingreso</h1>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="w-[329px] mx-auto">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <InputWithIcon
            id="email"
            label="Correo electrónico"
            placeholder="Ingresá tu correo electrónico"
            iconSrc="/letter.svg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputWithIcon
            id="password"
            label="Contraseña"
            placeholder="Ingresá tu contraseña"
            type={showPassword ? 'text' : 'password'}
            iconSrc="/Password.svg"
            rightIconSrc="/Eye.svg"
            onRightIconClick={() => setShowPassword(!showPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <p className="text-xs text-[#555] mb-9">Tu contraseña debe tener al menos 8 dígitos</p>
          <BaseButton label="Iniciá sesión" onClick={handleSubmit} className="mb-3 mx-auto" />
          <p className="text-center text-sm text-[#444] mb-4 cursor-pointer hover:underline">
            Olvidé mi contraseña
          </p>
          <div className="flex justify-center items-center mt-6 gap-2 text-sm">
            <span className="text-[#444]">¿No tenés cuenta?</span>
            <button
              className="flex items-center font-semibold text-[#096A7F]"
              onClick={() => navigate('/register')}
            >
              Registrate
              <img src="/Arrow-right.svg" alt="Flecha" className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;