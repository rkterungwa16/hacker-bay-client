import React, { Component, Fragment } from 'react'

import Witches from './Witches'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.state = {
      positions: [],
      shuffledPositions: [],
      count: 0,
      up: false,
      down: false,
      right: false,
      left: false,
      x: 0,
      y: 0,
      leftBorder: 0,
      rightBorder: 0,
      topBorder: 0,
      bottomBorder: 0,
      width: 0,
      height: 0
    }
  }

  componentDidMount () {
    const width = prompt('Enter board width')
    const height = prompt('Enter board height')
    this.setState({
      width,
      height
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      positions
    } = this.state
    if (positions.length > 0 && prevState.positions.length !== this.state.positions.length) {
      const shuffled = positions.sort(() => .5 - Math.random()) 
      let shuffledPositions =shuffled.slice(0,this.state.width)
      this.setState({
        shuffledPositions
      })
    }
  }

  handleKeyDown(e) {
    const {
      x,
      y,
      topBorder,
      bottomBorder,
      rightBorder,
      leftBorder,
      count,
      shuffledPositions
    } = this.state
    if (e.keyCode === 38 && y > topBorder + 10){
      this.setState({
        up: true,
        y: y - 40,
        count: count + 1,
        shuffledPositions: this.renderRemainingWitch(x, y, shuffledPositions)
      })
    }
    if (e.keyCode === 39 && x < rightBorder - 37){
      this.setState({
        right: true,
        x: x + 40,
        count: count + 1,
        shuffledPositions: this.renderRemainingWitch(x, y, shuffledPositions)
      })
    }
    if (e.keyCode === 40 && y < bottomBorder - 10){
      this.setState({
        down: true,
        y: y + 40,
        count: count + 1,
        shuffledPositions: this.renderRemainingWitch(x, y, shuffledPositions)
      })
    }
    if (e.keyCode === 37 && x > leftBorder + 10) {
      this.setState({
        left: true,
        x: x - 40,
        count: count + 1,
        shuffledPositions: this.renderRemainingWitch(x, y, shuffledPositions)
      })
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 38){
      this.setState({
        up: false
      })
    }
    if (e.keyCode === 39){
      this.setState({
        right: false
      })
    }
    if (e.keyCode === 40){
      this.setState({
        down: false
      })
    }
    if (e.keyCode === 37){
      this.setState({
        left: false
      })
    }
  }
  tableDataCellRef = element => {
    this.state.positions.push(element.getBoundingClientRect())
    this.setState({
      positions: this.state.positions.concat([element.getBoundingClientRect()])
    })
  }

  renderRemainingWitch = (x, y, shuffledPositions) => {
    const pos = shuffledPositions.filter((pos) => {
      return Math.abs(x - pos.x) > 6 || Math.abs(y - pos.y) > 6
    })
    return pos
  }

  tableRef = element => {
    if (element) {
      const x = element.getBoundingClientRect().width/2 + element.getBoundingClientRect().left
      const y = element.getBoundingClientRect().height/2 + element.getBoundingClientRect().top
      const bottomBorder = element.getBoundingClientRect().bottom
      const topBorder = element.getBoundingClientRect().top
      const leftBorder = element.getBoundingClientRect().left
      const rightBorder = element.getBoundingClientRect().right
      this.setState({
        x,
        y,
        bottomBorder,
        topBorder,
        leftBorder,
        rightBorder
      })
    }
  }

  renderBoard(row, col) {
    let table = []

    for (let i = 0; i < row; i++) {
      let children = []
      for (let j = 0; j < col; j++) {
        children.push(<td key={`td${j}`} ref={this.tableDataCellRef}></td>)
      }
      table.push(<tr key={`tr${i}`}>{children}</tr>)
    }
    return table
  }
  render() {
    const {
      x,
      y,
      shuffledPositions,
      width,
      height
    } = this.state

    return (
      <div
        className="App"
      >
        {
          width && height
          ?
            <Fragment>
              <Witches
                number={height}
                positions={shuffledPositions}
            />
            <span
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              tabIndex='0'
              role='img'
              aria-label='Image'
              style={{
                top: `${y}px`,
                left: `${x}px`
              }}
          >🚀</span>
            <table>
              <tbody ref={this.tableRef}>
                {this.renderBoard(width, height)}
              </tbody>
            </table>
          </Fragment>
          :
          <div>You need to enter width and Height</div>
        }
      </div>
    );
  }
}

export default App;
