import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // metadata 에 request url 추가를 위한 x-url 헤더 추가
  response.headers.set('x-url', request.nextUrl.href);
  return response;
}

/**
 * @description 미들웨어 설정
 * - matcher: 미들웨어를 적용할 경로를 지정합니다.
 */
export const config = {
  matcher: [
    /**
     * @description API 요청이 아닌 경우에만 미들웨어를 적용합니다.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/static).*)',
  ],
};
