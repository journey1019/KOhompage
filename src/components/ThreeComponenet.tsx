export default function ThreeComponent() {
    return (
        // <section className="flex flex-col md:flex-row max-w-screen-2xl mx-auto my-5 p-5 overflow-hidden justify-center">
        //     {[
        //         { value: '10억 +', label: '최종 사용자' },
        //         { value: '50억 +', label: '월간 데이터' },
        //         { value: '30만 +', label: '선박' },
        //     ].map((item, index) => (
        //         <div key={index} className="flex flex-col w-full m-5 text-center justify-center">
        //             <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-5">
        //                 {item.value}
        //             </h3>
        //             <p className="text-lg md:text-xl lg:text-2xl font-semibold">
        //                 {item.label}
        //             </p>
        //         </div>
        //     ))}
        // </section>
        <section className="w-full dark:bg-gray-900">
            <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto py-20 px-5 overflow-hidden justify-center">
                {[
                    { value: '60억 +', label: '최종 사용자' },
                    { value: '50억 +', label: '월간 데이터' },
                    { value: '30만 +', label: '선박' },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col w-full m-5 text-center justify-center dark:text-white">
                        <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-5">
                            {item.value}
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}