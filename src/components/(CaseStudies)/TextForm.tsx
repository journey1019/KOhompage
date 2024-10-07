// import AuthorInfo from '@/components/(CaseStudies)/AuthorInfo';
// import ArticleContent from '@/components/(CaseStudies)/ArticleContent';
// import Article from '@/components/(CaseStudies)/Article';
//
// export default function TextForm() {
//     return(
//         <section className="dark:bg-gray-900">
//             <div className="items-center py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
//                 <Article />
//             </div>
//
//             {/*<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">*/}
//             {/*    <div className="flex justify-between px-4 mx-auto max-w-screen-xl">*/}
//             {/*        <AuthorInfo />*/}
//             {/*        <ArticleContent />*/}
//             {/*    </div>*/}
//             {/*</main>*/}
//         </section>
//     )
// }

// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
//
// const markdownContent = `
// # Best practices for successful prototypes
//
// Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.
//
// ## Getting started with Flowbite
//
// First of all you need to understand how Flowbite works. This library is not another framework. Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the documentation.
//
// ...
//
// ### Type classification
//
// #### Serif
// - Low contrast between thick and thin strokes
// - Diagonal stress in the strokes
// - Slanted serifs on lower-case ascenders
// `;
//
// export default function TextForm() {
//     return (
//         <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
//             <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
//                 <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
//                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
//                 </article>
//             </div>
//         </main>
//     );
// }

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

const auto = `
**Author**: Jese Leos  
*Graphic Designer, educator & CEO Flowbite*  
Published: Feb. 8, 2022
`;

const markdown = `
# Best practices for successful prototypes

---

한국 한강홍수통제소는 대한민국의 수자원 관리와 홍수 예방을 담당하는 주요 기관 중 하나입니다. 주로 한강 유역과 그 주변 지역의 수위 및 홍수 위험을 모니터링하고, 홍수 피해를 예방하기 위한 조치를 수행합니다. 한강홍수통제소는 국토교통부 산하에 있으며, 한강뿐만 아니라 대한민국 주요 하천의 홍수 통제와 관련된 다양한 역할을 수행합니다.


![Digital art by Anonymous](/images/typography-image-1.png)  
*Digital art by Anonymous*

## 과제: 기존 커뮤니케이션 채널의 한계

한강 홍수통제소가 고객에게 알리기 위해 SMS 에 의존하는 것은 비용이 많이 들고 보안 위험을 초래했습니다. 주로 스미싱이 만연했기 때문입니다. 이메일은 비효율적이고 시간이 많이 걸렸으며, 고객 지원 사례를 해결하기 위해 여러 거래소가 필요했습니다. 소셜 미디어는 도움이 되었지만 민감한 계정 정보를 처리하는 데 필요한 데이터 프라이버시와 규정 준수가 부족했습니다. 많은 규제 기관이 모든 금융 거래 및 관련 커뮤니케이션에 감사 추적을 쉽게 사용할 수 있도록 요구하기 시작했습니다. 이러한 과제를 인식한 홍수통제소는 고객 커뮤니케이션을 간소화하고 비용을 줄이며 대규모로 보안 위험을 줄일 수 있는 솔루션을 찾기 시작했습니다.
`;

