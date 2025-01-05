import { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Profile = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [clerkError, setClerkError] = useState(null);

    useEffect(() => {
        const handleOnlineStatus = () => setIsOnline(true);
        const handleOfflineStatus = () => setIsOnline(false);

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOfflineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOfflineStatus);
        };
    }, []);

    if (!isOnline) return null;

    try {
        return (
            <div className="flex items-center">
                <SignedIn>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                        <UserButton
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className="bg-indigo-600 text-white p-2 rounded-full cursor-pointer flex items-center justify-center">
                        <SignInButton mode="modal">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </SignInButton>
                    </div>
                </SignedOut>
            </div>
        );
    } catch (error) {
        console.error('Clerk failed to load:', error);
        setClerkError('There was an issue loading Clerk. Please check your connection or try again later.');
        return (
            <div className="text-red-600 font-bold">
                {clerkError || 'Failed to load Clerk. Please try again later.'}
            </div>
        );
    }
};

export default Profile;
