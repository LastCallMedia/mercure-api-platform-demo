import React, { Component } from 'react';
import axios from 'axios';

class GreetingsList extends Component {
  state = {
    greetings: [],
  }

  eventsource
  
  updateGreetings = message => {
    const greeting = JSON.parse(message.data)
    this.setState(prevState => (
      {
        greetings: [ ...prevState.greetings, greeting ] 
      }
    ));
  }

  componentWillMount() {
    const greetingsCollectionURL = `${process.env.REACT_APP_API_ENTRYPOINT}/greetings`
    axios.get(greetingsCollectionURL)
      .then(response => {
        if (typeof response.data['hydra:member'] !== 'undefined' && response.data['hydra:member'].length > 0) {
          this.setState({ greetings: response.data['hydra:member'] });
        }

        const url = new URL(process.env.REACT_APP_MERCURE_HUB_URL);
        url.searchParams.append('topic', `${greetingsCollectionURL}/{id}`);

        this.eventSource = new EventSource(url);
        this.eventSource.addEventListener('message', this.updateGreetings, false);
      })
  }

  componentWillUnmount() {
    this.eventSource.close();
  }

  render() {
    const greetingElements = [];
    this.state.greetings.forEach(greeting => {
      greetingElements.push(<div key={ greeting.id }>{greeting.name}</div>);
    })

    return (
      <div>
        <h1>Greetings</h1>
        {greetingElements}
      </div>
    );
  }
}

export default GreetingsList;
