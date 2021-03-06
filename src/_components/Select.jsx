import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  constructor(props) {
      super(props);
      this.state = { open: true }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleOpen() {
    this.setState({ open: true });
  };

  render() {
    const { classes, view } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Select Type of View</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={view}
            onChange={this.handleChange}
            inputProps={{
              name: 'view',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value={'list'}>List View</MenuItem>
            <MenuItem value={'calendar'}>Calendar View</MenuItem>
            <MenuItem value={'map'}>Map View</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);