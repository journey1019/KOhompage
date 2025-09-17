/** src/app/[locale]/online-store/layout.tsx */
import OnlineStoreGuard from './OnlineStoreGuard'

export default function OnlineStoreLayout({ children }: { children: React.ReactNode }) {
    return <OnlineStoreGuard>{children}</OnlineStoreGuard>
}
