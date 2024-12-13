import SameBreadcrumbs from '@/components/SameBreadcrumbs';
import { breadcrumbs } from '@/service/resources';

export default function BoardPage() {
    return(
        <section>
            <SameBreadcrumbs items={breadcrumbs} current="board" />
            <h1 className="text-black text-5xl items-start font-bold pt-5 py-12">Board Home</h1>
            <span>Newsletter</span>
            <span>Article</span>
        </section>
    )
}