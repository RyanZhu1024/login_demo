import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import activeState from './assets/active.png';
import ecstaticState from './assets/ecstatic.png';
import neutralState from './assets/neutral.png';
import peekState from './assets/peek.png';
import shyState from './assets/shy.png';
import './App.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '500px',
    margin: 'auto',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  avatar: {
    margin: 10,
    width: 500,
    height: 500,
    '& img': {
      transition: 'all .3s',
    },
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      password: '',
      email: '',
      avatar: neutralState,
    };
  }

  handleChange = type => event => {
    switch (type) {
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'email':
        if (event.target.value.indexOf('@') > 0) {
          this.setState({ email: event.target.value, avatar: ecstaticState });
        } else {
          this.setState({ email: event.target.value, avatar: activeState });
        }
        break;
      default:
        return;
    }
  };

  handleClickShowPassword = event => {
    this.setState({
      showPassword: !this.state.showPassword,
      avatar: this.state.avatar === peekState ? shyState : peekState,
    });
  };

  handleMouseDownPassword = () => {
    this.mouseDown = true;
  };

  handleBlurShowPassword = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ avatar: ecstaticState });
    } else {
      this.setState({ avatar: neutralState });
    }
  };

  handleFocus = type => () => {
    switch (type) {
      case 'password':
        this.setState({ avatar: shyState });
        break;
      case 'email':
        this.setState({ avatar: activeState });
        break;
      default:
        return;
    }
  };
  handleBlur = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      return;
    }
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ avatar: ecstaticState });
    } else {
      this.setState({ avatar: neutralState });
    }
  };
  render() {
    const { classes } = this.props;
    const { avatar } = this.state;
    return (
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="adornment-email">Email</InputLabel>
          <Input
            id="adornment-email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
            onFocus={this.handleFocus('email')}
            onBlur={this.handleBlur}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            onFocus={this.handleFocus('password')}
            onBlur={this.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onBlur={this.handleBlurShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(App);
