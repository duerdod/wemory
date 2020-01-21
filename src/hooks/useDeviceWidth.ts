import { useState, useEffect } from 'react';

interface Sizes {
    innerWidth: number
    innerHeight: number
}

const sizes = () => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
})

export function useDeviceWidth() {
    const [windowSize, setWindowSize] = useState<Sizes>(sizes())

    function resize() {
        setWindowSize(sizes())
    }

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    }, [windowSize])


    return {
        windowSize
    }

};
