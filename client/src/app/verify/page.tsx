import { Suspense } from "react";
import VerifyClient from "./VerifyEmail";


export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          {/* Minimal spinner while searchParams hydrate */}
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
