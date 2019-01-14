import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';
import Login from '../../components/Authentication/Login/index';
import { schemaOptions } from '../../server/parsedSchemas/login';
import { handleServerResponseError } from '../../helpers/utils';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formValue: {}, schemaOptions };
  }

  onPress = () => {
    let result = this.refs.loginContainer.refs.loginForm.validate();
    console.log(result);
    let value = this.refs.loginContainer.refs.loginForm.getValue();
    if (value) {
      this.onClick(value);
    }
  };

  onClick(value) {
    console.log(this.refs.loginContainer.refs.loginForm.validate());
    let formValue = this.refs.loginContainer.refs.loginForm.getValue();
    if (formValue) {
      this.props
        .login(value, this.props.navigation)
        .then(val => val)
        .catch(err => {
          console.log('err signup data', err);
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.schemaOptions
          );
          this.setState(
            {
              schemaOptions: {
                ...newSchemaOptions
              }
            },
            () => {
              this.refs.loginContainer.refs.loginForm.validate();
            }
          );
        });
      this.setState({ formValue: formValue });
    }
  }

  render() {
    return (
      <Login
        ref={'loginContainer'}
        onPress={this.onPress}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        formValue={this.state.formValue}
        schemaOptions={this.state.schemaOptions}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  login: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.object
};
