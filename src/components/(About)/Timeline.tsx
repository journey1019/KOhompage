// 'use client';
//
// import React from 'react';
// import { motion } from 'framer-motion';
//
// interface TimelineEvent {
//     year: number;
//     events: string[];
// }
//
// interface TimelineProps {
//     timeline: TimelineEvent[];
// }
//
// const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
//     return (
//         <div className="bg-gray-900 py-16 px-6">
//             <div className="relative max-w-4xl mx-auto">
//                 {/* Vertical Line */}
//                 <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-700 transform -translate-x-1/2"></div>
//
//                 {/* Timeline Items */}
//                 {timeline.map((item, index) => (
//                     <motion.div
//                         key={index}
//                         className={`relative flex items-start mb-12 ${
//                             index % 2 === 0 ? 'flex-row-reverse' : ''
//                         }`}
//                         initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.4, ease: 'easeOut' }} // 속도 증가
//                         viewport={{ once: true, margin: '-50px' }}
//                     >
//                         {/* Connector Dot */}
//                         {/*<motion.div*/}
//                         {/*    className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm absolute top-10 transform -translate-y-1/2"*/}
//                         {/*    style={{*/}
//                         {/*        left: index % 2 === 0 ? 'calc(50% + 1rem)' : 'calc(50% - 2rem)',*/}
//                         {/*    }}*/}
//                         {/*    initial={{ scale: 0 }}*/}
//                         {/*    animate={{ scale: 1 }}*/}
//                         {/*    transition={{ duration: 0.3, ease: 'easeOut' }} // 속도 증가*/}
//                         {/*>*/}
//                         {/*    {index + 1}*/}
//                         {/*</motion.div>*/}
//
//                         {/* Content Box */}
//                         <motion.div
//                             className={`w-1/2 px-6 py-4 bg-gray-800 text-gray-200 rounded-lg shadow-md mt-8 ${
//                                 index % 2 === 0 ? 'text-right' : 'text-left'
//                             }`}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4, ease: 'easeOut' }} // 속도 증가
//                             viewport={{ once: true, margin: '-50px' }}
//                         >
//                             <h3 className="text-red-500 text-xl font-bold mb-2">
//                                 {item.year}
//                             </h3>
//                             <ul className="list-disc pl-5 space-y-2">
//                                 {item.events.map((event, eventIndex) => (
//                                     <li key={eventIndex} className="text-sm text-gray-400">
//                                         {event}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </motion.div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Timeline;

/** Timeline.tsx */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
    year: number;
    events: string[];
}

interface TimelineProps {
    timeline: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
    const [activePeriod, setActivePeriod] = useState<string>('1999~2009');

    const periods = [
        { label: '1999~2009', range: [1999, 2009] },
        { label: '2010~2019', range: [2010, 2019] },
        { label: '2020~현재', range: [2020, 2024] },
    ];

    const filteredTimeline = timeline.filter(
        (item) => item.year >= periods.find((p) => p.label === activePeriod)!.range[0]
            && item.year <= periods.find((p) => p.label === activePeriod)!.range[1]
    );

    const animationVariants = {
        hidden: { opacity: 0, x: -50 }, // 왼쪽에서 시작
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.5 } }, // 오른쪽으로 사라짐
    };

    return (
        <section className="bg-gray-100 py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Period Buttons */}
                <div className="flex justify-center gap-2 md:gap-4 mb-8">
                    {periods.map((period) => (
                        <button
                            key={period.label}
                            onClick={() => setActivePeriod(period.label)}
                            className={`px-4 py-2 text-xs md:text-sm font-medium rounded-md transition ${
                                activePeriod === period.label
                                    ? 'bg-red-700 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>

                {/* Timeline Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePeriod}
                        className="max-w-7xl mx-auto space-y-4 md:space-y-8"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                    >
                        {filteredTimeline.map((item) => (
                            <div key={item.year} className="bg-white shadow-md rounded-lg p-4 md:p-6">
                                <h3 className="text-xl font-bold text-red-700 mb-4">{item.year}</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {item.events.map((event, idx) => (
                                        <li key={idx} className="text-gray-700 text-sm md:text-base">
                                            {event}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Timeline;
