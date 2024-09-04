import Hero from '@/components/Hero';

const TITLE_CLASS = 'text-2xl font-bold text-gray-800 my-2';
export default function CompanyPage() {
    return(
        <>
            <Hero/>
            <section className='bg-gray-100 shadow-lg p-8 m-8 text-center'>
                <h2 className={TITLE_CLASS}>Who am I?</h2>
                <p>
                    코리아오브컴 주식회사는 미국 ORBCOMM과 라이센스 계약을 체결하여 고정 및 이동자산을 원격으로 추적, 모니터링 및 제어하는 산업용 IoT 및 M2M 통신 솔루션을 국내 및
                    전세계에 공급하는 기간통신 사업자입니다.
                </p>
                <h2 className={TITLE_CLASS}>특징</h2>
                <p>
                    1999년 9워 법원설립<br />
                    기간통신사업자<br />
                    ORBCOMM Inc. 라이선스 체결<br />
                    안정적이고 빠른 통신서비스
                </p>
                <h2 className={TITLE_CLASS}>오시는 길</h2>
                <p>
                    서울본사<br />
                    위성 지구국
                </p>
            </section>
        </>
    )
}