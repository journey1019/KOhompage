import { Container } from "@/components/Container";
import Image from 'next/image';

const OneImage = ({ item }: { item: string }) => {
    return(
        <Container>
            <div className="flex w-full max-w-4xl mx-auto rounded-2xl">
                <Image src={item} alt={item}
                       className="object-contain w-full h-full"
                       width={50} height={50}
                       unoptimized
                />
            </div>
        </Container>
    )
}

export default OneImage;