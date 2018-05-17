import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/authActions';
import { clearStorage } from '../../stores/localStorage';
import { updateRoute } from '../../helpers/routerHelper';
import Login from '../../components/Authentication/Login/index';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.props.login(value);
  }

  render() {
    return <Login onClick={this.onClick} updateRoute={this.props.route} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  login: PropTypes.func,
  route: PropTypes.func
};
