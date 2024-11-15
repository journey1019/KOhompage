import BlogCard from '@/components/(Blog)/BlogCard';
import BlogHome from '@/components/(Blog)/BlogHome';
import BlogRecent from '@/components/(Blog)/BlogRecent';
import KOBlog from '@/components/(Blog)/KOBlog';

export default function BlogPage() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <BlogHome/>
            <BlogCard/>
            <BlogRecent/>
            <KOBlog/>
        </section>
    )
}