import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import {ListItem} from "material-ui/List";
const MODE_EDIT = "MODE_EDIT";
const MODE_READ = "MODE_READ";
export default class StuffEntry extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    nestedLevel: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    children: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: MODE_READ,
      description: this.props.description
    };
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  updateStuff = () => {
    this.props.update(this.props.id, this.state.description);
    this.setState({
      ...this.state,
      editMode: MODE_READ
    });
  };

  autofocus = (input) => {
    input && input.focus();
  };

  makeDescription = () => {
    if (this.state.editMode === MODE_EDIT) {
      return (
        <TextField
          ref={this.autofocus}
          value={this.state.description}
          onBlur={this.updateStuff}
          onChange={this.handleChange} />
      );
    } else {
      return this.state.description;
    }
  };

  edit = () => {
    this.setState({
      ...this.state,
      editMode: MODE_EDIT
    });
  };

  render() {
    return (
      <ListItem
        nestedLevel={this.props.nestedLevel}
        primaryText={this.makeDescription()}
        nestedItems={this.props.children}
        onClick={this.edit} />
    );
  }
}
