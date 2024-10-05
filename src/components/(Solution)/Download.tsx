'use client';

export default function Download() {
    const handleDownload = (fileName: string) => {
        const link = document.createElement('a');
        link.href = `/pdf/${fileName}`;
        link.download = fileName; // 다운로드될 파일명 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="pb-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <button type="button" onClick={() => handleDownload('ReeferConnect_KR.pdf')}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        ReeferConnect Datasheet
                    </button>
                    <button type="button" onClick={() => handleDownload('ReeferConnect_KR.pdf')}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        VesselConnect Datasheet
                    </button>
                    <button type="button" onClick={() => handleDownload('ReeferConnect_KR.pdf')}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Intermodal Asset Tracking Datasheet
                    </button>
                </div>
            </div>
        </section>
    )
}