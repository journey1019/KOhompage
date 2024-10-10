interface ImageTopPageProps {
    size: string;
    url: string;
    title: string;
    subtitle: string;
    description: string;
    textPosition?: 'left' | 'center' | 'right'; // 텍스트 위치 조정 가능
}


export default function PageTopImage({size, url, title, subtitle, description, textPosition =  'left'}: ImageTopPageProps) {
    const getTextPositionClass = () => {
        switch(textPosition) {
            case 'center':
                return 'items-center text-center';
            case 'right':
                return 'items-end text-right';
            default:
                return 'items-start text-left'
        }
    }

    return (
        <section className={`relative flex ${size}`}>
            {/* 고정된 배경 이미지 */}
            <div className="absolute inset-0 bg-fixed bg-cover bg-center">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${url})`,
                    }}
                />
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-30" />
            </div>

            {/* 안쪽 콘텐츠 */}
            <main className="relative flex flex-col justify-center items-start text-white z-10 p-5 ml-32">
                <h1 className="text-lg font-bold mb-5">{title}</h1>
                <h1 className="text-6xl font-bold mb-5">{subtitle}</h1>
                <p className="text-base mb-5">{description}</p>
                <div className="inside">
                    {/* 추가 콘텐츠 작성 가능 */}
                </div>
            </main>
        </section>
    )
}