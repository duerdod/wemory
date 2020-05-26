import { MemoryState, MemoryCard } from '../context/memory-context'
import { hasLength, generateCards, isDev } from '../utils'
import { Machine, assign, AnyEventObject } from 'xstate'
import { Action as MemoryEvents } from './actions'

const CARD_COUNT = isDev() ? 2 : 18;

const initialState: MemoryState = {
    cards: generateCards(CARD_COUNT, 'animals'),
    selectedCards: [],
    moves: 0,
    cardType: 'animals',
};

const isEqual = (itemOne: string | number, itemTwo: string | number) =>
    itemOne === itemTwo

const isMatch = (firstCard: MemoryCard, secondCard: MemoryCard) =>
    firstCard.memoryId === secondCard.memoryId;

const isGameWon = (context: MemoryState) =>
    context.cards.every(card => card.isCollected)

// Prevents selecting the same card over and over
const isNotSelected = (context: MemoryState, event: AnyEventObject) => {
    const openCards = context.cards.filter(c => c.isOpen);
    return openCards.find((c: MemoryCard) => c.uniqueId === event.card.uniqueId) ? false : true;
}

const resetGame = assign<MemoryState>({
    ...initialState,
    cards: (_, event: AnyEventObject) => {
        const { cardCount, cardType } = event.gameSettings
        return generateCards(cardCount, cardType)
    },
    cardType: (_, event: AnyEventObject) => event.gameSettings.cardType,
})

const flipAllButCollected = assign<MemoryState>({
    selectedCards: () => [],
    cards: (context) => context.cards.map((card: MemoryCard) => ({ ...card, isOpen: card.isCollected }))
})

const selectCard = assign<MemoryState>({
    cards: (context, event: AnyEventObject) => {
        const { card } = event
        const { cards } = context

        const openCard = cards.map((c: MemoryCard) => ({
            ...c,
            isOpen: isEqual(c.uniqueId, card.uniqueId)
                ? true
                : c.isOpen
        }))

        return openCard
    },
    selectedCards: (context: MemoryState, event: AnyEventObject) => [...context.selectedCards, event.card],
    moves: (context: MemoryState) => context.moves + 1,
})

const checkMatch = assign<MemoryState>({
    cards: (context) => {
        const { cards, selectedCards }: { cards: MemoryCard[], selectedCards: MemoryCard[] } = context;

        // Could this be a guard instead?
        if (hasLength(selectedCards, 2)) {
            const [c1, c2] = selectedCards;

            if (isMatch(c1, c2)) {
                const collectedCards = cards.map(c => ({
                    ...c,
                    isOpen: false,
                    isCollected: isEqual(c1.uniqueId, c.uniqueId) || isEqual(c2.uniqueId, c.uniqueId)
                        ? true
                        : c.isCollected
                }))

                return collectedCards

            }
        }
        // else
        return cards
    }
})

interface MemorySchema {
    states: {
        idle: {}
        playing: {
            states: {
                first: {};
                second: {};
                checking: {}
            }
        };
        gameWon: {}
    }
}

export const MemoryMachine = Machine<MemoryState, MemorySchema, MemoryEvents>({
    id: 'Memory',
    initial: 'playing',
    context: { ...initialState },
    states: {
        idle: {
            on: {
                '': 'playing'
            }
        },
        playing: {
            on: {
                '': {
                    cond: 'isGameWon',
                    target: 'gameWon',
                }
            },
            initial: 'first',
            states: {
                first: {
                    on: {
                        SELECT_CARD: {
                            cond: 'isNotSelected',
                            actions: 'selectCard',
                            target: 'second',
                        }
                    }
                },
                second: {
                    on: {
                        SELECT_CARD: {
                            cond: 'isNotSelected',
                            actions: 'selectCard',
                            target: 'checking',
                        }
                    }
                },
                checking: {
                    onEntry: 'checkMatch',
                    after: {
                        700: {
                            target: '#Memory.playing',
                            actions: 'flipAllButCollected'
                        }
                    }
                }
            }
        },
        gameWon: {
            onEntry: 'setGameWon',
            on: {
                RESET: {
                    target: 'playing',
                    actions: 'resetGame'
                }
            }
        },
    },
    on: {
        RESET: {
            actions: 'resetGame',
            target: 'playing'
        },
    }
}, {
    actions: {
        selectCard,
        flipAllButCollected,
        checkMatch,
        resetGame
    },
    guards: {
        isGameWon,
        isNotSelected,
    }
})