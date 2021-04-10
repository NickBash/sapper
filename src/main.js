import './style.css'

class Sapper {
  constructor() {
    this.element = null
    this.board = []
    this.cellsBombs = []
    this.numbers = []
    this.screen = null
    this.gameOver = false
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
        this.clickCell(e.target)
      },
      false
    )

    this.element.appendChild(this.addCells())

    document.body.appendChild(this.element)
  }

  addCells() {
    const fragment = document.createDocumentFragment()

    for (let y = 0; y < this.sizeBoard.maxY; y++) {
      //const data = []
      for (let x = 0; x < this.sizeBoard.maxX; x++) {
        const el = document.createElement('div')
        el.classList.add('cell')
        el.classList.add('cell-disable')
        el.setAttribute('coord', `${x},${y}`)
        //el.textContent = `${x},${y}`

        this.addBombs(x, y)
        fragment.appendChild(el)
      }
      //this.board.push(data)
      //console.log(this.board)
    }
    this.numbersHandler()
    return fragment
  }

  addBombs(x, y) {
    const bombValue = 0.2

    let rand = Math.random() < bombValue

    if (rand) {
      this.cellsBombs.push(`${x},${y}`)
      if (x > 0) this.numbers.push(`${x - 1},${y}`)
      if (x < this.sizeBoard.maxX - 1) this.numbers.push(`${x + 1},${y}`)
      if (y > 0) this.numbers.push(`${x},${y - 1}`)
      if (y < this.sizeBoard.maxY - 1) this.numbers.push(`${x},${y + 1}`)
      if (x > 0 && y > 0) this.numbers.push(`${x - 1},${y - 1}`)
      if (x < this.sizeBoard.maxX - 1 && y < this.sizeBoard.maxY - 1)
        this.numbers.push(`${x + 1},${y + 1}`)
      if (y > 0 && x < this.sizeBoard.maxX - 1)
        this.numbers.push(`${x + 1},${y - 1}`)
      if (x > 0 && y < this.sizeBoard.maxY - 1)
        this.numbers.push(`${x - 1},${y + 1}`)
    }
  }

  numbersHandler() {
    setTimeout(() => {
      this.numbers.forEach((n) => {
        let coord = n.split(',')
        //console.log(coord)
        let cell = document.querySelector(
          `div[coord="${+coord[0]},${+coord[1]}"]`
        )

        //console.log(cell)

        let num = +cell.getAttribute('num')
        if (!num) num = 0
        cell.setAttribute('num', +num + 1)
      })
    }, 10)
  }

  clickCell(elem) {
    console.log(elem)
    if (this.gameOver) return

    if (elem.hasAttribute('coord')) {
      const coord = elem.getAttribute('coord')
      if (!elem.classList.contains('cell-active')) {
        elem.classList.remove('cell-disable')

        if (this.cellsBombs.includes(coord)) {
          console.log('BOOM!')
          this.gameOver = true
          this.activeBombs()
        } else {
          const num = elem.getAttribute('num')
          if (num != null) {
            elem.classList.add('cell-active')
            elem.textContent = num
            return
          }
        }

        this.checkCell(elem, coord)
        elem.classList.add('cell-active')
      }
    }
  }

  activeBombs() {
    this.cellsBombs.forEach((item) => {
      document
        .querySelector(`div[coord="${item}"]`)
        .classList.remove('cell-disable')
      document.querySelector(`div[coord="${item}"]`).classList.add('boom')
    })
    this.screen = document.createElement('span')
    this.screen.classList.add('span-block')
    this.screen.textContent = 'БУМ'
    document.getElementById('board').appendChild(this.screen)
    return
  }

  checkCell(elem, coord) {
    let coords = coord.split(',')
    const x = +coords[0]
    const y = +coords[1]

    //console.log(coords)

    setTimeout(() => {
      if (x > 0) {
        let cellWest = document.querySelector(`div[coord="${x - 1},${y}"]`)
        this.clickCell(cellWest, `${x - 1},${y}`)
      }
      if (x < this.sizeBoard.maxX - 1) {
        let cellEast = document.querySelector(`div[coord="${x + 1},${y}"]`)
        this.clickCell(cellEast, `${x + 1},${y}`)
      }
      if (y > 0) {
        let cellNorth = document.querySelector(`div[coord="${x},${y - 1}"]`)
        this.clickCell(cellNorth, `${x},${y - 1}`)
      }
      if (y < this.sizeBoard.maxY - 1) {
        let cellSouth = document.querySelector(`div[coord="${x},${y + 1}"]`)
        this.clickCell(cellSouth, `${x},${y + 1}`)
      }
      if (x > 0 && y > 0) {
        let cellNorthWest = document.querySelector(
          `div[coord="${x - 1},${y - 1}"]`
        )
        this.clickCell(cellNorthWest, `${x - 1},${y - 1}`)
      }
      if (x < this.sizeBoard.maxX - 1 && y < this.sizeBoard.maxY - 1) {
        let cellSouthEast = document.querySelector(
          `div[coord="${x + 1},${y + 1}"]`
        )
        this.clickCell(cellSouthEast, `${x + 1},${y + 1}`)
      }
      if (y > 0 && x < this.sizeBoard.maxX - 1) {
        let cellNorthEast = document.querySelector(
          `div[coord="${x + 1},${y - 1}"]`
        )
        this.clickCell(cellNorthEast, `${x + 1},${y - 1}`)
      }
      if (x > 0 && y < this.sizeBoard.maxY - 1) {
        let cellSouthWest = document.querySelector(
          `div[coord="${x - 1},${y + 1}"]`
        )
        this.clickCell(cellSouthWest, `${x - 1},${y + 1}`)
      }
    }, 10)

    // const $1 = x > 0 ? this.checkCellBomb(+id - this.sizeBoard.maxX - 1) : 0
    // const $2 = y > 0 ? this.checkCellBomb(+id - this.sizeBoard.maxX) : 0
    // const $3 =
    //   x < this.sizeBoard.maxX - 1
    //     ? this.checkCellBomb(+id - this.sizeBoard.maxX + 1)
    //     : 0
    // const $4 = x > 0 ? this.checkCellBomb(+id - 1) : 0
    // const $6 = x < this.sizeBoard.maxX - 1 ? this.checkCellBomb(+id + 1) : 0
    // const $7 = x > 0 ? this.checkCellBomb(+id + this.sizeBoard.maxX - 1) : 0
    // const $8 =
    //   y < this.sizeBoard.maxY - 1
    //     ? this.checkCellBomb(+id + this.sizeBoard.maxX)
    //     : 0
    // const $9 =
    //   x < this.sizeBoard.maxX - 1
    //     ? this.checkCellBomb(+id + this.sizeBoard.maxX + 1)
    //     : 0
    // console.log(
    //   '$1',
    //   $1,
    //   '$2',
    //   $2,
    //   '$3',
    //   $3,
    //   '$4',
    //   $4,
    //   '$6',
    //   $6,
    //   '$7',
    //   $7,
    //   '$8',
    //   $8,
    //   '$9',
    //   $9
    // )

    //counter = $1 + $2 + $3 + $4 + $6 + $7 + $8 + $9
    //if (counter > 0) $el.textContent = counter
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
