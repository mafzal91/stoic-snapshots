import { adminLogin } from "@/app/actions/adminLogin";

export const metadata = {
  title: "Admin — Stoic Snapshots",
};

export default async function AdminLoginPage(props: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await props.searchParams;

  return (
    <div className="w-full max-w-sm px-4 py-12">
      <h1 className="text-2xl font-semibold text-primary mb-1">Admin access</h1>
      <p className="text-secondary mb-6">
        Enter the admin password to manage themes.
      </p>

      <form action={adminLogin}>
        <input type="hidden" name="from" value={from ?? "/themes/new"} />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-primary mb-1"
        >
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          className="focus:ring-primary focus:border-primary block w-full shadow-xs sm:text-sm border-primary rounded-md"
        />

        {error && (
          <p className="mt-2 text-sm text-secondary">Incorrect password.</p>
        )}

        <button
          type="submit"
          className="mt-5 inline-flex justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border border-primary"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
