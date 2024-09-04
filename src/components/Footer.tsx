export default function Footer() {
    return (
        // <section className='bg-slate-900 text-white py-2 text-sm text-center flex justify-between'>
        //     <p>{'06119 서울시 강남구 강남대로 500 논현빌딩 6층 Tel : 02-3444-7311 Fax : 02-3444-7312'}</p>
        //     <p>{'Copyright 2024 KOREA ORBCOMM Itd.'}</p>
        // </section>
        <section className='flex grid bg-slate-900 py-2 text-sm text-center'>
            <p className='text-white'>{'06119 서울시 강남구 강남대로 500 논현빌딩 6층 Tel : 02-3444-7311 Fax : 02-3444-7312'}</p>
            <p className='text-red-700'>{'Copyright 2024 KOREA ORBCOMM Itd.'}</p>
        </section>
    )
}