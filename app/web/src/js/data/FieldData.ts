import { PlayerID } from '../type/Type'
import CardData from './CardData'

export default class FieldData {
  private putPlayerID: PlayerID | null

  constructor(
    private cards: CardData[]
  ) {
    this.putPlayerID = null
  }

  get Cards(): CardData[] {
    return this.cards
  }

  get PutPlayerID(): PlayerID | null {
    return this.putPlayerID
  }

  set PutPlayerID(id: PlayerID | null) {
    this.putPlayerID = id
  }

  top(): CardData | null {
    if (this.cards.length === 0) {
      return null
    }
    return this.cards[this.cards.length - 1]
  }
}
