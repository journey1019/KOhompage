import Image from 'next/image';

const products = [
    {
        id: 1,
        name: '개인적인 경험 구축',
        imageSrc: 'https://sendbird.imgix.net/cms/healthcare-chat-personal-experiences.png?auto=format,compress&crop=faces&w=900',
        imageAlt: "Front of men's Basic Tee in black.",
        color: '친구와 메시지를 주고받는 듯한 느낌으로 HIPAA를 준수하는 인앱 대화 기능을 사용하여 환자에게 심리스한 의료 서비스를 제공하세요.',
    },
    {
        id: 1,
        name: '환자 중심 커뮤니케이션 제공',
        imageSrc: 'https://sendbird.imgix.net/cms/healthcare-chat-patient-communication.png?auto=format,compress&crop=faces&w=900',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        color: '대화 정보를 유지하여 환자가 개인화된 경험을 얻고, 말했던 내용을 되풀이할 필요 없게 만드세요.',
    },
    {
        id: 2,
        name: '의료진 및 환자 참여도 향상',
        imageSrc: 'https://sendbird.imgix.net/cms/healthcare-chat-engage-providers-patients.png?auto=format,compress&crop=faces&w=900',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        color: '환자가 모든 여정 단계에서 필요한 정보를 알 수 있도록 푸시 알림과 메시지를 적극적으로 전송하세요.'
    },
]

export default function Advantage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-52">
                                {/*<img*/}
                                {/*    alt={product.imageAlt}*/}
                                {/*    src={product.imageSrc}*/}
                                {/*    className="h-full w-full object-cover object-center lg:h-full lg:w-full"*/}
                                {/*/>*/}
                                <Image
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    width={500} // 이미지의 너비 (적절한 값으로 변경)
                                    height={500} // 이미지의 높이 (적절한 값으로 변경)
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    unoptimized
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md text-gray-700 font-semibold">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </h3>
                                    <p className="mt-3 text-sm text-gray-500">{product.color}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}