const markdown2 = `
## 홍수통제소는 코리아오브컴의 메시징 솔루션을 통합합니다.

홍수통제소는 올인원 커뮤니케이션 솔루션을 찾을 때 구체적인 요구 사항이 있었습니다 . 그들은 보안을 강화하기 위해 앱 내 메시징 기능을
우선시하고, 사용자가 로그인하여 사전 인증되고, 사용자 유지를 원했습니다. SMS에서 앱 내 알림 으로 마이그레이션하여 실시간으로 중요한 업데이트를 제공함으로써 사용자는 다른
곳으로 이동하지 않고도 홍수통제소 앱에 머물러서 그러한 확신을 누릴 수 있었습니다. 고객 지원 측면에서 홍수통제소에 필요한 필수 커뮤니케이션 기능에는 라이브 채팅, 소셜 미디어와 같은
상호 작용, Salesforce Service Cloud와의 기본 제공 채팅 통합이 포함되어 에이전트가 인스턴스 내에서 직접 고객 요구 사항을 신속하게 인식하고 해결할 수 있도록
했습니다.

홍수통제소는 올인원 커뮤니케이션 솔루션을 찾을 때 구체적인 요구 사항이 있었습니다 . 그들은 보안을 강화하기 위해 앱 내 메시징 기능을
우선시하고, 사용자가 로그인하여 사전 인증되고, 사용자 유지를 원했습니다. SMS에서 앱 내 알림 으로 마이그레이션하여 실시간으로 중요한 업데이트를 제공함으로써 사용자는 다른
곳으로 이동하지 않고도 홍수통제소 앱에 머물러서 그러한 확신을 누릴 수 있었습니다. 고객 지원 측면에서 홍수통제소에 필요한 필수 커뮤니케이션 기능에는 라이브 채팅, 소셜 미디어와 같은
상호 작용, Salesforce Service Cloud와의 기본 제공 채팅 통합이 포함되어 에이전트가 인스턴스 내에서 직접 고객 요구 사항을 신속하게 인식하고 해결할 수 있도록
했습니다.

홍수통제소는 평가 프로세스 동안 코리아오브컴와 협력하여 고객 커뮤니케이션 전략을 개선했습니다. 이 파트너십을 통해 홍수통제소는 코리아오브컴 커뮤니케이션 API 플랫폼의 여러 구성
요소를 구현하여 운영을 더욱 영향력 있는 수준으로 전환할 수 있었습니다.

1. **앱 내 알림**: SMS에서 앱 내 알림으로 전환하고 앱 내 메시지 센터 로 간소화한 결과 단위당 SMS 통신 비용 이 90% 감소 했습니다 . 이러한 알림은 거래 및 기타 중요한 재무
정보(예: 잔액 업데이트 및 지불 확인)에 대한 즉각적이고 안전하며 중요한 업데이트를 제공하여 사용자의 신뢰와 편의성을 높였습니다. 통합된 받은 편지함은 앱 외부의 SMS를 앱 내부의
확장 가능한 비즈니스 메시징으로 대체하여 사용자 유지를 더욱 용이하게 하고 운영 비용을 줄였으며, 모두 홍수통제소 팀이 코리아오브컴 대시보드 하나에서 관리할 수 있습니다.
2. **고객 지원**: AI 챗봇 , 라이브 에이전트 인터페이스 , 코리아오브컴의 Salesforce 채팅 통합을 포함한 포괄적인 지원 도구 모음을 구현함으로써 홍수통제소는 모바일 애플리케이션
내에서 바로 엔드투엔드 고객 여정을 효과적으로 처리합니다. 고객은 24시간 연중무휴로 이용 가능한 빠르고 자동화된 응답을 위해 챗봇과 상호 작용할 수 있습니다. 상호 작용은 더 복잡한
문제의 경우 직관적인 인터페이스를 통해 라이브 에이전트에게 에스컬레이션하여 시기적절하고 개인화된 지원을 보장할 수 있습니다. 원활한 고객 경험일 뿐만 아니라 홍수통제소 에이전트가 모든 지원
요구 사항에 대해 안전하고 사전 인증된 환경에 머물면서 더 생산적으로 작업할 수 있도록 돕습니다.
`;

