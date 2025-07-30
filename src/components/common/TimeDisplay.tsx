import React from 'react';
function TimeDisplay({ isoTime }: any) {
    const dateObject = new Date(isoTime);
    const formattedIstTime = dateObject.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <>
            <span>{formattedIstTime.toUpperCase()}</span>
        </>

    );
}

export default TimeDisplay;