import { CardNum, CardMark } from '../type/Type'

export const CardMarkIntegers: { [index: string]: CardMark } = {
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

// ActionID のうち、Drawすることを示す値
export const DrawActionID = -1

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

export const CardSkillNums: { [index: string]: CardNum } = {
  Skip: 1,
  DrawTwo: 2,
  WildCard: 8,
  Back: 9,
  Attach: 12,
}

export const CardNums: CardNum[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const CardNumsWithoutJoker: CardNum[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const CardMaxNum = 13

export const CardJokerNum = 0