const markdown3 = `
## 결과: 코리아오브컴는 홍수통제소의 사용자 경험, 참여 및 운영 효율성을 개선합니다.

코리아오브컴의 메시징 솔루션을 통합하여 홍수통제소의 운영이 크게 개선되었습니다.

- 지원 운영 효율성이 58% 증가했습니다. 문제 해결 FAQ가 개선되었고 상담원에게 원활하게 인계되면서 운영 효율성이 높아졌으며, 고객 지원 팀은 더 어려운 문의 사항을처리하는 데 더 집중할 수 있었고 간단한 사례는 직접 처리할 수 있었습니다.
- 지원 사례에서 56% 비용 절감: 향상된 에이전트 인터페이스를 통한 라이브 채팅 구현으로 지원 사례 해결률이 개선되어 에이전트가 더 짧은 시간에 더 많은 사례를 처리할 수있게 되었습니다.
- SMS 통신 비용을 단위당 94% 절감: SMS 에서 앱 내 알림 과 앱 내 받은편지함 으로 전환하면서 비용이 크게 절감되었습니다.
    
코리아오브컴의 개발자 친화적인 맞춤형 채팅 SDK , 비즈니스 메시징 SDK 및 포괄적인 문서 덕분에 구현 프로세스가 고통스럽지 않았습니다 . 이를 통해 홍수통제소 팀은 처음부터 커뮤니케이션 플랫폼을 개발하는 대신 핵심 금융 서비스에 집중할 수 있었습니다. 이러한 신속한 배포를 통해 최종 사용자는 향상된 커뮤니케이션 채널의 이점을 빠르게 누릴 수 있었습니다.
`;

export default function TextForm() {
    return (
        <div className="prose lg:prose-xl mx-auto p-4 max-w-screen-xl">
            <ReactMarkdown
                components={{
                    img: ({ src, alt }) => (
                        <Image
                            src="/images/casestudies/diagram1_1.png"
                            alt={alt || 'Configuration_1'}
                            width={800}
                            height={600}
                            className="my-4 rounded-lg brightness-80 dark:brightness-75"
                            unoptimized
                        />
                    ),
                }}
            >
                {markdown}
            </ReactMarkdown>
            <div className="flex flex-col justify-center my-8">
                <Image
                    src="/images/casestudies/diagram1_2.png"
                    alt="Diagram 1_2"
                    width={800}
                    height={300}
                    className="rounded-lg brightness-80 dark:brightness-75"
                    unoptimized
                />
            </div>
            <ReactMarkdown>
                {markdown2}
            </ReactMarkdown>
            <div className="flex flex-row justify-center space-x-4 my-8">
                <Image
                    src="/images/casestudies/diagram1_3.png"
                    alt="Diagram 1_3"
                    width={400}
                    height={300}
                    className="rounded-lg brightness-80 dark:brightness-75"
                    unoptimized
                />
                <Image
                    src="/images/casestudies/diagram1_4.png"
                    alt="Diagram 1_4"
                    width={400}
                    height={300}
                    className="rounded-lg brightness-80 dark:brightness-75"
                    unoptimized
                />
                <Image
                    src="/images/casestudies/diagram1_5.png"
                    alt="Diagram 1_5"
                    width={400}
                    height={300}
                    className="rounded-lg brightness-80 dark:brightness-75"
                    unoptimized
                />
            </div>
            <ReactMarkdown>
                {markdown3}
            </ReactMarkdown>
        </div>
        // <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        //     <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        //         <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        //             <header className="mb-4 lg:mb-6 not-format">
        //                 <address className="flex items-center mb-6 not-italic">
        //                     <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        //                         <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Author's profile" />
        //                         <div>
        //                             <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
        //                             <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
        //                             <p className="text-base text-gray-500 dark:text-gray-400">
        //                                 <time dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </address>
        //                 <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
        //             </header>
        //
        //             {/* 본문 섹션 */}
        //             <section>
        //                 <p className="lead">
        //                     Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS...
        //                 </p>
        //                 <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook...</p>
        //                 <figure>
        //                     <img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt="Digital art by Anonymous" />
        //                     <figcaption>Digital art by Anonymous</figcaption>
        //                 </figure>
        //
        //                 <h2>Getting started with Flowbite</h2>
        //                 <p>First of all you need to understand how Flowbite works...</p>
        //
        //                 <ol>
        //                     <li><strong>Usability testing</strong>: Does your user know how to exit out of screens...</li>
        //                     <li><strong>Involving stakeholders</strong>: Need to check if your GDPR consent boxes...</li>
        //                     <li><strong>Impressing a client</strong>: Prototypes can help explain or even sell your idea...</li>
        //                 </ol>
        //
        //                 <h3>Laying the groundwork for best design</h3>
        //                 <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook...</p>
        //             </section>
        //         </article>
        //     </div>
        // </main>
    );
}
