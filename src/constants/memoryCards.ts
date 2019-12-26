import uuid from "uuid";

/*

// // // THIS BASTARD CAN CREATE AN ARRAY OF MEMORY CARDS.

// On a second thouht... no it won't. Colors aren't right.
const deck = [];
const qty = 12;
for (let i = 0; i < qty; i++) {
  deck.push({
    memoryId: i % 2 === 0 ? i : deck.length - 1,
    color: 'crimson',
    uniqueId: uuid()
  });
}

*/

export const memoryCards = [
    {
        memoryId: 1,
        color: 'tomato',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 2,
        color: 'orange',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 3,
        color: 'springgreen',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 4,
        color: 'gold',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 5,
        color: 'snow',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 6,
        color: 'hotpink',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 1,
        color: 'tomato',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 2,
        color: 'orange',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 3,
        color: 'springgreen',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 4,
        color: 'gold',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 5,
        color: 'snow',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
    {
        memoryId: 6,
        color: 'hotpink',
        uniqueId: uuid(),
        isOpen: false,
        isCollected: false
    },
]