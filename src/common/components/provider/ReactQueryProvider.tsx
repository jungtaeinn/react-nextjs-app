'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX, ReactNode, useState } from 'react';

/**
 * @description _makeQueryClient 함수는 react-query의 QueryClient를 생성합니다.
 * @see https://tanstack.com/query/latest/docs/framework/react/quick-start
 */
function _makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 캐시된 데이터가 `stale` 상태로 간주되기까지 캐싱 시간을 1분으로 설정합니다.
        staleTime: 60 * 1000,
      },
    },
  });
}

/**
 * @description ReactQueryProvider는 react-query의 QueryClientProvider를 제공합니다.
 * - react-query는 서버에서 데이터를 가져오는 데 사용되는 라이브러리입니다.
 * @see https://react-query.tanstack.com/
 */
export function ReactQueryProvider({ children }: { children: ReactNode }): JSX.Element {
  const [queryClient] = useState(_makeQueryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
