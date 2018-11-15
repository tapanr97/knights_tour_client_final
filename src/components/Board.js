import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

    constructor(props) {
      super(props);
      this.state = {
        n : 6,
        m: 6
      }
    }
  
    renderSquare(i, j) {
      return <Square value={this.state.m * i + j} x = {i} y = {j}/>;
    }
  
    createTable = () => {
      let rows = [];
      for(let i = 0; i < this.state.n; i++) {
        let cols = [];
        for(let j = 0; j < this.state.m; j++) {
          cols.push(this.renderSquare(i, j));
        }
        rows.push(<div className='board-row'>{cols}</div>);
      }
      return rows;
    }
  
    render() {
      if(this.props.n > 6 || this.props.m > 6) {
        this.state.n = this.props.n;
        this.state.m = this.props.m;
      }
      else this.state.n = this.state.m = 6;
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
  