import { useState, useEffect } from 'react';

interface Sizes {
    isProbablyMobile: boolean
    isLarge: boolean
}

interface initSizes {
    innerWidth: number
    innerHeight: number
}

const sizes = () => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
})

export function useDeviceWidth() {
    const [windowSize, setWindowSize] = useState<initSizes>(sizes())

    function resize() {
        setWindowSize(sizes())
    }

    useEffect(() => {
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    }, [])

    const isProbablyMobile = windowSize.innerWidth < 600
    const isLarge = windowSize.innerWidth > 600

    return {
        isProbablyMobile,
        isLarge
    } as Sizes

};
