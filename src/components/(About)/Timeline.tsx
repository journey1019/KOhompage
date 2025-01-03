'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
    year: number;
    events: string[];
}

interface TimelineProps {
    timeline: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
    return (
        <div className="bg-gray-900 py-16 px-6">
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-700 transform -translate-x-1/2"></div>

                {/* Timeline Items */}
                {timeline.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`relative flex items-start mb-12 ${
                            index % 2 === 0 ? 'flex-row-reverse' : ''
                        }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {/* Connector Dot */}
                        <motion.div
                            className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm absolute top-0 transform -translate-y-1/2"
                            style={{
                                left: index % 2 === 0 ? 'calc(50% + 1rem)' : 'calc(50% - 2rem)',
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
                        >
                            {index + 1}
                        </motion.div>

                        {/* Content Box */}
                        <motion.div
                            className={`w-1/2 px-6 py-4 bg-gray-800 text-gray-200 rounded-lg shadow-md mt-8 ${
                                index % 2 === 0 ? 'text-right' : 'text-left'
                            }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            <h3 className="text-red-500 text-xl font-bold mb-2">
                                {item.year}
                            </h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {item.events.map((event, eventIndex) => (
                                    <li key={eventIndex} className="text-sm text-gray-400">
                                        {event}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
