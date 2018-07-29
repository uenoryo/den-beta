import { CardNum } from '../type/Type'

export const CardMarkIntegers: { [index: string]: number } = {
  Club: 0,
  Diamond: 1,
  Heart: 2,
  Spade: 3,
  JokerA: 4,
  JokerB: 5,
}

export const CardMarkStrings: { [index: string]: string } = {
  Club: '♣︎',
  Diamond: '♢',
  Heart: '♡',
  Spade: '♠︎',
  Joker: '$',
}

export const CardCosts: { [index: number]: number } = {
  0: 5,
  1: 1,
  2: 2,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 3,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
}

export const CardNums: CardNum[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
