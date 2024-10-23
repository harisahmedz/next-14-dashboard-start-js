import { searchParamsCache } from '@/lib/searchparams';

import React from 'react';
import EmployeeListingPage from './_components/employee-listing-page';



export const metadata = {
  title: 'Dashboard : Employees'
};

export default async function Page({ searchParams }) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <EmployeeListingPage />;
}
