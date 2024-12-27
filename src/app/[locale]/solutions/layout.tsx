interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string; solutions?: string; slug?: string }; // id 추가
}
export const dynamicParams = true; // 동적 경로 허용

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    return(
        <main>{children}</main>
    )
}
export default Layout;