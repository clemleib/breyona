import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/** */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//userSites

class CommissionsModal extends Component {
    state= {
        open : false,
        user: null,
    }

    viewCommissions = ()=>{
        let { commissionsData , usersLength} = this.props;
        if(commissionsData.length === usersLength){
            let user = commissionsData.find(val=> val.email.toLowerCase()=== this.props.email.toLowerCase() )
            if(user){
                this.setState({user})
            }else{
                this.setState({user:null})
            }
        }else{
            this.setState({user:null})
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };


    handleClose = e => {
        this.setState({
            open: false,
        });
    };
    render() {
        const { open } = this.state;

        const styles = {
            root: {
            width: '100%',
            marginTop: 10,
            overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
            thSize: {
                fontSize:14
            },
            tdSize: {
                fontSize:12
            },
        };
        let commHtml;
        if(this.state.user){
            commHtml= (
                <Paper style={styles.root}>
                    <Table style={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={styles.thSize}>Email</TableCell>
                            <TableCell align="center" style={styles.thSize}>SITE NAME</TableCell>
                            <TableCell align="center" style={styles.thSize}>commission value</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow >
                            <TableCell component="th" scope="row" style={styles.thSize}
                            rowSpan= {this.state.user.userSites &&this.state.user.userSites.length >0 ?
                            String(this.state.user.userSites.length+1): "1"}
                            align="center"
                            >

                                {this.state.user.email}
                            </TableCell>
                            <TableCell align="center" style={styles.tdSize}>default commission</TableCell>
                            <TableCell align="center" style={styles.tdSize}>{this.state.user.default_commission}%</TableCell>
                        </TableRow>
                        {(this.state.user.userSites&&this.state.user.userSites.length > 0)&&
                            this.state.user.userSites.map(val=>(
                                <TableRow key={val.id}>
                                    <TableCell align="center" style={styles.tdSize}>{val.site_name}</TableCell>
                                    <TableCell align="center" style={styles.tdSize}>{val.commission}%</TableCell>
                                </TableRow>
                            ))
                        }
                        {(this.state.user.referrals&&this.state.user.referrals.length > 0)&&
                            <TableRow>
                                <TableCell align="center" component="th" scope="row" style={styles.thSize}>
                                    ::: Referrals :::
                                </TableCell>
                            </TableRow>
                        }
                        {(this.state.user.referrals&&this.state.user.referrals.length > 0)&&

                            this.state.user.referrals.map(val=>(
                                <TableRow key={val.id}>
                                    <TableCell align="center" style={styles.tdSize}>{val.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </Paper>

            )
        }else{
            commHtml= (
                <Table style={styles.table}>
                    <TableBody>
                        <TableRow >
                            <TableCell align="center">You have no histories to show</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )
        }
        return (
        <React.Fragment>


            <Button variant="outlined" color="primary" onClick={()=>{this.viewCommissions(); this.handleClickOpen();}}>
                View
            </Button>

            {/* History Modal es */}
            <Dialog
                fullWidth={true}
                maxWidth= "md"
                open={open}
                onClose={this.handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">commission sites & referrals</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    {commHtml}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
        )
    }
}

export default CommissionsModal;
