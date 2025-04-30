// src/app/[locale]/auth/error/page.tsx
export default function ErrorPage() {
    return (
        <div className="p-8 text-center text-red-600">
            <h1 className="text-2xl font-bold">로그인 중 문제가 발생했습니다.</h1>
            <p className="mt-4">이메일 또는 비밀번호를 확인해주세요.</p>
        </div>
    );
}
