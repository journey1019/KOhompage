// CarouselSolutions.tsx
import SolutionCarousel from '@/components/SolutionCarousel';
import SolutionsCard from '@/components/SolutionsCard';
import { Solution } from '@/service/solutions';

type Props = { solutions: Solution[] }; // props 타입 정의

export default function Solutions({ solutions }: Props) {
    return (
        <SolutionCarousel>
            {solutions.map(solution => (
                <SolutionsCard key={solution.solution} solution={solution} />
            ))}
        </SolutionCarousel>
);
}
