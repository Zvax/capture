import React from "react";
import http from './../utils/http';
import {CaptureComponent} from "./../Components";
export default class CaptureContainer extends React.Component {
  insert = (description) => {
    http.post('/captures', {description: description}, () => {
      console.log('goal was saved');
    });
  };
  render() {
    return (
      <CaptureComponent insert={this.insert} />
    );
  }
}
