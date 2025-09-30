
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getStaffs } from '@/app/services';
import { lusitana } from '@/app/ui/fonts';
import {
  StaffTableType,
  FormattedStaffsTable,
} from '@/app/lib/definitions';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/staffs/table';

export default function Page() {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    getStaffs().then(
      res => {
        console.log('res: ', res)
        setStaffs(res.data)
      }
    );
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Staffs</h1>
      </div>
       <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table staffs={staffs}/>
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
{/* 
      <div>

        {staffs?.map((staff: StaffTableType) => <div key={staff.uuid}>{staff.first_name}</div>)}
      </div> */}
    </div>
  );
}