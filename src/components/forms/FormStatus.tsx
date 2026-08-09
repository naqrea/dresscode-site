export function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200"
    >
      {message}
    </p>
  );
}

export function FormSuccess({ title, message }: { title: string; message: string }) {
  return (
    <div role="status" className="border border-dc-accent/40 bg-dc-accent/10 px-6 py-8 text-center">
      <p className="font-heading text-xl uppercase tracking-wide text-dc-white">{title}</p>
      <p className="mt-2 text-sm text-dc-white/60">{message}</p>
    </div>
  );
}
