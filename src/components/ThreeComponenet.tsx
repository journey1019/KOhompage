export default function ThreeComponent() {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto max-w-7xl py-12">
                {[
                    { value: '10,000 +', label: '최종 사용자' },
                    { value: '7,000,000 +', label: '월간 데이터' },
                    { value: '60,000 +', label: '선박' },
                ].map((item, index) => (
                    <div key={index}
                         className="flex flex-col w-full m-5 text-center justify-center dark:text-white">
                        <h3 className="text-6xl md:text-7xl lg:text-7xl font-bold mb-5">
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