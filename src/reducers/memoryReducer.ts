import { MemoryState, MemoryCard } from '../context/memory-context'
import { hasLength, generateCards } from '../utils/index'
import { Action } from './actions'

const isEqual = (itemOne: string | number, itemTwo: string | number) => itemOne === itemTwo

const isMatch = (firstCard: MemoryCard, secondCard: MemoryCard) => firstCard.memoryId === secondCard.memoryId;

export function memoryReducer(state: MemoryState, action: Action): MemoryState {
    switch (action.type) {
        case 'INIT': {
            const { cardCount, cardType } = action.payload;
            return {
                cards: generateCards(cardCount, cardType),
                selectedCards: [],
                isGameWon: false,
                moves: 0,
                cardType,
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

            if (hasLength(openCards, 2)) {
                return {
                    ...state,
                }
            }

            // Null check and prevent selecting the same card over and over.
            if (!card || card.isCollected || card.isOpen) {
                return state;
            }

            const openCard = cards.map(c => ({
                ...c,
                isOpen: isEqual(c.uniqueId, card.uniqueId)
                    ? true
                    : c.isOpen
            }))

            return {
                ...state,
                cards: openCard,
                selectedCards: [...selectedCards, card],
                moves: state.moves + 1
            }

        case 'CHECK_MATCH': {
            const { cards } = state;
            const { selectedCards } = action.payload

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

                    return {
                        ...state,
                        cards: collectedCards,
                        selectedCards: []
                    }

                }
            }

            // Flip back all cards if no match.
            const flipAllButCollected = cards.map(card => ({ ...card, isOpen: false }))

            return {
                ...state,
                cards: flipAllButCollected,
                selectedCards: []
            }

        }

        case 'RESET': {
            const { cards } = state
            return {
                ...state,
                cards: cards.map(c => ({ ...c, isOpen: false, isCollected: false })),
                selectedCards: [],
                isGameWon: false,
                moves: 0
            }
        }

        default:
            throw new Error('Not a valid action type.');
    }
}