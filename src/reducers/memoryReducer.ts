import { MemoryState, Action } from '../context/memory-context'

export function memoryReducer(state: MemoryState, action: Action): MemoryState {
    switch (action.type) {
        case 'SELECT':
            const { cards } = state;

            const currentSelectedCard = cards.find(c => c.uniqueId === action.payload.uniqueId);
            const previouslySelectedCard = cards.find(c => c.isOpen);

            // Return early.
            if (!currentSelectedCard) {
                return state;
            }

            // No match
            if (previouslySelectedCard && previouslySelectedCard.memoryId !== currentSelectedCard.memoryId) {
                const restoredCards = cards.map(card => {
                    if (!card.isCollected) {
                        card.isOpen = false;
                    }
                    return card;
                });

                return {
                    cards: restoredCards
                };
            }

            // Match!
            if (
                previouslySelectedCard?.memoryId === currentSelectedCard.memoryId &&
                previouslySelectedCard.uniqueId !== currentSelectedCard.uniqueId
            ) {
                const setSelectedCards = cards.map(card => {
                    if (card.uniqueId === currentSelectedCard.uniqueId) {
                        card.isCollected = true;
                    }
                    if (card.memoryId === currentSelectedCard.memoryId) {
                        card.isCollected = true;
                    }

                    card.isOpen = false;
                    return card;
                });

                return {
                    cards: [...setSelectedCards]
                };
            }

            // Return default to select a card.
            const selectCard = cards.map(card => {
                if (card.uniqueId === currentSelectedCard.uniqueId) {
                    card.isOpen = true;
                }
                return card;
            });

            return {
                cards: [...selectCard]
            };

        default:
            throw new Error('Not a valid action type.');
    }
}