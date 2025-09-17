/** src/app/[locale]/online-store/OnlineStoreGuard.tsx */
'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clearPaymentSession, isLocalTokenValidNow } from '@/lib/api/paymentSession';

export default function OnlineStoreGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    // locale 추출: /ko/... 또는 /en/...
    const locale = pathname?.split('/')[1] || 'ko'
    const loginPath = `/${locale}/online-store/login`

    useEffect(() => {
        const kickOut = () => {
            clearPaymentSession()
            router.replace(loginPath)
        }

        // 최초 진입 체크
        if (!isLocalTokenValidNow() && pathname !== loginPath) {
            kickOut()
            return
        }

        // 탭 복귀/가시성 변경 시 재검사
        const onVis = () => {
            if (document.visibilityState === 'visible') {
                if (!isLocalTokenValidNow() && pathname !== loginPath) kickOut()
            }
        }
        document.addEventListener('visibilitychange', onVis)

        // 30초마다 재검사(가벼운 폴링)
        const iv = setInterval(() => {
            if (!isLocalTokenValidNow() && pathname !== loginPath) kickOut()
        }, 30_000)

        return () => {
            document.removeEventListener('visibilitychange', onVis)
            clearInterval(iv)
        }
    }, [pathname, loginPath, router])

    return <>{children}</>
}
