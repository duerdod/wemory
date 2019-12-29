import randomcolors from 'randomcolor';
import uuid from 'uuid';

import { shuffle } from './index'
import { MemoryCard } from '../context/memory-context'

import { animals } from '../constants/emojis'

type EmojiType = 'foods' | 'animals' | null

export function generateCards(qty: number, emoji?: EmojiType | null): MemoryCard[] {
    const deck: MemoryCard[] = [];
    const colors = randomcolors({ count: qty, luminosity: 'bright', format: 'hsl' });

    for (let i = 0; i < qty; i++) {
        const index: number = i % 2 === 0 ? i : deck.length - 1;

        deck.push({
            memoryId: index,
            color: colors[index],
            identifier: animals[index],
            uniqueId: uuid(),
            isCollected: false,
            isOpen: false
        });
    }

    return shuffle(deck)
}