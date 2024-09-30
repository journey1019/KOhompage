export default function SolutionTop() {
    return (
        <section className="relative flex py-52">
            {/* 고정된 배경 이미지 */}
            <div className="absolute inset-0 bg-fixed bg-cover bg-center">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg')",
                    }}
                />
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-30" />
            </div>

            {/* 안쪽 콘텐츠 */}
            <main className="relative flex flex-col justify-center items-start text-white z-10 p-5 ml-32">
                <h1 className="text-lg font-bold mb-5">SENDBIRD FOR RINANCIAL SERVICES</h1>
                <h1 className="text-6xl font-bold mb-5">글로벌 통신으로 경험을 향상시키세요</h1>
                <p className="text-base mb-5">이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다.</p>
                <div className="inside">
                    {/* 추가 콘텐츠 작성 가능 */}
                </div>
            </main>
        </section>
    )
}