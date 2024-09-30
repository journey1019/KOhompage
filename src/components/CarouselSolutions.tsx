// CarouselSolutions.tsx
import SolutionCarousel from '@/components/SolutionCarousel';
import SolutionCard from '@/components/SolutionCard';
import { Solution } from '@/service/solutions';

type Props = { solutions: Solution[] }; // props 타입 정의

export default function CarouselSolutions({ solutions }: Props) {
    return (
        <SolutionCarousel>
            {solutions.map(solution => (
                <SolutionCard key={solution.solution} solution={solution} />
            ))}
        </SolutionCarousel>
    );
}
