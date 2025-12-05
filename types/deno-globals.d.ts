// Minimal Deno globals used by Supabase Edge Functions for local TypeScript checking.
// This file provides just enough typing so editors/tsc don't complain about `Deno`.
declare namespace Deno {
  namespace env {
    function get(name: string): string | undefined;
  }

  function serve(handler: (req: Request) => Promise<Response> | Response): void;
}

declare const Deno: typeof Deno;

export {};
