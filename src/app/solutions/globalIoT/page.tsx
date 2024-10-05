import SolutionTop from '@/components/(Solution)/SolutionTop';
import Greet from '@/components/(Solution)/Greet';
import Intro from '@/components/(Solution)/Intro';
import Card from '@/components/(Solution)/Card';
import Advantage from '@/components/(Solution)/Advantage';
import ContentForm from '@/components/(Solution)/ContentForm';
import UseCase from '@/components/(Solution)/UseCase';
import Hardware from '@/components/(Solution)/Hardware';
import FAQ from '@/components/(Solution)/FAQ';
import { Metadata } from 'next';
import Download from '@/components/(Solution)/Download';

export const metadata: Metadata = {
    title: 'Solution | %s',
    description: 'KOREA ORBCOMM 의 Solutions 소개'
}

export default function GlobalIoT(){
    return(
        <section>
            <SolutionTop />
            <Greet />
            <Intro />
            <Card/>
            <Advantage/>
            <ContentForm/>
            <UseCase/>
            <Hardware/>
            <FAQ/>
            <Download/>
        </section>
    )
}