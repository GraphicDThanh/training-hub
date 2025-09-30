import { fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';
import { userPool } from '@/app/services/cognito';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Create Invoice',
};


export default async function Page() {
  // ----- Start Validation -----
  const router = useRouter();

  useEffect(() => {
    const authUser = userPool.getCurrentUser();
    // if there is no authenticated user, redirect to login page_
    if (!authUser) {
      router.push("/login")
    }
  }, [])
  // ----- End Validation -----

  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}