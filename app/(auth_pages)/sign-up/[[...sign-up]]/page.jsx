"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const SignUp = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignUp), { ssr: false });

export default function SignUpPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate a loading delay for the skeleton effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="w-full flex flex-col lg:flex-row h-screen">
      <div className="relative flex-1 flex items-center justify-center bg-gray-900 p-4 lg:p-8">
        <div className="relative z-10 w-full max-w-md text-center">
          <img
            src="logo.webp"
            alt="Budget Beam Logo"
            className="mx-auto w-32 md:w-28 lg:w-36"
            loading="lazy"
          />
          <div className="mt-8 space-y-4">
            <h3 className="text-white text-3xl font-bold">
              Take control of your finances
            </h3>
            <p className="text-gray-300">
              Join Budget Beam and start tracking your expenses effortlessly!!!
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden justify-center">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Trusted by thousands of users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(0, 212, 255, 0.2) 4.54%, rgba(0, 128, 128, 0.26) 34.2%, rgba(0, 212, 255, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>

      <div className="flex flex-1 justify-center items-center p-6">
        <div className="border-2 border-gray-400 rounded-lg shadow-lg hover:border-gray-800">
          {isLoading ? (
            <div className="p-6 space-y-4 flex flex-col">
              <Skeleton className="w-full h-10 rounded-md" />
              <div className='h-5 mt-2'></div>
              <div className="flex justify-between space-x-4">
                <Skeleton className="w-[100px] h-[40px] rounded-md" />
                <Skeleton className="w-[100px] h-[40px] rounded-md" />
                <Skeleton className="w-[100px] h-[40px] rounded-md" />
              </div>
              <div className='h-4 m-2'></div>
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <div className='h-0 m-0'></div>
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <div className='h-0 m-0'></div>
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <Skeleton className="w-full h-5 rounded-md mt-1" />
              <div className='h-0 m-0'></div>

              <div className='h-2 m-2'></div>
              <Skeleton className="w-full h-24 rounded-md mt-4" />

            </div>
          ) : isOnline ? (
            <SignUp />
          ) : (
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">You are offline</h2>
              <p className="text-gray-600">Please check your internet connection and try again.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
