import { MemoryState, Action } from '../context/memory-context'
import { hasLength } from '../utils/hasLength'

const isEqual = (itemOne: string | number, itemTwo: string | number) => itemOne === itemTwo

// In order to have number of cards as a setting, 
// the reducer payload must be of type MemoryCard.
export function memoryReducer(state: MemoryState, action: Action): MemoryState {
    switch (action.type) {

        case 'SELECT':
            const { card } = action.payload.selectedCard
            const { cards, selectedCards } = state

            // Nullc heck.
            if (!card) {
                return state;
            }

            // Prevent from selecting the same card over and over.
            if (hasLength(selectedCards, 1) && card.uniqueId === selectedCards.find(c => isEqual(c.uniqueId, card.uniqueId))?.uniqueId) {
                return state;
            }

            if (hasLength(selectedCards, 2)) {
                const [c1, c2] = selectedCards;

                if (isEqual(c1.memoryId, c2.memoryId) && !isEqual(c1.uniqueId, c2.uniqueId)) {

                    // Match!
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

        default:
            throw new Error('Not a valid action type.');
    }
}