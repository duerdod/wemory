export const incrementGuesses = (guesses: number): number =>
  guesses >= 2 ? 1 : guesses + 1
