import Header from '@/components/(CaseStudies)/Header';
import Diagram from '@/components/(CaseStudies)/Diagram';
import Advantage from '@/components/(CaseStudies)/Advantages';
import BlockQuote from '@/components/(CaseStudies)/BlockQuote';
import TextForm from '@/components/(CaseStudies)/TextForm';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function CaseStudies() {
    return(
        <>
            <Header />
            <Advantage />
            {/*<Diagram />*/}
            <TextForm />
            {/*<MarkdownEditor />*/}
            <BlockQuote />
        </>
    )
}