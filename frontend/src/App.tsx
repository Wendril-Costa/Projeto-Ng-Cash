import React, { Component } from 'react'


class App extends Component {
  state = {
    apiResponse: ''
  }

  callAPI() {
    fetch('http://localhost:3001')
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res }))
    .catch(err => err)
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>    
        <h1 className="App-title">Welcome to React</h1>
        <p className='App-intro'>{this.state.apiResponse}</p>
      </div>
    )
  }
}

export default App

