"use client";

import { AxiosBackend } from "@/utils/Axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();         
  const token = searchParams.get("token");

  const [verifyLoading, setVerifyLoading] = useState(true);
  const [verified,       setVerified]     = useState(false);
  const [errorMessage,   setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setVerifyLoading(false);
      setErrorMessage("Missing token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        setVerifyLoading(true);

        const res = await AxiosBackend.post("/user/verify-email", { token });
        if (res.status === 200) {
          setVerified(true);
          setTimeout(() => router.push("/"), 3000);  
        }
      } catch (err: any) {
        setVerified(false);
        setErrorMessage(
          err.response?.data?.error ?? "An unexpected error occurred."
        );
      } finally {
        setVerifyLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 30%,
          #ffffff 0%,
          #ffff99 10%,
          #87cefa 60%,
          #00aaff 100%)`,
      }}
    >
      {verifyLoading ? (
        <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center max-w-md w-full">
          {verified ? (
            <>
              <h1 className="text-2xl font-bold text-green-600 mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-700">
                Your email address has been successfully verified! You will be
                redirected to the home page now.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-red-600 mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-700">
                {errorMessage ?? "Invalid or expired token."}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
