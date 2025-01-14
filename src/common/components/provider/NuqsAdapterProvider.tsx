import { JSX, ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

/**
 * @description nuqs 라이브러리는 URL 쿼리 문자열을 쉽게 관리하고 상태로 사용합니다.
 * - useQueryState Hook : 쿼리 문자열을 상태로 관리할 수 있게 해주는 Hook
 * @example
 * ```tsx
 * 'use client';
 *
 * import { useQueryState } from 'nuqs';
 *
 * export default function ReactQueryDemo() {
 * const [name, setName] = useQueryState('name');
 * return (
 *  <div>
 *    <input value={name} onChange={(e) => setName(e.target.value)} />
 *    <p>{name}</p>
 *    <button onClick={() => setName('')}>Clear</button>
 *    <button onClick={() => setName('John')}>Set John</button>
 *  </div>
 *  );
 * }
 * ```
 * @see https://nuqs.47ng.com/docs/basic-usage
 */
export function NuqsAdapterProvider({ children }: { children: ReactNode }): JSX.Element {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
