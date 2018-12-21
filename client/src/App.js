import React, { Component } from 'react';
import GreetingsList from './GreetingsList';
import AddGreeting from './AddGreeting';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Greetings</h1>
        <AddGreeting />
        <GreetingsList />
      </div>
    );
  }
}

export default App;
