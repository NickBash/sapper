import './style.css'

class Sapper {
  constructor() {
    this.element = null
    this.board = []
    this.cellsBombs = null
    this.screen = null
  }

  init() {
    this.element = document.createElement('div')
    this.element.classList.add('board')
    this.element.setAttribute('id', 'board')

    this.element.addEventListener(
      'click',
      (e) => {
        this.switchCell(e.target.id)
      },
      false
    )

    this.element.appendChild(this.addCells())

    document.body.appendChild(this.element)
  }

  addCells() {
    const fragment = document.createDocumentFragment()

    this.addBombs()
    for (let i = 0; i <= 383; i++) {
      const el = document.createElement('div')
      el.classList.add('cell')
      el.classList.add('cell-disable')
      el.setAttribute('id', i)

      this.board[i] = this.cellsBombs.indexOf(+i) !== -1 ? true : false

      fragment.appendChild(el)
    }

    return fragment
  }

  addBombs() {
    this.cellsBombs = []
    let min = 0
    let max = 383
    for (let i = 0; i <= 20; i++) {
      let v = Math.floor(Math.random() * (max - min)) + min
      this.cellsBombs.push(v)
    }
  }

  switchCell(id) {
    if (id) {
      const $el = document.getElementById(id)
      if (!$el.classList.contains('cell-active')) {
        $el.classList.remove('cell-disable')
        if (this.cellsBombs.indexOf(+id) !== -1) {
          console.log('BOOM!')
          this.cellsBombs.forEach((item) => {
            console.log('item', item)
            document.getElementById(item).classList.remove('cell-disable')
            document.getElementById(item).classList.add('boom')
          })
          this.screen = document.createElement('span')
          this.screen.classList.add('span-block')
          this.screen.textContent = 'БУМ'
          document.getElementById('board').appendChild(this.screen)
          return
        }
        this.numberCell(id)
        $el.classList.add('cell-active')
      }
    }
  }

  numberCell(id) {
    if (this.board[+id] === false) {
      const brd = this.board
      let prev = brd[+id - 1]
      let next = brd[+id + 1]
      console.log(this.cellsBombs)
      console.log(prev, next)
      if (prev && next) {
        document.getElementById(id).textContent = '2'
      }
      if (prev || next) {
        document.getElementById(id).textContent = '1'
        console.log('Set 1')
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const sapper = new Sapper()
  sapper.init()
  //document.body.addEventListener('contextmenu', (e) => e.preventDefault())
})
