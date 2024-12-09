'use client';

import React from 'react';
import Solutions from './Solutions';
import CaseStudies from './CaseStudies';
import Hardware from './Hardware';

interface DropdownProps {
    menuKey: string;
    locale: string;
}

const dropdownComponents: Record<string, (locale: string) => JSX.Element> = {
    solutions: (locale) => <Solutions locale={locale} />,
    caseStudies: () => <CaseStudies/>,
    hardware: () => <Hardware/>,
}

export default function Dropdown({ menuKey, locale }: DropdownProps) {
    const Component = dropdownComponents[menuKey];
    return (
        <div
            className="fixed left-0 top-16 w-screen bg-white shadow-lg border-y z-50"
            onMouseEnter={(e) => e.stopPropagation()} // 부모 이벤트 방지
            onMouseLeave={(e) => e.stopPropagation()} // 부모 이벤트 방지
        >
            {Component ? Component(locale) : null}
            {/*{Component || null}*/}
        </div>
    );
}
