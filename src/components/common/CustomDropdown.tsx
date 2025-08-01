'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomDropdown({
    options,
    selected,
    onChange,
    placeholder,
    label
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [dropUp, setDropUp] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Check available space on open
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const estimatedDropdownHeight = Math.min(options.length * 40, 240); 
            setDropUp(spaceBelow < estimatedDropdownHeight);
        }
    }, [isOpen, options.length]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev + 1) % options.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
                break;
            case 'Enter':
                e.preventDefault();
                onChange(options[highlightedIndex]);
                setIsOpen(false);
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    return (
        <div className="w-full relative" ref={wrapperRef}>
            <label className="block mb-1 font-medium">{label}</label>

            <div
                className="border px-3 py-2 rounded cursor-pointer bg-white relative"
                tabIndex={0}
                onClick={() => setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                ref={triggerRef}
            >
                {selected || <span className="text-gray-400">{placeholder}</span>}
                <span className="absolute right-3 top-2 text-gray-500 pointer-events-none">▼</span>
            </div>

            {isOpen && (
                <ul
                    className={`absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-auto ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
                        }`}
                    role="listbox"
                >
                    {options.map((option, index) => (
                        <li
                            key={option}
                            className={`px-3 py-2 cursor-pointer ${selected === option ? 'bg-blue-100 font-semibold' : ''
                                } ${highlightedIndex === index ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            role="option"
                            aria-selected={selected === option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
