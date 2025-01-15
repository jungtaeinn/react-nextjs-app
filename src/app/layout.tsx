import { ReactNode } from 'react';
import Provider from '../common/provider';

/**
 * @description RootLayout은 HTML의 루트 레이아웃을 정의합니다.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'ko'}>
      <head>
        <title>react-nextjs-app</title>
      </head>
      <body>
        <Provider.NuqsAdapter>
          <Provider.ReactQuery>{children}</Provider.ReactQuery>
        </Provider.NuqsAdapter>
      </body>
    </html>
  );
}
