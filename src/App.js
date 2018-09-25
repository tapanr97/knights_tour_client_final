import React, { Component } from 'react';
import './App.css';
import HttpStatus from 'http-status-codes'

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      color: 'white'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = () => this.setState({value: this.props.value, color: 'red'})


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
      // <button
      //   className="square" 
      //   style = {{backgroundColor: this.state.color}}
      //   onClick={this.handleChange}
      //   id={this.props.value}
      // >
      //   {this.state.value}
      // </button>
      <input 
      className="square" 
      style = {{backgroundColor: this.state.color}}
      onclick={this.handleChange} 
      type="button" 
      value={this.state.value} 
      id={this.props.value}></input>
    );
  }
}

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

function changeStyle(prevInd, index, move_no) { 
  var urlString = 'url(' + require('./Capture.PNG') + ')';
  document.getElementById(index).style.background = urlString;   
  document.getElementById(index).style.backgroundSize = "30px 30px";   
  if(prevInd != -1) {
    document.getElementById(prevInd).value = move_no - 1; 
    document.getElementById(prevInd).style.background = '#fff968'; 
  }
}  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ind: 0,
      arr: [],
      dimensions: 6,
      x: 0,
      y: 0,
      id: 0
    }
    this.handleStart = this.handleStart.bind(this);    
    this.handleClear = this.handleClear.bind(this);    
  }

  handleStart = (e) => {

    e.preventDefault();
    let that = this;
    const url = "https://knights-tour.herokuapp.com/"
    const request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.withCredentials = true;
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function() {
      if(this.status == 200) {
        that.state.arr = JSON.parse(request.response);
      }
    }

    request.send(JSON.stringify(this.state));
    console.log(this.state.arr.ans);
    

    let tmp = 0;
    let prevInd = -1;
    let arr = this.state.arr.ans;
    let size = arr.length - 1;
    console.log(size);
    let myid = setInterval(function run(){

      let splt = arr[tmp].split(" ");
      let ind = parseInt(splt[1]) * parseInt(that.state.dimensions) + parseInt(splt[2]); 
      console.log(ind);
      changeStyle(prevInd, ind, splt[0]);
      prevInd = ind;
      tmp = tmp + 1;
      if(tmp === size)
        clearInterval(myid);
    }, 500);
    this.state.id = myid;
  }

  handleInput = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleClear = () => {
    clearInterval(this.state.id);
    for(let i = 0; i < this.state.dimensions; i++) {
      for(let j = 0; j < this.state.dimensions; j++) {
        if((i % 2) == 1 && (j % 2) == 1)
          document.getElementById(i * this.state.dimensions + j).style.background = 'white';
        else if((i % 2) == 1 && (j % 2) == 0)
          document.getElementById(i * this.state.dimensions + j).style.background = 'black';
        else if((i % 2) == 0 && (j % 2) == 1)
          document.getElementById(i * this.state.dimensions + j).style.background = 'black';
        else  
          document.getElementById(i * this.state.dimensions + j).style.background = 'white';
        document.getElementById(i * this.state.dimensions + j).value = '';  
      }
    }
    document.getElementById("in1").value = '';
    document.getElementById("in2").value = '';
    document.getElementById("in3").value = '';        
  }

  render() {
    return (
      <div className="dash">
        <div className="game">
          <div className="game-board">
            <Board dimensions = {this.state.dimensions}/>
          </div>
        </div>
        <div>
            <label>Enter the dimensions: </label>
            <input type='text' id = "in1" placeholder="Enter The dimensions" name = "dimensions" onChange = {this.handleInput}></input>
        </div>
        <div>
          <label>Enter the Starting Point: </label>
          <input type='text' id = "in2" placeholder="Enter X-coordinate" name = "x" onChange = {this.handleInput}></input>
          <input type='text' id = "in3" placeholder="Enter Y-coordinate" name = "y" onChange = {this.handleInput}></input>
        </div>
        <div>
            <button onClick={this.handleStart}>
              Start
            </button>
            <button onClick={this.handleClear}>
              Clear
            </button>
        </div>
      </div>
    );
  }
}


export default App;
