import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

    constructor(props) {
      super(props);
      this.state = {
        dimensions : 6
      }
    }
  
    renderSquare(i, j) {
      return <Square value={this.state.dimensions * i + j} x = {i} y = {j}/>;
    }
  
    createTable = () => {
      let rows = [];
      for(let i = 0; i < this.state.dimensions; i++) {
        let cols = [];
        for(let j = 0; j < this.state.dimensions; j++) {
          cols.push(this.renderSquare(i, j));
        }
        rows.push(<div className='board-row'>{cols}</div>);
      }
      return rows;
    }
  
    render() {
      if(this.props.dimensions > 6) this.state.dimensions = this.props.dimensions;
      else this.state.dimensions = 6;
      return (
        <div className="board">
          <div>
            {this.createTable()}
          </div>
        </div>
      );
    }
}

export default Board;
  