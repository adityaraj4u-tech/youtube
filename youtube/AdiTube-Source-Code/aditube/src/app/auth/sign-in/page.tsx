export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold">Sign in to AdiTube</h1>
        <p className="text-muted-foreground">
          Authentication will be connected in Phase 2 using Supabase Auth.
        </p>
        <p className="text-sm text-muted-foreground">
          For now this is a placeholder.
        </p>
        <a
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
