const stats = [
    { id: 1, name: '운영 효율성 향상', value: '58 %' }, // gain in operational efficiency
    { id: 2, name: '홍수 대비 계획 수립', value: '28 %' },
    { id: 3, name: '연간 신규 사용자', value: '46,000' }, //New users annually
]

export default function Advantage() {
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 bg-gray-100 rounded-lg">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4 py-12">
                                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}