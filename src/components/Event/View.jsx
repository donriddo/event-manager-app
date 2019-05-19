import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { eventActions } from '../../_actions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  handleClose() {
    this.props.dispatch(eventActions.hideViewModal());
  };

  render() {
    const { classes, event } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={event.showViewModal}
          onClose={this.handleClose.bind(this)}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h3>Title</h3>
            <small>{event.view && event.view.title.toUpperCase()}</small>
            <h3>Host</h3>
            <strong>{ `${event.view.user.firstName} ${event.view.user.lastName}` }</strong>
            <h3>Address</h3>
            <p>{ event.view.address }</p>
            <h3>Details</h3>
            <p>{ event.view.details }</p>
            <h4>Start Date</h4>
            <p>{ new Date(event.view.from).toString().substr(0,15) }</p>
            <h4>End Date</h4>
            <p>{ new Date(event.view.to).toString().substr(0,15) }</p>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

function mapStateToProps(state) {
    const { event } = state;
    return {
        event,
    };
}

const connectedViewEvent = connect(mapStateToProps)(SimpleModalWrapped);
export { connectedViewEvent as ViewEvent };