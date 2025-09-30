import { userPool } from '@/app/services/cognito';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return <div>Consumers Page</div>
}