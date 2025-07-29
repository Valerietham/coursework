import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/Header';
import { PawPrint } from 'lucide-react';

const validationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(10, 'Minimum password length is 10 characters'),
});
type SchemaProps = z.infer<typeof validationSchema>;

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: SchemaProps) => {
    login(`token_${data.email}_${Date.now()}`);
    navigate('/');
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="PurrrfectMatch" />
      <div className="flex items-center justify-center h-96">
        <form
          className="text-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <PawPrint className="w-12 h-12 text-stone-600 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-stone-700 mb-2">
            Login to your account
          </h2>
          <div>
            <Input
              className="border p-2 mb-2"
              placeholder="Email"
              {...register('email')}
              type="email"
            />
            {errors.email && (
              <div className="text-red-400 text-xs">{errors.email.message}</div>
            )}
          </div>
          <div>
            <Input
              className="border p-2 mb-2"
              placeholder="Password"
              {...register('password')}
              type="password"
            />
            {errors.password && (
              <div className="text-red-400 text-xs">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button className="bg-stone-600 text-white" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
