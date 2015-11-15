import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import Metronome from './metronome';
import Categories from './categories';
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

var categories = [
  { name: "Scales",
    entries: [
    {
      best: {
        date:"1/1/1111",
        value: 60
      },
      recent: {
        date:"1/1/1111",
        value: 60
      }
    }
    ]
    },
    { name: "Arpeggios",
      entries: [
      {
        best: {
          date:"1/1/1111",
          value: 60
        },
        recent: {
          date:"1/1/1111",
          value: 60
        }
      }
      ]
      }
    ];
  export class App extends Component {
  render() {
    return (
      <div>
      <Metronome />
      <Categories categories={categories} />
      </div>
    );
  }
}
