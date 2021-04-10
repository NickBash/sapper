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

    this.element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.checkFlag(e.target)
    })

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
        //npm run el.textContent = `${x},${y}`
        this.addBombs(x, y)
        fragment.appendChild(el)

        if (x === this.sizeBoard.maxX - 1) {
          fragment.appendChild(document.createElement('br'))
        }
      }
    }

    this.numbersHandler()
    setTimeout(() => {
      this.board = document.querySelectorAll('.cell')
    }, 100)
    return fragment
  }

  addBombs(x, y) {
    const bombValue = 0.05

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
            setTimeout(() => {
              this.endgame()
            }, 100)
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
  }

  checkCellBomb(id) {
    return this.cellsBombs.indexOf(id) !== -1 ? 1 : 0
  }

  checkFlag(elem) {
    if (elem.classList.contains('cell-flag')) {
      elem.classList.remove('cell-flag')
    } else {
      elem.classList.add('cell-flag')
    }
  }

  endgame() {
    let win = true

    this.board.forEach((cell) => {
      let coord = cell.getAttribute('coord')
      if (
        !cell.classList.contains('cell-active') &&
        !this.cellsBombs.includes(coord)
      )
        win = false
    })
    if (win) {
      this.screen = document.createElement('span')
      this.screen.classList.add('span-block')
      this.screen.textContent = 'Победа!'
      document.getElementById('board').appendChild(this.screen)
      return
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const sapper = new Sapper()
  sapper.init()
})
