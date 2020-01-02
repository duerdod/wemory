import randomcolors from 'randomcolor';
import uuid from 'uuid';

import { shuffle } from './index'
import { MemoryCard } from '../context/memory-context'

import { animals, foods } from '../constants/emojis'

export type EmojiType = 'foods' | 'animals' | null

const emojis = {
    animals,
    foods
}

export function generateCards(qty: number, emoji: EmojiType): MemoryCard[] {
    const deck: MemoryCard[] = [];
    const colors = randomcolors({ count: qty, luminosity: 'light', format: 'hsl' });

    for (let i = 0; i < qty; i++) {
        const index: number = i % 2 === 0 ? i : deck.length - 1;

        deck.push({
            memoryId: index,
            bgColor: colors[index],
            identifier: emoji ? emojis[emoji][index] : null,
            uniqueId: uuid(),
            isCollected: false,
            isOpen: false
        });
    }

    return shuffle(deck)
}