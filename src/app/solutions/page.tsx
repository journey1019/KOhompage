import { Metadata } from 'next';
import SolutionTop from '@/components/(Solution)/SolutionTop';
import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';

export const metadata: Metadata = {
    title: 'Solutions',
    description: 'KOREA ORBCOMM 의 Solutions 소개'
}

export default function SolutionsPage() {
    return(
        <section>
            <SolutionTop />
            <Greet />
            <Intro />
            <Card/>
            <Advantage/>
        </section>
    )
}