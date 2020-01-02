import { MemoryState } from '../context/memory-context'
import { hasLength, generateCards } from '../utils/index'
import { Action } from './actions'

const isEqual = (itemOne: string | number, itemTwo: string | number) => itemOne === itemTwo

export function memoryReducer(state: MemoryState, action: Action): MemoryState {

    switch (action.type) {
        case 'INIT': {
            const { cardCount, cardType } = action.payload;
            return {
                cards: generateCards(cardCount, cardType),
                selectedCards: [],
                isGameWon: false
            }
        }

        case 'TRY_WIN': {
            const isGameWon = state.cards.every(card => card.isCollected)

            if (!isGameWon) {
                return state;
            }

            return {
                ...state,
                isGameWon: true
            }
        }

        case 'SELECT':
            const { card } = action.payload.selectedCard
            const { cards, selectedCards } = state
            const openCards = cards.filter(card => card.isOpen)

            // Null check and prevent selecting the same card over and over.
            if (!card || card.isCollected || card.isOpen) {
                return state;
            }

            if (openCards.length >= 2) {
                return {
                    ...state,
                    selectedCards: []
                }
            }

            const openCard = cards.map(c => {
                if (isEqual(c.uniqueId, card.uniqueId)) {
                    c.isOpen = true;
                }
                return c;
            })

            return {
                ...state,
                cards: openCard,
                selectedCards: [...selectedCards, card]
            }

        case 'CHECK_MATCH': {
            const { cards } = state;
            const { selectedCards } = action.payload

            if (hasLength(selectedCards, 2)) {
                const [c1, c2] = selectedCards;
                if (isEqual(c1.memoryId, c2.memoryId) && !isEqual(c1.uniqueId, c2.uniqueId)) {
                    // Match!
                    const collectedCards = cards.map(c => {
                        if (isEqual(c1.uniqueId, c.uniqueId) || isEqual(c2.uniqueId, c.uniqueId)) {
                            c.isCollected = true
                        }
                        c.isOpen = false;
                        return c;
                    })

                    return {
                        ...state,
                        cards: collectedCards,
                        selectedCards: []
                    }

                }
            }
            // Otherwise
            return {
                ...state,
                selectedCards: []
            }
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
                ...state,
                cards: allButCollected,
                selectedCards: []
            }
        }

        case 'RESET': {
            const { cards } = state
            return {
                cards: cards.map(c => ({ ...c, isOpen: false, isCollected: false })),
                selectedCards: [],
                isGameWon: false
            }
        }

        default:
            throw new Error('Not a valid action type.');
    }
}