import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
export default class CaptureComponent extends React.Component {
  static propTypes = {
    insert: React.PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      actionDescription: ""
    };
  }
  handleDescriptionChange = (event) => {
    this.setState({
      ...this.state,
      actionDescription: event.target.value,
    });
  };
  saveAction = () => {
    this.props.insert(this.state.actionDescription);
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
              label="Capture!"/>
          </Paper>
        </div>
      </div>
    );
  }
}
