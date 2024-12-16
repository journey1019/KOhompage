type Props = {
    params: {
        slug: string;
    }
}
export default function ST6000SeriesPage({params}: Props) {
    return(
        <h1>{params.slug} Series 제품 설명 페이지</h1>
    )
}

export function generateStaticParams() {
    const products = ['ST6100', 'GT'];
    return products.map(product => ({
        slug: product,
    }));
}