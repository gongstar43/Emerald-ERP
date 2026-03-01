import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../lib/i18n';
import { supabase } from '../../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Building2, Globe } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { t, locale, setLocale } = useLanguage();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          navigate('/', { replace: true });
        }
      } catch (error) {
        // Silently handle session check errors
      } finally {
        setCheckingAuth(false);
      }
    };

    checkExistingSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        navigate('/', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (email: string, password: string, name: string) => {
    // Call server to create user with service role
    const response = await fetch(
      `https://cjlcbaiekxdnpicpnsnf.supabase.co/functions/v1/make-server-bfdaa8c0/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create account');
    }

    const result = await response.json();
    return result;
  };

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        try {
          await handleSignUp(email, password, name);
          toast.success(locale === 'ar' ? 'تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...' : 'Account created successfully! Signing in...');
          
          // Wait a moment before signing in
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Auto sign in after signup
          await handleSignIn(email, password);
          toast.success(locale === 'ar' ? 'مرحباً بك!' : 'Welcome!');
        } catch (signupError: any) {
          // If signup fails, show error
          throw signupError;
        }
      } else {
        await handleSignIn(email, password);
        toast.success(locale === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully');
      }
    } catch (error: any) {
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message?.includes('Invalid login credentials')) {
        if (isSignUp) {
          errorMessage = locale === 'ar' 
            ? 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.'
            : 'Error creating account. Please try again.';
        } else {
          errorMessage = locale === 'ar' 
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            : 'Invalid email or password';
        }
      } else if (!errorMessage) {
        errorMessage = locale === 'ar' ? 'حدث خطأ في العملية' : 'An error occurred';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold">ERP System</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
            >
              <Globe className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
          <CardTitle className="text-2xl">{isSignUp ? t('signup') : t('login')}</CardTitle>
          <CardDescription>
            {isSignUp
              ? (locale === 'ar' ? 'قم بإنشاء حساب جديد' : 'Create a new account')
              : (locale === 'ar' ? 'قم بتسجيل الدخول إلى حسابك' : 'Sign in to your account')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={locale === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('loading') : (isSignUp ? t('signup') : t('login'))}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline"
            >
              {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}