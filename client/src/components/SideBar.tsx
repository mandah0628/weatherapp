"use client"
import { motion, AnimatePresence } from "framer-motion";


export default function SideBar({ isOpen, cities, onClose }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* sidebar */}
          <motion.div
            className="fixed top-16 left-0 z-50 w-96 bg-gray-400 max-w-[80%] h-[calc(100vh_-_64px)]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-center">
              <h2>Saved Cities</h2>
            </div>
            {cities.length === 0 ? (
              <p className="">No cities saved yet.</p>
            ) : (
              <ul className="flex items-center justify-center flex-col">
                {cities.map((city : any, index : number) => (
                  <li key={index}>
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
