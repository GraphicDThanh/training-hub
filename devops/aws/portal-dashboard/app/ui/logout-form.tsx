'use client';

import { userPool } from '@/app/services/cognito';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function LogoutForm() {
  const router = useRouter();

  async function handleSubmit() {
    const user = userPool.getCurrentUser();
    console.log('user', user)
    const response = await user?.signOut();
    console.log('Log out.', response);
    router.push('/login')  
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}
