import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import axios from 'axios';
import apiUrl from '../lib/config';
import CommissionsModal from './CommitionsViewModal';


class commissionDataTable extends Component {
    state= {
        commissionEdit: false,
        commissionUsersData: [],
    }
    componentWillMount(){
       // this.props.getAllUsers();
    }
    componentDidMount(){
        //this.initCommissionsData()
    }
    componentWillReceiveProps(nextProps){
        this.initCommissionsData(nextProps.user)
    }
    /** c-1 */
    initCommissionsData = (user)=>{

        /**init */
        this.setState( {commissionUsersData: [] });
        let User,
        reqArr=[];
        let { users } = user;
        if (users.length > 0) {
            /**with out admins */
            //User = [].concat(users).filter(u => u.role!== 1 ).reverse();

            /**with admins */
            User = [].concat(users).map(val=> {
                reqArr.push({
                    uuid: val.uuid,
                    email: val.email,
                    default_commission: val.default_commission,
                })
            });

            if(users.length === reqArr.length){
                axios.post(`${apiUrl}/api/users/sites/user/array`,{users: reqArr })
                .then(({ data }) => {
                    this.setState( {commissionUsersData: data })
                }).catch(err=>{
                    this.setState( {commissionUsersData: [] })
                })
            }else{
                this.setState( {commissionUsersData: [] })
            }
        }

    }

    onCommissionChange = (e)=>{
        /**
         * set new value of site commition
         */
        let saveBtn = document.getElementById(`${e.target.dataset.saveid}`);
        saveBtn.dataset.newCommissionVal = e.target.value;
    }

    comissionSites2() {

        let user;
        let { commissionUsersData } = this.state;

        if (commissionUsersData.length === this.props.user.users.length) {

            user = []
            .concat(commissionUsersData)
            .map((user, i) => (
                <tr key={Math.random(16540354)+user.uuid}>
                    <th scope="row">{Number(i+1)}</th>
                    <td>{user.email}</td>
                    <td>
                    <select
                        onChange={this.onComissionSites2Change}
                        className="form-control"
                        name="comissionSites2Select"
                        id= "comissionSites2Select"
                        data-tduuid = {user.uuid}
                    >
                        <option value="">Please select</option>
                        <option
                            value= "default_commission"
                            data-usercommission = {user.default_commission}
                            data-email = {user.email}
                            data-sitetype={null}
                            data-sitename={null}
                            data-sitecommission = {null}
                        >
                            default_commission
                        </option>
                        {(user.sites&&user.sites.length>0)&&(
                            user.sites.map(site => (
                            <option
                                key={site.site_name+Math.random(1234567890)}
                                data-usercommission={null}
                                value={site.site_name}
                                data-email = {user.email}
                                data-sitetype={site.site_type}
                                data-sitename={site.site_name}
                                data-sitecommission={site.commission}

                            >
                                {' '}
                                {site.site_name}
                            </option>
                            ))
                        )}


                    </select>
                    </td>
                    {this.state.commissionEdit?
                    <td>
                    <div className ="form-group m-0 p-0">
                        <input
                        className ="form-control m-0 p-0"
                        data-saveid= {String(user.uuid)}
                        type= "number"
                        placeholder = "change current commission"
                        onChange= {this.onCommissionChange}
                        />
                    </div>

                    </td>
                    :
                    <td id={String(user.uuid)}>--%</td>
                    }
                    <td>
                    {this.state.commissionEdit ? (
                        <React.Fragment>
                        <button
                            id={String(user.uuid)}
                            onClick={this.saveCommissionEdit}
                            className="cmn-btn"
                            >
                            save
                        </button>

                        <button onClick = {()=>this.setState({commissionEdit: false})}
                        className="cmn-btn"
                            style= {{backgroundColor: '#dc3545', marginLeft: 10}}
                        >
                            Cancel
                        </button>
                        </React.Fragment>
                    ) : (
                        <Button variant="outlined" color="primary" onClick = {()=>this.setState({commissionEdit: true})}>
                            Edit
                        </Button>
                    )}
                    </td>
                    <td>
                        <CommissionsModal
                            commissionsData= {this.state.commissionUsersData}
                            usersLength= {this.props.user.users.length}
                            email = {user.email}
                        />
                    </td>
                </tr>
            ));
        } else if (commissionUsersData.length <= 0){
            user = (
                <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                    <p style={{
                            margin: 20, fontSize: 16
                    }}>
                        Waiting for data...
                    </p>
                </td>
                </tr>
            );

        }else {
            user = (
                <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                    <div className="spinner-grow text-primary" role="status">
                        <span className ="sr-only">Loading...</span>
                    </div>
                    <span style={{display:"inline-block"}}>Loading...</span>
                </td>
                </tr>
            );
        }

        return user;
    }
    onComissionSites2Change = (e)=>{
        var selected = e.target.options[e.target.selectedIndex];

        /**
         * set selcted site commission
         * targetdatainputid
         */
        if(selected.dataset.usercommission && selected.dataset.email && !this.state.commissionEdit){
        /**selct user */
            document.getElementById(`${e.target.dataset.tduuid}`).innerText = selected.dataset.usercommission;

        }else if(selected.dataset.sitecommission && selected.dataset.email && !this.state.commissionEdit){
        /**selct site */
            document.getElementById(`${e.target.dataset.tduuid}`).innerText = selected.dataset.sitecommission;

        }else if(!selected.dataset.email && !this.state.commissionEdit){
        /** not selection */
            document.getElementById(`${e.target.dataset.tduuid}`).innerText = "--%";
        }else{
            /**edit state */
            let saveBtn = document.getElementById(`${e.target.dataset.tduuid}`);
            saveBtn.dataset.email = selected.dataset.email;
            saveBtn.dataset.sitename = selected.dataset.sitename;
            saveBtn.dataset.sitetype = selected.dataset.sitetype;
            saveBtn.dataset.usercommission = selected.dataset.usercommission;
            saveBtn.dataset.sitecommission = selected.dataset.sitecommission;
        }

        //console.log("onComissionSites2Change ",data);
    }


