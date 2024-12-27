interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string; solutions?: string; slug?: string }; // id 추가
}
const Layout: React.FC<LayoutProps> = ({ children, params }) => {
    return(
        <main>{children}</main>
    )
}
export default Layout;