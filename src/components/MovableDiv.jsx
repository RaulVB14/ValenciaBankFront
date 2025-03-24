import React, { useState, useRef, useEffect } from 'react';

function MovableDiv({ children, style }) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragItem = useRef();
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - dragItem.current.offsetLeft,
            y: e.clientY - dragItem.current.offsetTop,
        };
    };

    return (
        <div
            ref={dragItem}
            style={{
                position: 'absolute',
                cursor: 'move',
                ...style,
                left: position.x,
                top: position.y,
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
}

export default MovableDiv;