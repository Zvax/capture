import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {List, ListItem} from "material-ui/List";
export default class CaptureComponent extends React.Component {
  static propTypes = {
    stuff: PropTypes.array.isRequired,
    insert: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      actionDescription: ""
    };
  }

  listStuff = (stuff) => {
    return stuff.map((elem, i) => {
      if (elem.children && elem.children.length > 0) {
        return <ListItem key={i} primaryText={elem.description} nestedItems={this.listStuff(elem.children)} />;
      } else {
        return <ListItem key={i} primaryText={elem.description} />;
      }
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      ...this.state,
      actionDescription: event.target.value,
    });
  };
  saveAction = () => {
    this.props.insert(this.state.actionDescription);
    this.setState({
      ...this.state,
      actionDescription: "",
    });
  };

  render() {
    return (
      <div className="pure-g capture">
        <div className="pure-u-0 pure-u-md-1-5" />
        <div className="pure-u-1 pure-u-md-3-5">
          <Paper className="viewport">
            <TextField
              hintText="What must I do"
              value={this.state.actionDescription}
              onChange={this.handleDescriptionChange}
              fullWidth={true}
              multiLine={true} />
            <RaisedButton
              onClick={this.saveAction}
              label="Capture!" />
            <List>
              {this.listStuff(this.props.stuff)}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}
