import SolutionCarousel from '@/components/SolutionCarousel';
import SolutionCard from '@/components/SolutionCard';
import { getAllSolutions } from '@/service/solutions';

export default async function CarouselSolutions() {
    const solutions = await getAllSolutions();

    return(
        <section className='my-40'>
            <SolutionCarousel>
                {solutions.map(solution => <SolutionCard key={solution.solution} solution={solution}/>)}
            </SolutionCarousel>
        </section>
    )
}