import PageHero from '@/components/PageHero';
import SerachCategory from '@/components/SearchCategory';
import HardwareGrid from '@/components/(Hardware)/HardwareGrid';

export const metadata = {
    title: "Movie Home",
}

/** 도메인 API 호출 */
/*const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
async function getMovies() {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
}*/

export default async function MoviePage() {

    return (
        <div>
            <PageHero
                size="py-28"
                url="/images/befo_ko/M2M_IoT.jpg"
                intro="KOREAORBCOMM FOR FINANCIAL SERVICES"
                title="글로벌 통신으로 경험을 향상시키세요"
                subtitle="이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다."
            />
            <SerachCategory />
            <HardwareGrid />
            {/*{movies.map(movie => <li key={movie.path}><Link href={`/movies/${movie.path}`}>{movie.title}</Link></li>)}*/}
        </div>
    )
}