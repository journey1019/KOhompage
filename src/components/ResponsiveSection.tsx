export default function ResponsiveSection() {
    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between p-4">
                <section className="flex-2 bg-gray-200 p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">왼쪽 섹션</h2>
                    <p>이 섹션은 오른쪽 섹션보다 더 많은 공간을 차지합니다.</p>
                </section>
                <section className="flex-1 bg-gray-300 p-4">
                    <h2 className="text-lg font-semibold">오른쪽 섹션</h2>
                    <p>이 섹션은 왼쪽 섹션보다 적은 공간을 차지합니다.</p>
                </section>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between p-4">
                <section className="flex-1 bg-gray-200 p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">왼쪽 섹션</h2>
                </section>
                <section className="flex-1 bg-gray-300 p-4">
                    <h2 className="text-lg font-semibold">오른쪽 섹션</h2>
                </section>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between p-4">
                <section className="flex-none w-40 bg-gray-200 p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">왼쪽 섹션</h2>
                    <p>이 섹션은 큰 화면에서는 왼쪽에 위치합니다.</p>
                </section>
                <section className="flex-none w-80 bg-gray-600 p-4">
                    <h2 className="text-lg font-semibold">가운데 섹션</h2>
                    <p>이 섹션은 큰 화면에서는 가운데에 위치합니다.</p>
                </section>
                <section className="flex-auto bg-gray-300 p-4">
                    <h2 className="text-lg font-semibold">오른쪽 섹션</h2>
                    <p>이 섹션은 큰 화면에서는 오른쪽에 위치합니다.</p>
                </section>
            </div>
        </>
    );
}