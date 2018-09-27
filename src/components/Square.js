import React, { Component } from 'react';

class Square extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
        color: 'white'
      };
    }
   
    render() {
      let i = this.props.x;
      let j = this.props.y;
      if((i % 2) == 1 && (j % 2) == 1)
        this.state.color = 'white';
      else if((i % 2) == 1 && (j % 2) == 0) 
        this.state.color = 'black';
      else if((i % 2) == 0 && (j % 2) == 1)
        this.state.color = 'black';
      else  
        this.state.color = 'white';
      return (
        <input 
        className="square" 
        style = {{backgroundColor: this.state.color}}
        type="button" 
        value={this.state.value} 
        id={this.props.value}></input>
      );
    }
}
  
export default Square;