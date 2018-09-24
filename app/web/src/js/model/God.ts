import { PlayerID, PlayerType, CardMark, Lang } from '../type/Type'
import { CardMaxNum, CardJokerNum, CardNumsWithoutJoker } from '../constant/Card'
import PlayerData from '../data/PlayerData'
import CardData from '../data/CardData'
import DeckData from '../data/DeckData'
import Configer from '../config/Configer'
import Config from '../config/Config'
import Dealer from './Dealer'
import Players from './Players'
import Player from './Player'
import ScoreKeeper from './ScoreKeeper'
import Storager from '../storage/Storager'
import LocalStorage from '../storage/LocalStorage'
import Translator from '../i18n/Translator'
import TranslatorJA from '../i18n/Ja'
import TranslatorEN from '../i18n/En'
import Referee from './Referee'

export default class God {
  private config: Configer

  constructor() {
    this.config = Config.app()
  }

  createDealer(deck: DeckData) {
    return new Dealer(deck)
  }

  createReferee() {
    return new Referee
  }

  createStorage(): Storager {
    return new LocalStorage
  }

  createPlayers(): Players {
    let players = new Players(
      new Player(new PlayerData(1, PlayerType.Human),    this.config.Player1Brain()),
      new Player(new PlayerData(2, PlayerType.Computer), this.config.Player2Brain()),
      new Player(new PlayerData(3, PlayerType.Computer), this.config.Player3Brain()),
      new Player(new PlayerData(4, PlayerType.Computer), this.config.Player4Brain())
    )
    return players
  }

  createDeck(): DeckData {
    let cards: CardData[] = []

    // Prepare normal cards
    for (let num of CardNumsWithoutJoker) {
      cards.push(new CardData(CardMark.Club, num))
      cards.push(new CardData(CardMark.Diamond, num))
      cards.push(new CardData(CardMark.Heart, num))
      cards.push(new CardData(CardMark.Spade, num))
    }

    // Prepare Joker x2
    cards.push(new CardData(CardMark.JokerA, CardJokerNum))
    cards.push(new CardData(CardMark.JokerB, CardJokerNum))

    return new DeckData(cards)
  }

  createScoreKeeper(storage: Storager): ScoreKeeper {
    return new ScoreKeeper(storage)
  }

  createTranslator(): Translator {
    switch(this.config.Lang()) {
      case Lang.JA:
        return new TranslatorJA
      case Lang.EN:
        return new TranslatorEN
    }
    throw new Error(`Invalid lang: ${this.config.Lang()}`)
  }
}
