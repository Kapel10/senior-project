import React, { useState, useRef } from 'react';

interface ScrollBarProps {
    children: React.ReactNode;
}

export const EventSearch: React.FC<ScrollBarProps> = ({ children }) => {
    const [scrollX, setScrollX] = useState<number>(0);
    const scrollContainer = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        const container = scrollContainer.current;
        const scrollAmount = 300; // This value can be adjusted

        if (container) {
            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
            setScrollX(container.scrollLeft);
        }
    };

    const checkForScrollPosition = () => {
        const container = scrollContainer.current;
        if (container) {
            setScrollX(container.scrollLeft);
        }
    };

    return (
        <div className="relative flex items-center px-[85px] mt-[20px]">
            {scrollX > 0 && (
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute left-[40px] z-10 mx-2 text-xl"
                >
                    &#10094;
                </button>
            )}
            <div
                className="flex overflow-x-auto scrollbar-hide"
                onScroll={checkForScrollPosition}
                ref={scrollContainer}
                style={{ width: 'calc(100% + 16px)', marginRight: '-16px' }} // Adjust the width to include scrollbar width
            >
                {children}
            </div>
            {scrollContainer.current &&
                scrollContainer.current.scrollWidth > scrollContainer.current.clientWidth &&
                scrollX < scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth && (
                    <button
                        onClick={() => handleScroll('right')}
                        className="absolute right-[40px] z-10 mx-2 text-xl"
                    >
                        &#10095;
                    </button>
                )}
        </div>
    );
};
