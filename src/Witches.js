import React, { PureComponent } from 'react'
import uniqid  from 'uniqid';

class Witches extends PureComponent {
  
  render() {
    const {
      positions,
      x,
      y
    } = this.props

    const witchPosition = positions.map((position) => {
      return <span
        tabIndex='0'
        key={uniqid()}
        role='img'
        aria-label='Image'
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          display: position.x === x && position.y === y ? 'none' : null
        }}
    >🧟‍</span>
    })

    return witchPosition
  }
}

export default Witches