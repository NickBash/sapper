import './style.css'

class Sapper {
  constructor() {
    this.element = null
    this.board = []
    this.cellsBombs = null
    this.screen = null
    this.sizeBoard = {
      maxY: 16,
      maxX: 24,
    }
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
    let id = 0
    for (let y = 0; y < this.sizeBoard.maxY; y++) {
      //const data = []
      for (let x = 0; x < this.sizeBoard.maxX; x++) {
        const el = document.createElement('div')
        el.classList.add('cell')
        el.classList.add('cell-disable')
        el.setAttribute('x', x)
        el.setAttribute('y', y)
        el.setAttribute('id', id)
        id++

        //data[x] = this.cellsBombs.indexOf(+x) !== -1 ? true : false
        // data[x] = this.cellsBombs.forEach((item) => {
        //   if (+item.x === +x) {
        //     return true
        //   }
        //   return false
        // })

        fragment.appendChild(el)
      }
      //this.board.push(data)
      //console.log(this.board)
    }
    return fragment
  }

  addBombs() {
    this.cellsBombs = []
    let min = 0
    let max = this.sizeBoard.maxY * this.sizeBoard.maxX
    for (let i = 0; i <= 50; i++) {
      //let y = Math.floor(Math.random() * 15)
      //let x = Math.floor(Math.random() * 23)

      let id = Math.floor(Math.random() * (max - min) + min)

      this.cellsBombs.push(id)
    }

    console.log(this.cellsBombs)
  }

  switchCell(id) {
    const $el = document.getElementById(id)
    if (id) {
      if (!$el.classList.contains('cell-active')) {
        $el.classList.remove('cell-disable')

        this.cellsBombs.forEach((item) => {
          // if (+item.x === +x && +item.y === +y) {
          //   console.log('BOOM!')
          //   this.activeBombs()
          // }
          if (+item === +id) {
            console.log('BOOM!')
            this.activeBombs()
          }
        })

        this.numberCell(id)
        this.numberCell2(id)
        $el.classList.add('cell-active')
      }
    }
  }

  activeBombs() {
    this.cellsBombs.forEach((item) => {
      document.getElementById(item).classList.remove('cell-disable')
      document.getElementById(item).classList.add('boom')
    })
    this.screen = document.createElement('span')
    this.screen.classList.add('span-block')
    this.screen.textContent = 'БУМ'
    document.getElementById('board').appendChild(this.screen)
    return
  }

  numberCell(id) {
    const $el = document.getElementById(id)
    const x = $el.getAttribute('x')
    const y = $el.getAttribute('y')

    let c1
    let c2
    let c3
    let c4
    let c6
    let c7
    let c8
    let c9

    const line1 = document.querySelectorAll(`div[y="${+y - 1}"]`)
    const line2 = document.querySelectorAll(`div[y="${y}"]`)
    const line3 = document.querySelectorAll(`div[y="${+y + 1}"]`)

    //console.log(line1)
    //console.log(line2)
    //console.log(line3)
    // if (this.board[+id] === false) {
    //   const brd = this.board
    //   let prev = brd[+id - 1]
    //   let next = brd[+id + 1]
    //   console.log(this.cellsBombs)
    //   console.log(prev, next)
    //   if (prev && next) {
    //     document.getElementById(id).textContent = '2'
    //   }
    //   if (prev || next) {
    //     document.getElementById(id).textContent = '1'
    //     console.log('Set 1')
    //   }
    // }
  }

  numberCell2(id) {
    const $el = document.getElementById(id)
    const x = $el.getAttribute('x')
    const y = $el.getAttribute('y')

    let counter = 0

    const $1 = x > 0 ? this.checkCellBomb(+id - this.sizeBoard.maxX - 1) : 0
    const $2 = y > 0 ? this.checkCellBomb(+id - this.sizeBoard.maxX) : 0
    const $3 =
      x < this.sizeBoard.maxX - 1
        ? this.checkCellBomb(+id - this.sizeBoard.maxX + 1)
        : 0
    const $4 = x > 0 ? this.checkCellBomb(+id - 1) : 0
    const $6 = x < this.sizeBoard.maxX - 1 ? this.checkCellBomb(+id + 1) : 0
    const $7 = x > 0 ? this.checkCellBomb(+id + this.sizeBoard.maxX - 1) : 0
    const $8 =
      y < this.sizeBoard.maxY - 1
        ? this.checkCellBomb(+id + this.sizeBoard.maxX)
        : 0
    const $9 =
      x < this.sizeBoard.maxX - 1
        ? this.checkCellBomb(+id + this.sizeBoard.maxX + 1)
        : 0
    console.log(
      '$1',
      $1,
      '$2',
      $2,
      '$3',
      $3,
      '$4',
      $4,
      '$6',
      $6,
      '$7',
      $7,
      '$8',
      $8,
      '$9',
      $9
    )

    counter = $1 + $2 + $3 + $4 + $6 + $7 + $8 + $9
    if (counter > 0) $el.textContent = counter
  }

  checkCellBomb(id) {
    return this.cellsBombs.indexOf(id) !== -1 ? 1 : 0
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const sapper = new Sapper()
  sapper.init()
  //document.body.addEventListener('contextmenu', (e) => e.preventDefault())
})
