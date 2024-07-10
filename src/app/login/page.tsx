import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import { ProvidersPanel } from './ProvidersPanel';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/gallery');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div className="container flex justify-center">
      <div className="relative">
        <div className="my-24 flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
          <Link
            href="/"
            className="group btn btn-outline btn-primary absolute left-0 top-4 flex items-center px-4 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
          <form className="text-foreground flex w-full flex-1 flex-col justify-center gap-2">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="input input-bordered input-primary w-full px-4 py-2"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered input-primary w-full px-4 py-2"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <SubmitButton
              formAction={signIn}
              className="btn btn-primary px-4 py-2"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            <SubmitButton
              formAction={signUp}
              className="btn btn-outline btn-primary px-4 py-2"
              pendingText="Signing Up..."
            >
              Sign Up
            </SubmitButton>
          </form>
          <ProvidersPanel />
          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
