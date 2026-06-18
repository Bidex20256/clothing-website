import { Suspense } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="py-20 text-center text-slate">Loading...</div>}>{children}</Suspense>;
}