    saveCommissionEdit = (e)=>{
        /**
         * send the new value of site commition with =>
         * -email -siteType -siteName
         *
         * sitetype: "poker", sitename: "SwCpoker", email: "variousTracks1@gmail.com"
         */
        let data = {
            email         : e.target.dataset.email,
            siteName      : e.target.dataset.sitename,
            siteType      : e.target.dataset.sitetype,
            userCommission : e.target.dataset.usercommission,
            siteCommission : e.target.dataset.sitecommission,
            newComm        : e.target.dataset.newCommissionVal
        }


        if(
            data.newComm &&
            data.newComm > 0 &&
            data.email &&
            (data.siteCommission||data.userCommission)
        ){

            axios.post(`${apiUrl}/api/users/editSiteCommission`, data)
            .then(response => {
                    swal.fire({
                    title: 'Success',
                    html: response.data.message,
                    type: 'success',
                    allowOutsideClick: false
                    }).then(() => {
                        this.setState({
                            commissionEdit: false,
                        });
                        /**
                         * re request new data
                         */
                        this.initCommissionsData(this.props.user)
                    });
                },
                ({ response }) => {
                swal.fire({
                    title: 'Error',
                    html: response.data.message,
                    type: 'error',
                    allowOutsideClick: false
                })
                }
            );


        }else{
            swal.fire({
                title: 'Error',
                html: "check your input or selection please..",
                type: 'error',
                allowOutsideClick: false
            });
        }

    }
    render() {

        return (
            <React.Fragment>
                <h5>SITES COMMISSIONS</h5>
                <div className="history-list">
                    <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th>Email</th>
                        <th>SITE NAME</th>
                        <th>COMMISSION</th>
                        <th>ACTIONS</th>
                        <th>View</th>
                        </tr>
                    </thead>
                    <tbody>{this.comissionSites2()}</tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
commissionDataTable.propTypes={
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps,null)(commissionDataTable);