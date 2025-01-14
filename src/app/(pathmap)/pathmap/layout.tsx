import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pathmap',
  description: 'Pathmap is a tool for visualizing the structure of your codebase.',
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <section className={'wrap'}>{children}</section>;
}
