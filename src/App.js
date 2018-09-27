import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

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
      arr: [],
      dimensions: 6,
      x: 0,
      y: 0,
      id: 0,
      interval: 500
    }
    this.handleStart = this.handleStart.bind(this);    
    this.handleClear = this.handleClear.bind(this);    
  }

  handleStart = (e) => {

    document.getElementById("in1").disabled = 'true';
    document.getElementById("in2").disabled = 'true';
    document.getElementById("in3").disabled = 'true';     
    document.getElementById("in4").disabled = 'true';

    e.preventDefault();
    let that = this;
    const url="http://localhost:3001/"
    //const url = "https://knights-tour.herokuapp.com/"
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
    let tmp = 0;
    let prevInd = -1;
    let arr = this.state.arr.ans;
    let size = arr.length - 1;
    let myid = setInterval(function run(){
      let splt = arr[tmp].split(" ");
      let ind = parseInt(splt[1]) * parseInt(that.state.dimensions) + parseInt(splt[2]); 
      changeStyle(prevInd, ind, splt[0]);
      prevInd = ind;
      tmp = tmp + 1;
      if(tmp === size)
        clearInterval(myid);
    }, this.state.interval);
    this.state.id = myid;
    document.getElementById("in1").disabled = '';
    document.getElementById("in2").disabled = '';
    document.getElementById("in3").disabled = '';     
    document.getElementById("in4").disabled = '';

  }

  handleInput = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleClear = () => {
    
    document.getElementById("in1").disabled = '';
    document.getElementById("in2").disabled = '';
    document.getElementById("in3").disabled = '';     
    document.getElementById("in4").disabled = '';

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
    document.getElementById("in4").value = '';        
  }

  render() {
    return (
      <div className="dash">
          <div style={{width: "50%"}}>
            <h1 style={{color:"yellow", fontSize:"50px"}}> Knight's Tour </h1>
            <h2 style={{color:"yellow", fontSize:"30px"}}> IT486 – Logic of Inference </h2>
          </div>
        <div className="game">
          <div className="game-board">
            <Board dimensions = {this.state.dimensions}/>
          </div>

        </div>
        <div>
            <label style={{color:"white", fontWeight:"bold"}}>Enter the dimensions: </label>
            <input type='text' id = "in1" placeholder="Enter The dimensions" name = "dimensions" onChange = {this.handleInput}></input>
        </div>
        <div>
          <label style={{color:"white", fontWeight:"bold"}}>Enter the Starting Point: </label>
          <input type='text' id = "in2" placeholder="Enter X-coordinate" name = "x" onChange = {this.handleInput}></input>
          <input type='text' id = "in3" placeholder="Enter Y-coordinate" name = "y" onChange = {this.handleInput}></input>
        </div>
        <div>
            <label style={{color:"white", fontWeight:"bold"}}>Enter the time interval (in ms): </label>
            <input type='text' id = "in4" placeholder="Enter the time interval" name = "interval" onChange = {this.handleInput}></input>
        </div>
        <div>
            <button onClick={this.handleStart}>
              Start
            </button>
            <button onClick={this.handleClear}>
              Clear
            </button>
        </div>
        <div>
          <h2 style={{color:"yellow"}}> Team Members: </h2>    
          <text style={{fontWeight:"bold", color:"white"}}>1) Tapan Modi (201501199)</text>  <br/>
          <text style={{fontWeight:"bold", color:"white"}}>1) Pratik Kayastha (201501248)</text>      
        </div>
      </div>
    );
  }
}


export default App;
