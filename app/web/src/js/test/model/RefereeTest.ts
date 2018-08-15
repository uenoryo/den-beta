import * as mocha from "mocha"
import * as assert from 'power-assert'
import { TestPlayer } from '../Helpers'
import { GameSetType } from '../../type/Type'
import CardData from '../../data/CardData'
import FieldData from '../../data/FieldData'
import HandData from '../../data/HandData'
import Referee from '../../model/Referee'

describe('Referee', () => {
  describe('.constructor()', () => {
    context('正しく初期化できる', () => {
      new Referee
    })
  })

  describe('.judgePlainDone()', () => {
    context('素上がりの状態かどうかを返すことができる', () => {
      let player = TestPlayer()
      let referee = new Referee
      it('素上がりのケース', () => {
        player.Hand = new HandData([])
        assert.equal(referee.judgePlainDone(player), true)
      })

      it('素上がりではないケース', () => {
        player.Hand = new HandData([
          new CardData(0, 12),
        ])
        assert.equal(referee.judgePlainDone(player), false)
      })
    })
  })

  describe('.judgeDen()', () => {
    context('プレイヤーの手札で成立している GameSetType を返すことができる', () => {
      let tests = [
        {
          title: '手札が存在しない',
          hand: new HandData([
            new CardData(0, 12),
          ]),
          output: null,
        },
        {
          title: '役が成立していない',
          hand: new HandData([
            new CardData(0, 10),
            new CardData(0, 11),
          ]),
          output: null,
        },
        {
          title: 'Den',
          hand: new HandData([
            new CardData(0, 3),
            new CardData(0, 10),
          ]),
          output: GameSetType.Den,
        },
        {
          title: 'Anko',
          hand: new HandData([
            new CardData(0, 3),
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
          ]),
          output: GameSetType.Anko,
        },
        {
          title: 'Chitoi',
          hand: new HandData([
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
            new CardData(0, 11),
            new CardData(1, 11),
            new CardData(0, 10),
            new CardData(1, 10),
          ]),
          output: GameSetType.Chitoi,
        },
      ]
      let field = new FieldData([
        new CardData(0, 13),
      ])
      let referee = new Referee
      let player = TestPlayer()
      for (let test of tests) {
        it(test.title, () => {
          player.Hand = test.hand
          assert.equal(referee.judgeDen(player, field), test.output)
        })
      }
    })
  })

  describe('.isNormalDen()', () => {
    context('Denかどうかを返すことができる', () => {
      let tests = [
        {
          title: 'Den',
          hand: new HandData([
            new CardData(1, 13),
          ]),
          output: true,
        },
        {
          title: 'Denではない',
          hand: new HandData([
            new CardData(0, 11),
          ]),
          output: false,
        },
      ]
      let card = new CardData(0, 13)
      let referee = new Referee
      let player = TestPlayer()
      for (let test of tests) {
        it(test.title, () => {
          player.Hand = test.hand
          assert.equal(referee.isNormalDen(player, card), test.output)
        })
      }
    })
  })

  describe('.isAnko()', () => {
    context('Ankoかどうかを返すことができる', () => {
      let tests = [
        {
          title: 'Anko',
          hand: new HandData([
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
            new CardData(1, 1),
          ]),
          output: true,
        },
        {
          title: 'Ankoではない',
          hand: new HandData([
            new CardData(0, 12),
            new CardData(0, 12),
            new CardData(0, 12),
            new CardData(0, 1),
          ]),
          output: false,
        },
      ]
      let card = new CardData(0, 13)
      let referee = new Referee
      let player = TestPlayer()
      for (let test of tests) {
        it(test.title, () => {
          player.Hand = test.hand
          assert.equal(referee.isAnko(player, card), test.output)
        })
      }
    })
  })

  describe('.isChitoi()', () => {
    context('Chitoiかどうかを返すことができる', () => {
      let tests = [
        {
          title: 'Chitoi',
          hand: new HandData([
            new CardData(1, 13),
            new CardData(2, 13),
            new CardData(3, 13),
            new CardData(0, 11),
            new CardData(1, 11),
            new CardData(0, 10),
            new CardData(1, 10),
          ]),
          output: true,
        },
        {
          title: 'Chitoiではない',
          hand: new HandData([
            new CardData(1, 9),
            new CardData(1, 9),
            new CardData(2, 13),
            new CardData(3, 13),
            new CardData(0, 11),
            new CardData(1, 11),
            new CardData(0, 10),
            new CardData(1, 10),
          ]),
          output: false,
        },
      ]
      let card = new CardData(0, 13)
      let referee = new Referee
      let player = TestPlayer()
      for (let test of tests) {
        it(test.title, () => {
          player.Hand = test.hand
          assert.equal(referee.isChitoi(player, card), test.output)
        })
      }
    })
  })
})
