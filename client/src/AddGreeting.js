import React, { Component } from 'react';
import axios from 'axios';

class AddGreeting extends Component {
  state = { value: '' }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    axios.post(`${process.env.REACT_APP_API_ENTRYPOINT}/greetings`, { name: this.state.value });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Greeting:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddGreeting;
