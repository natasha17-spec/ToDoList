import React from 'react';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {Snackbar} from '@material-ui/core';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function ErrorHelpers() {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    const error = useSelector<AppRootStateType>(state => state.helpers.status)
    const isOpen = error !== null


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        // setOpen(false);
    };

    return (
        <div className={classes.root}>

            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} >
                    This is a error message!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ErrorHelpers;