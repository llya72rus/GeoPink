import React, {useContext} from "react";
import {GoogleLogout} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

import Context from '../../context'

const Signout = ({ classes }) => {

  const onSignout = () => {
    dispatch({type: 'SIGNOUT_USER'})
  }

  const {dispatch} = useContext(Context);

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={() => (
        <span className={classes.root} onClick={onSignout}>
          <Typography
            variant='body1'
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon}/>  
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
