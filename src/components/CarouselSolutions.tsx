import SolutionCarousel from '@/components/SolutionCarousel';
import SolutionCard from '@/components/SolutionCard';
import { getAllSolutions } from '@/service/solutions';

export default async function CarouselSolutions() {
    const solutions = await getAllSolutions();

    return(
        <SolutionCarousel>
            {solutions.map(solution => <SolutionCard key={solution.solution} solution={solution}/>)}
        </SolutionCarousel>
    )
}