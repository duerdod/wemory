import randomcolors from 'randomcolor';
import uuid from 'uuid';

import { shuffle } from './index'
import { MemoryCard } from '../context/memory-context'

export function generateCards(qty: number): MemoryCard[] {
    const deck: MemoryCard[] = [];
    const colors = randomcolors({ count: qty, luminosity: 'bright', format: 'hsl' });

    for (let i = 0; i < qty; i++) {
        const index: number = i % 2 === 0 ? i : deck.length - 1;

        deck.push({
            memoryId: index,
            color: colors[index],
            uniqueId: uuid(),
            isCollected: false,
            isOpen: false
        });
    }

    return shuffle(deck)
}