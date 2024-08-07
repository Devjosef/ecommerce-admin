import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId,
    }
  });

  if (!store) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <a href={`/dashboard/${params.storeId}/privacypolicy`} className="text-blue-500 underline">Privacy Policy</a>
        <a href={`/dashboard/${params.storeId}/data-request`} className="text-blue-500 underline ml-4">Manage Your Data</a>
      </div>
      {children}
    </>
  );
};