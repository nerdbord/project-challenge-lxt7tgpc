'use client';

import { createClient } from '@/utils/supabase/client';
import { DiscordLogo } from '@/assets/icons/DiscordLogo';

export const ProvidersPanel = () => {
  const supabase = createClient();

  const loginWithDiscord = () => {
    supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="mt-5 flex flex-col items-center text-center">
      Continue with:
      <a
        className="mb-3 flex w-1/2 items-center justify-center rounded px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        style={{ backgroundColor: '#FFF' }}
        onClick={loginWithDiscord}
        role="button"
      >
        <DiscordLogo />
      </a>
    </div>
  );
};
