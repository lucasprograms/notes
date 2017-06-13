import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import 'font-awesome/css/font-awesome.css'

class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.text
    }

    this.updateText = this.updateText.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  updateText(event) {
    this.setState({
      text: event.target.value
    })
  }

  onInputChange(key, event) {
    this.updateText(event)
    const textAreaHeight = Number(event.target.style.height.split('p')[0])
    const containerHeight = Number(event.target.offsetParent.style.height.split('p')[0])
    
    if (textAreaHeight > containerHeight - 24) {
      const rowsToAdd = (event.target.offsetHeight - (event.target.offsetParent.offsetHeight - 20)) / 15 + 1
      this.props.updateHeight(key, 'INC', 1)
    }
  }

  render() {
    const {
      style,
    } = this.props;
    const { onMouseDown, onMouseUp, onTouchStart, onTouchEnd } = this.props
    return (
      <div
        className="note"
        style={{
          background: '#B19CD9',
          border: '5px solid #9477cb',
          borderRadius: '10px',
          ...style,
        }}
      >
        <Textarea className="note-text" onChange={(event) => { this.onInputChange(this.props.gridKey, event) }} value={this.state.text} />
        <div
          className="draggable-item"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <i className="fa fa-arrows-alt"></i>
        </div>
      </div>
);
  }
} 

export default Note
