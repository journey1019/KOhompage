export default function Intro() {
    return (
        // <section className="relative my-10 flex h-screen">
        //     {/* 고정된 배경 이미지 */}
        //     <div className="absolute inset-0 bg-fixed bg-cover bg-center">
        //         <div
        //             className="h-full w-full bg-cover bg-center"
        //             style={{
        //                 backgroundImage: "url('https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg')",
        //             }}
        //         />
        //         {/* 어두운 오버레이 */}
        //         <div className="absolute inset-0 bg-black bg-opacity-30" />
        //     </div>
        //
        //     {/* 안쪽 콘텐츠 */}
        //     <main className="relative flex flex-col justify-center items-center text-white z-10 p-5">
        //         <h1 className="text-4xl font-bold mb-5">고정 배경과 스크롤되는 콘텐츠</h1>
        //         <p className="text-xl mb-5">
        //             이 섹션은 배경 이미지를 고정시키고, 스크롤할 때 안쪽 콘텐츠는 이동하는 구조입니다.
        //         </p>
        //         <div className="inside">
        //             {/* 추가 콘텐츠 작성 가능 */}
        //         </div>
        //     </main>
        // </section>

        // <section className="relative my-10">
        //     {/* 스크롤되는 콘텐츠 */}
        //     <main className="relative flex flex-col justify-center items-center text-white z-10 p-5">
        //         <h1 className="text-4xl font-bold mb-5">컴포넌트가 스크롤되는 구조</h1>
        //         <p className="text-xl mb-5">
        //             이 섹션은 컴포넌트가 스크롤되지만, 배경 이미지는 페이지 하단에 고정되어 있습니다.
        //         </p>
        //         <p className="text-xl mb-5">
        //             컴포넌트는 위에서 스크롤되며, 고정된 이미지는 움직이지 않습니다.
        //         </p>
        //         {/* 긴 내용으로 스크롤을 유도 */}
        //         <div className="h-[150vh]" />
        //     </main>
        //
        //     {/* 고정된 하단 이미지 */}
        //     <div>
        //         <div
        //             className="fixed bottom-0 left-0 w-full h-[50vh] bg-cover bg-center z-0"
        //             style={{
        //                 backgroundImage: 'url(\'https://cdn.imweb.me/thumbnail/20240326/0097dcac1308f.jpg\')',
        //             }}
        //         />
        //     </div>
        //     <div className="absolute inset-0 bg-black bg-opacity-30" />
        // </section>


        <section className="relative my-10 h-[60vh] dark:none">
            {/* Fixed background image */}
            <div
                className="absolute inset-0 w-full h-[60vh] bg-fixed bg-cover bg-center z-0"
                style={{
                    backgroundImage:
                        "url('https://www.orbcomm.co.kr/resources/img/background/KOREA_ORBCOMM_reeferconnect_2.jpg')",
                }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 z-0 h-[60vh]" />

            {/* Scrollable content */}
            <main className="relative flex flex-col justify-center items-start text-white z-10 h-[60vh] pl-20 pr-5">
                <div className="text-start">
                    <h1 className="mb-5 text-4xl font-bold tracking-tight py-4">데이터 기반 의사 결정을 위한 통찰력으로 고객 지원</h1>
                    <p className="text-xl mb-5 py-5">
                        ORBCOMM의 선구적인 IoT 기술로 운영을 최적화하고, 수익성을 극대화하고, 보다 지속 가능한 미래를 구축하세요.<br />
                        30년의 경험을 바탕으로 ORBCOMM은 데이터의 힘을 통해 전 세계적으로 백만 개가 넘는 자산을 관리할 수 있도록 지원합니다.
                    </p>
                    <button className="inline-flex items-center px-6 py-3 font-medium text-center rounded-full bg-gray-100 bg-opacity-90 hover:bg-gray-300 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:hover:bg-red-800 dark:focus:ring-red-100">
                        <p className="text-base text-sm font-semibold text-red-800">
                            KOREA ORBCOMM에 대해 알아보세요
                        </p>
                    </button>
                </div>
            </main>
        </section>
    )
}