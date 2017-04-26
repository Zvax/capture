import React from "react";
import http from './../utils/http';
import {CaptureComponent} from "./../Components";
export default class CaptureContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: []
    };
    this.loadStuff();
  }
  loadStuff = () => {
    http.makeRequest('GET', '/stuff', (response, statusCode) => {
      if (statusCode === 200) {
        this.setState({
          ...this.state,
          stuff: JSON.parse(response)
        });
      } else {
        console.log('there was a problem!', response);
      }
    });
  };
  insert = (description) => {
    http.post('/captures', {description: description}, () => {
      console.log('goal was saved');
      this.loadStuff();
    });
  };
  update = (id, description) => {
    http.put('/captures', {id: id, description: description}, () => {
      console.log('goal was updated');
    });
  };
  render() {
    return (
      <CaptureComponent
        insert={this.insert}
        update={this.update}
        stuff={this.state.stuff} />
    );
  }
}
