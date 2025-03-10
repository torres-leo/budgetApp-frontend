import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadcrumbElements = {
  text: string;
  path?: string;
  currentPage?: boolean;
};

interface BreadcrumbProps {
  items: BreadcrumbElements[];
}

function BreadcrumbComponent({ items }: BreadcrumbProps) {
  const renderBreadcrumbsElements = () => {
    return items.map((element, index) => {
      const { text, path, currentPage } = element;
      const isLastItem = index === items.length - 1;

      return (
        <React.Fragment key={crypto.randomUUID()}>
          <BreadcrumbItem >
            {currentPage ? (
              <BreadcrumbPage>{text}</BreadcrumbPage>
            ) : path ? (
              <BreadcrumbLink asChild>
                <Link href={path}>{text}</Link>
              </BreadcrumbLink>
            ) : (
              <>{text}</>
            )}
          </BreadcrumbItem>
          {!isLastItem && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };

  return (
    <Breadcrumb
      title='Navigate between previous pages'
      className='mt-5 mb-10 bg-indigo-100 inline-flex p-1 px-3 rounded-lg'>
      <BreadcrumbList className='[&>li>span]:font-medium [&>li>span]:text-indigo-600'>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/admin'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {renderBreadcrumbsElements()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
