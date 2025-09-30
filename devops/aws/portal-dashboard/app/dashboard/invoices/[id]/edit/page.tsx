import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { userPool } from '@/app/services/cognito';
import { Metadata } from 'next';
import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};


export default async function Page({ params }: { params: { id: string }}) {
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

  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}