export default function ThreeComponent() {
    return (
        <section className="w-full dark:bg-gray-900">
            <div
                className="flex flex-col md:flex-row max-w-screen-2xl mx-auto py-20 px-5 overflow-hidden justify-center">
                {[
                    { value: '66%', label: 'Increase in Conversion' },
                    { value: '36% +', label: 'Increase in Profit' },
                    { value: '17% +', label: 'increase in User' },
                    { value: '11%', label: 'Increase in Conversion Rate' },
                    // gain in operational efficiency 운용 효율성 증가
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