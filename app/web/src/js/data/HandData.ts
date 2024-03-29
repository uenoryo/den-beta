import { CardNum, JokerBuff } from '../type/Type'
import { CardNums } from '../constant/Card'
import CardData from './CardData'

export default class HandData {
  private isReversed: boolean = false

  constructor(
    private cards: CardData[]
  ) {}

  get Cards(): CardData[] {
    return this.cards
  }

  get IsReversed(): boolean {
    return this.isReversed
  }

  set IsReversed(isReversed: boolean) {
    this.isReversed = isReversed
  }

  get Cost(): number {
    let cost = 0
    for (let idx in this.Cards) {
      cost += this.Cards[idx].Cost
    }
    return cost
  }

  get JokerBuff(): JokerBuff {
    let jokerCount = 0
    for (let card of this.Cards) {
      if (card.isJoker()) {
        jokerCount++
      }
    }
    switch (jokerCount) {
      case 1:
        return JokerBuff.Good
      case 2:
        return JokerBuff.Awesome
    }
    return JokerBuff.None
  }

  get ChitoiPower(): number {
    return this.pairCount() + 1
  }

  numAmount(num: CardNum): number {
    let amount = 0
    for (let card of this.Cards) {
      if (num === card.Num) {
        amount++
      }
    }
    return amount
  }

  numTotal(): number {
    let sum = 0
    for (let card of this.Cards) {
      sum += card.Num
    }
    return sum
  }

  lonelyNumForChitoi(): CardNum | null {
    let num: CardNum | null = null
    for (let n of CardNums) {
      if (this.numAmount(n) % 2 === 1) {
        // 枚数が奇数の数字が2種類以上ある場合は該当しない
        if (num !== null) {
          return null
        }
        num = n
      }
    }
    return num
  }

  pairCount(): number {
    let count = 0
    for (let num of CardNums) {
      let amount = this.numAmount(num)
      if (amount >= 2) {
        count += Math.floor(amount / 2)
      }
    }
    return count
  }

  isReach(): boolean {
    return this.Cards.length === 1
  }
}
