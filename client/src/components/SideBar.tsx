"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import SignInForm from "@/components/SignInForm";
import RegisterForm from "@/components/RegisterForm";

export default function SideBar({ isSideBarOpen, userCities, toggleSidebar } :
   {isSideBarOpen :boolean; userCities : any[] | null; toggleSidebar : () => void }) {
  const { authState } = useAuth();
  const [showForm, setShowForm] = useState<"login" | "register">("login");


  return (
    <AnimatePresence>
      {isSideBarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />

          {/* Sidebar */}
          <motion.div
            className={`fixed top-16 left-0 z-50 w-96 max-w-[80%] h-[calc(100vh_-_64px)] border-r border-t rounded p-4 overflow-y-auto`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <h2 className="text-center font-bold text-3xl py-4">Saved Cities</h2>

            {authState ? (
              userCities?.length === 0 ? (
                <p className="text-center text-gray-600">No cities saved yet.</p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {userCities?.map((city: any, index: number) => (
                    <div key={index} className="p-2 bg-white rounded shadow w-full text-center">
                      {city.name}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <>
                <p className="text-center mb-4">
                  Sign in or register to save your favorite cities!
                </p>

                {/* Show the selected form */}
                {showForm === "login" && <SignInForm showForm={setShowForm}/>}
                {showForm === "register" && <RegisterForm showForm={setShowForm}/>}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
