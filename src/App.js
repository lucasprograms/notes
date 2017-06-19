import ReactGridLayout from 'react-grid-layout' 
import React, { Component } from 'react'
import { v1 as buildUniqID } from 'uuid'
import Note from './components/Note'
import Header from './components/Header'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      layout: []
    }

    this.updateHeight = this.updateHeight.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  addNote() {
    this.setState({
      layout: [...this.state.layout, { i: buildUniqID(), x: this.state.layout.length * 2 % 12, y: Infinity, w: 2, h: 3, minH: 3, text: 'HELLO' } ]
    })
  }

  buildNotesFromLayout() {
    return (
      this.state.layout.map(
        layoutItem => <Note text={layoutItem.text || ''} key={layoutItem.i} gridKey={layoutItem.i} updateHeight={this.updateHeight}/>
      )
    )
  }

  updateHeight(key, type, rowDelta) {
    const gridItem = this.state.layout.filter(gridItem => gridItem.i === key)[0]
    const indexOfGridItem = this.state.layout.indexOf(gridItem)
    const currentHeight = gridItem.h
    const newHeight = type === 'DEC' ? currentHeight - rowDelta : currentHeight + rowDelta

    this.setState({
      layout: [
        ...this.state.layout.slice(0, indexOfGridItem),
        { ...gridItem, h: newHeight },
        ...this.state.layout.slice(indexOfGridItem + 1)
      ]
    })
  }

  render () {
    return (
      <div className="container">
        <Header />
        <ReactGridLayout className="layout"
                        layout={this.state.layout}
                        cols={100}
                        width={10000}
                        rowHeight={15}
                        containerPadding={[10, 10]}
                        onLayoutChange={(newLayout) => {
                          this.setState({
                            layout: newLayout
                          })
                        }}
        >
          {this.buildNotesFromLayout()}  
        </ReactGridLayout>
        <button onClick={this.addNote}>Add Note</button>
      </div>
    )
  }
}

export default App;
