import { MemoryState, Action } from '../context/memory-context'
import { hasLength, generateCards } from '../utils/index'

const isEqual = (itemOne: string | number, itemTwo: string | number) => itemOne === itemTwo

export function memoryReducer(state: MemoryState, action: Action): MemoryState {
    switch (action.type) {
        case 'INIT': {
            const { cardCount } = action.payload;
            return {
                cards: generateCards(cardCount),
                selectedCards: []
            }
        }

        case 'SELECT':
            const { card } = action.payload.selectedCard
            const { cards, selectedCards } = state

            // Nullc heck.
            if (!card) {
                return state;
            }

            // Prevent from selecting the same card over and over.
            if (
                hasLength(selectedCards, 1)
                && card.uniqueId === selectedCards.find(c => isEqual(c.uniqueId, card.uniqueId))?.uniqueId
            ) {
                return state;
            }

            if (hasLength(selectedCards, 2)) {
                const [c1, c2] = selectedCards;
                if (isEqual(c1.memoryId, c2.memoryId) && !isEqual(c1.uniqueId, c2.uniqueId)) {
                    // Match! 
                    // Make this automated!
                    const collectedCards = cards.map(c => {
                        if (isEqual(c1.uniqueId, c.uniqueId) || isEqual(c2.uniqueId, c.uniqueId)) {
                            c.isCollected = true
                        }
                        return c;
                    })

                    return {
                        cards: collectedCards,
                        selectedCards: []
                    }

                }
                // Otherwise, close all but selected.
                const closeUnSelectedCards = cards.map(c => ({ ...c, isOpen: false }))

                return {
                    cards: closeUnSelectedCards,
                    selectedCards: []
                }
            }

            // Always open at least one card.
            const openCard = cards.map(c => {
                if (isEqual(c.uniqueId, card.uniqueId)) {
                    c.isOpen = true;
                }
                return c;
            })

            return {
                cards: openCard,
                selectedCards: hasLength(selectedCards, 2) ? [] : [...selectedCards, card]
            }

        case 'CLOSE_CARDS': {
            // This could be rewritten.
            const { cards } = state;
            const { selectedCards } = action.payload
            const [c1, c2] = selectedCards;

            // Match. Do nothing.
            if (isEqual(c1.memoryId, c2.memoryId) && !isEqual(c1.uniqueId, c2.uniqueId)) {
                return state
            }

            const allButCollected = cards.map(card => {
                if (card.isCollected) {
                    card.isOpen = true
                }

                card.isOpen = false;
                return card
            })

            return {
                cards: allButCollected,
                selectedCards: []
            }
        }

        case 'RESET': {
            const { cards } = state
            return {
                cards: cards.map(c => ({ ...c, isOpen: false, isCollected: false })),
                selectedCards: []
            }
        }

        default:
            throw new Error('Not a valid action type.');
    }
}