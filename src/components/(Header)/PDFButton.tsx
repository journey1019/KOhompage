'use client';

import React from 'react';

interface PDFButtonProps {
    path: string;
    label: string;
    className?: string;
}

const PDFButton: React.FC<PDFButtonProps> = ({ path, label, className }) => {
    const handleOpenPDF = () => {
        window.open(path, '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            type="button"
            onClick={handleOpenPDF}
            className={`underline text-blue-600 hover:text-blue-800 ${className}`}
        >
            {label}
        </button>
    );
};

export default PDFButton;
