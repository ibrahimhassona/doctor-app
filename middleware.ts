import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const userPages = ['/agenda','/daywork','/logout','/home','/previousCases']
  // Check if logged in or not
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.user.id);
  console.log(req.nextUrl.pathname)
  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  if(session?.user.id !== process.env.NEXT_PUBLIC_ID){
    if(userPages.includes(req.nextUrl.pathname)){
      return NextResponse.rewrite(req.nextUrl);
    }else{
     
  const defaultRedirectUrl = '/cantAccess';  
  return NextResponse.rewrite(new URL(defaultRedirectUrl, req.url));
    }
    }

  // return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// =======================================================

// // قائمة الصفحات التي يمكن للمستخدم الوصول إليها
// const allowedPages = ['/about', '/dashboard', '/database'];

// // فحص صلاحيات المستخدم
// if (currentUser && allowedPages.includes(request.nextUrl.pathname)) {
//     // إذا كان المستخدم مسجل الدخول ولديه الصلاحية للوصول إلى الصفحة
//     // يمكنك تنفيذ الإجراءات المناسبة هنا، مثل عرض الصفحة أو تنفيذ إجراء آخر
//     // على سبيل المثال:
//     return Response.redirect(request.nextUrl); // توجيه المستخدم إلى الصفحة التالية
// } else {
//     // إذا لم يكن للمستخدم الصلاحية للوصول إلى الصفحة
//     // يمكنك تنفيذ إجراء مثل عرض رسالة خطأ أو إعادة توجيه المستخدم إلى صفحة أخرى
//     // على سبيل المثال:
//     return new Response('Unauthorized', { status: 401 }); // عرض رسالة خطأ 401 غير مصرح بالوصول
// }




