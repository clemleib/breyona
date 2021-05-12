import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import moment from 'moment';
// import { Editor } from '@tinymce/tinymce-react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { withRouter } from 'next/router';
import apiUrl from '../lib/config';
import validator from 'validator';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import logoutAction from '../lib/actions/logoutAction';
import {
  getAdmin,
  getAllUsers,
  creditUser,
  reverseCredit
} from '../lib/actions/userAction';
import Modal from '../components/Modal';
import BalanceModal from '../components/BalanceModal';
import HistoryModal from '../components/HistoryModal';
import CommissionDataTable from '../components/commissionDataTable';


import ReactDataTable from '../components/ReactDataTable';

/**
 * Dashboard component
 * @class Dashboard
 * @extends {Component}
 */
class Admin extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props
   * @memberOf Dashboard
   */
  static propTypes = {
    onChange2: PropTypes.func,
    onChange3: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      ref: '',
      userEmail: '',
      earnAmount: '',
      earnEmail: '',
      rearnAmount: '',
      rearnEmail: '',
      sUserEmail: "",
      sUserName: "",
      sUserSiteType: "",
      sUserSiteName: "",
      sUserSiteAddLoading: false,
      postSuccessful: '',
      postLoading: false,
      earnSite: '',
      earnSitename: '',
      earnType: '',
      rearnSite: '',
      rearnSitename: '',
      rearnType: '',
      error: '',
      rerror: '',
      title: '',
      link: '',
      category: '',
      ftitle: '',
      fdescription: '',
      flink: '',
      fLoading: false,
      fsuccess: '',
      ferror: '',
      faqcategory: '',
      fileName: '',
      description: '',
      usersSiteName: [],
      usersSites: [],
      allUsersSites: [],
      usersSiteName2: [],
      usersSites2: [],
      allUsersSites2: [],
      allSites: [],
      allSitesTypes: [],
      allSitesNames: [],
      rewardType: '',
      rewards: [],
      blogposts: [],
      faqList: [],
      editPayoutAmount: '',
      editPayoutUser: {},
      editPayoutError: false,
      showEditBox: false,
      value1: EditorState.createEmpty(),
      value2: EditorState.createEmpty(),
      isEdit: false,
      isEditBlog: false,
      editUserId: '',
      file: null,
      showDataTable: false,
      editDFC_allSites: [],
      editDFC_selectedSites: [],
      editDFC_sitetype: "",
      editDFC_sitename: "",
      editDFC_newcommission: "",
      editDFC_loading: false


    };
    this.payouts = this.payouts.bind(this);
    this.sites = this.sites.bind(this);
    this.status = this.status.bind(this);
    this.editPayout = this.editPayout.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onChange3 = this.onChange3.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deleteFaq = this.deleteFaq.bind(this);
    this.submitfaq = this.submitfaq.bind(this);
    this.changePriviledge = this.changePriviledge.bind(this);
    this.earnSubmit = this.earnSubmit.bind(this);
    this.rearnSubmit = this.rearnSubmit.bind(this);
    this.addUserSite = this.addUserSite.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.verifySite = this.verifySite.bind(this);
    this.users = this.users.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.getOptions2 = this.getOptions2.bind(this);
    this.selectOptionChange = this.selectOptionChange.bind(this);
    this.selectOptionChange2 = this.selectOptionChange2.bind(this);
    this.selectOptionChange3 = this.selectOptionChange3.bind(this);
    this.selectOptionChange4 = this.selectOptionChange4.bind(this);
    this.determineReward = this.determineReward.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.submitPayoutEdition = this.submitPayoutEdition.bind(this);
  }
  onChange2 = (e) => {
    const value1 = draftToHtml(convertToRaw(e.getCurrentContent()));
    // this.setState({ value1 });
    this.setState({ value1: e });
    if (this.props.onChange2) {
      this.props.onChange2(value1.toString('html'));
    }
    this.setState({ description: value1.toString('html') });
  }
  onChange3 = (e) => {
    const value2 = draftToHtml(convertToRaw(e.getCurrentContent()));;
    // this.setState({ value2 });
    this.setState({ value2: e });
    if (this.props.onChange3) {
      this.props.onChange3(value2.toString('html'));
    }
    this.setState({ fdescription: value2.toString('html') });
  }
  componentWillMount() {
    axios.get(`${apiUrl}/api/faq`).then(res => {
      if (res.data.success) {
        this.setState({ faqList: res.data.success });
        // this.props.setUserProfile(res.data.success)
      }
    });
    axios.get(`${apiUrl}/api/blog`).then(res => {
      if (res.data.success) {
        this.setState({ blogposts: res.data.success });
        // this.props.setUserProfile(res.data.success)
      }
    });
  }

  /**
   * Loads user's details on load
   * @method componentDidMount
   * @returns {void}
   * @memberOf Dashboard
   */
  componentDidMount() {

    if (!this.props.auth.isAuthenticated) {
      this.props.router.push('/login');
    } else if (this.props.auth.user.roleId !== 1) {
      this.props.router.push('/dashboard');
    } else {
      this.props.getAdmin();
      this.props.getAllUsers();
    }
  }

  /**
   * Listen for prop changes
   * @method componentWillReceiveProps
   * @param {any} nextProps
   * @returns {void}
   * @memberOf Dashboard
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      details: nextProps.user,
      loading: false
    });
  }

  /**
   * Handles change event
   * @param {any} e
   * @returns {void}
   * @memberOf Admin
   */
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'earnSite') {
      this.determineReward(e.target.value);
      const usersSiteName = this.state.allUsersSites.filter(
        b => b.site_type === e.target.value
      );
      this.setState({
        usersSiteName
      });
    }
    if (e.target.name === 'rearnSite') {
      this.determineReward(e.target.value);
      const usersSiteName2 = this.state.allUsersSites2.filter(
        b => b.site_type === e.target.value
      );
      this.setState({
        usersSiteName2
      });
    }
    if (e.target.name === 'sUserSiteType') {
      console.log("sUserSiteType");
      const allSitesNames = this.state.allSites.filter(
        b => b.site_type === e.target.value
      );
      this.setState({
        allSitesNames
      });
    }
  };

  confirmPayment(id, email, type, amount) {
    axios.post(`${apiUrl}/api/admin/confirm-payment`, { id, email, type, amount }).then(
      () => {
        swal
          .fire({
            title: 'Success',
            html: 'Payment Confirmed Successfully',
            type: 'success',
            allowOutsideClick: false
          })
          .then(() => {
            this.props.getAdmin();
          });
      },
      ({ response }) => {
        swal.fire({
          title: 'Error',
          html: response.data.message,
          type: 'error',
          allowOutsideClick: false
        });
      }
    );
  }
  submitPost(e) {
    e.preventDefault();
    this.setState({ postLoading: true });
    axios.post(`${apiUrl}/api/admin/submitpost`).then(res => {
      if (res.data.success) {
        this.setState({ postSuccessful: true, postLoading: false });
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  }
  deleteUser(user) {
    axios.post(`${apiUrl}/api/admin/deleteUser`, { user: user }).then(res => {
      if (res.data.success) {
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  }
  deletePost(id) {
    axios.post(`${apiUrl}/api/admin/deletePost`, { id: id }).then(res => {
      if (res.data.success) {
        window.location.reload();
      }
    });
  }
  deleteFaq(id) {
    axios.post(`${apiUrl}/api/admin/deleteFaq`, { id: id }).then(res => {
      if (res.data.success) {
        window.location.reload();
      }
    });
  }

  changePriviledge(user) {
    axios
      .post(`${apiUrl}/api/admin/changePriviledge`, { user: user })
      .then(res => {
        if (res.data.success) {
          setTimeout(() => window.location.reload(), 2000);
        }
      });
  }
  //Updated on the 12-july-2018 Beg
  clearBlogForm = e => {
    e.preventDefault();
    this.setState({
      title: '',
      link: '',
      category: '',
      editUserId: '',
      isEditBlog: false,
      fileName: ''
    });
  };

  clearFaqForm = e => {
    e.preventDefault();
    this.setState({
      ftitle: '',
      flink: '',
      fcategory: '',
      editUserId: '',
      isEdit: false
    });
  };
  editBlogPost = id => {
    {
      this.state.blogposts.map(post => {
        if (post._id === id) {
          let va = post.description;
          let va2 = va.toString('html');
          this.setState({
            title: post.title,
            link: post.link,
            category: post.category,
            isEditBlog: true,
            editUserId: id,
            fileName: post.imgUrl,
          });
        }
      });
    }
  };

  editFaq = id => {
    {
      this.state.faqList.map(faq => {
        if (faq._id === id) {
          let va = faq.description;
          let va2 = va.toString('html');
          this.setState({
            ftitle: faq.title,
            flink: faq.link,
            faqcategory: faq.category,
            isEdit: true,
            editUserId: id
          });
        }
      });
    }
  };
  updateFaq = e => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/admin/updateFaq`, {
        id: this.state.editUserId,
        title: this.state.ftitle,
        description: this.state.fdescription,
        category: this.state.faqcategory,
        link: this.state.flink
      })
      .then(res => {
        if (res.data.success) {
          window.location.reload();
        }
      });
  };
  //Updated on the 12-july-2018 End
  submitfaq(e) {
    e.preventDefault();
    this.setState({ fLoading: true, fsuccess: '', ferror: '' });
    axios
      .post(`${apiUrl}/api/admin/uploadFaq`, {
        title: this.state.ftitle,
        description: this.state.fdescription,
        category: this.state.faqcategory,
        link: this.state.flink
      })
      .then(res => {
        if (res.data.success) {
          this.setState({ fsuccess: true, fLoading: false });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else this.setState({ ferror: true, fLoading: false });
      })
      .catch(err => this.setState({ ferror: true, fLoading: false }));
  }
  verifySite = (id, status, username, site_name) => {
    axios.post(`${apiUrl}/api/admin/confirm-site`, { id, status, username, site_name }).then(
      response => {
        swal
          .fire({
            title: 'Success',
            html: response.data.message,
            type: 'success',
            allowOutsideClick: false
          })
          .then(() => {
            this.props.getAdmin();
          });
      },
      ({ response }) => {
        swal.fire({
          title: 'Error',
          html: response.data.message,
          type: 'error',
          allowOutsideClick: false
        });
      }
    );
  };
  submitPayoutEdition(e) {
    e.preventDefault();
    this.setState({ spLoading: true });
    axios
      .post(`${apiUrl}/api/finance/editPayout`, {
        payout: this.state.editPayoutUser,
        amount: this.state.editPayoutAmount
      })
      .then(res => {
        if (res.data.success) {
          window.location.reload();
        } else
          this.setState({
            spLoading: false,
            editPayoutError: res.data.message
          });
      });
  }
  editPayout(user) {
    this.setState({
      showEditBox: true,
      editPayoutUser: user,
      editPayoutError: '',
      editPayoutAmount: ''
    });
  }
  payouts() {
    let Payout;
    const { payouts } = this.props.admin;
    if (payouts.length > 0) {
      Payout = payouts.reverse().map((payout, i) => (
        <tr key={i}>
          <td>{payout.email}</td>
          <td>
            {payout.amount}{' '}
            <a href="#" onClick={() => this.editPayout(payout)}>
              <small>
                {' '}
                <i className="fa fa-pencil" />
              </small>{' '}
            </a>
          </td>
          <td>{payout.type.toUpperCase()}</td>
          <td>
            {payout.date ? moment(payout.date).format('DD MM YYYY') : "New Feature"}
          </td>
          <td>{payout.address}</td>
          <td>{payout.status}</td>
          <td>
            <button
              onClick={() => this.confirmPayment(payout.id, payout.email, payout.type, payout.amount)}
              className="cmn-btn confirm"
              disabled={payout.status === 'confirmed'}
            >
              {payout.status === "processing" ? "confirm" : payout.status}
            </button>
          </td>
          {/* <td></td> */}
        </tr>
      ));
    } else {
      Payout = (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            No payout requests at this time.
          </td>
        </tr>
      );
    }

    return Payout;
  }

  filterUser = email => {
    const { earnings } = this.props.user;
    if (Array.isArray(earnings)) {
      return earnings.filter(earning => earning.email === email);
    }
    else {
      return []
    }
  };

  filterHistories = email => {
    const { histories } = this.props.user;
    return histories.filter(earning => earning.email === email);
  };

  users() {
    let User,
      admin,
      regUsers;
    const { users, histories } = this.props.user;
    if (users.length > 0) {
      admin = users.filter(val => val.role === 1);
      regUsers = users.filter(val => val.role !== 1);

      User = []
        .concat(admin, regUsers.reverse())
        .map((user, i) => (
          <tr key={i}>
            <td>{user.email}</td>
            <td>{user.role === 1 ? 'Admin' : 'Regular User'}</td>
            <td>
              <BalanceModal earnings={this.filterUser(user.email)} id={i} />
            </td>
            <td>
              <HistoryModal
                userDetails={user.role}
                histories={this.filterHistories(user.email)}
                id={i}
              />
            </td>
            {
              user.email === '11letsgo@gmail.com' ? null : (
                <td>
                  <Modal user={user} id={i} onModalClick={this.deleteUser} />
                </td>
              )}
            {
              user.email === '11letsgo@gmail.com' ? null : (
                <td>
                  <button
                    className="btn btn-info"
                    onClick={e => {
                      e.preventDefault();
                      this.changePriviledge(user);
                    }}
                  >
                    Change priviledge
              </button>
                </td>
              )}
            {/* <td><button className="btn btn-danger btn-xs"></button></td> */}
          </tr>
        ));
    } else {
      User = (
        <tr>
          <td colSpan="2" style={{ textAlign: 'center' }}>
            No user to display
          </td>
        </tr>
      );
    }
    return User;
  }

  status(num) {
    switch (num) {
      case 0:
        return <i className="material-icons">timer</i>;
      case 1:
        return <i className="material-icons">check</i>;
      default:
        return <i className="material-icons">close</i>;
    }
  }

  sites() {
    /**
     *  0 => not checked
     *  1 => verified
     *  2 => Rejected
     */
    let Site,
      not_checked,
      rejected,
      confirmed;
    const { sites } = this.props.admin;
    if (sites.length > 0) {
      not_checked = sites.filter(val => val.status === 0);
      rejected = sites.filter(val => val.status === 2);
      confirmed = sites.filter(val => val.status === 1);
      Site = []
        .concat(not_checked.reverse(), rejected.reverse(), confirmed.reverse())
        .map((site, i) => (
          <tr key={i}>
            <td>{site.site_name}</td>
            <td>
              {site.username} &nbsp;
              {this.status(site.status)}
            </td>
            <td>{site.email}</td>
            <td>
              {site.status === 0 ? (
                <span>
                  <button
                    onClick={() => this.verifySite(site.id, 1, site.username, site.site_name)}
                    className="cmn-btn"
                  >
                    Valid
                  </button>
                  <button
                    className="cmn-btn"
                    style={{ backgroundColor: 'red', marginLeft: 5 }}
                    onClick={() => this.verifySite(site.id, 2, site.username, site.site_name)}
                  >
                    Invalid
                  </button>
                </span>
              ) : (
                  <button id="submit" disabled>
                    {site.status === 1 ? 'Verified' : 'Rejected'}
                  </button>
                )}
            </td>
          </tr>
        ));
    } else {
      Site = (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>
            No registered Sites yet.
          </td>
        </tr>
      );
    }

    return Site;
  }

  earnSubmit(e) {
    e.preventDefault();
    this.setState({
      error: ''
    });
    const {
      earnAmount,
      earnEmail,
      earnSite,
      earnSitename,
      earnType,
      rewardType
    } = this.state;
    if (
      !earnAmount ||
      !earnEmail ||
      // !earnSite ||
      // !earnSitename ||
      !earnType
      // ||
      // !rewardType
    ) {
      this.setState({
        error: 'Please fill all fields'
      });
      return;
    }
    this.props
      .creditUser({
        amount: earnAmount,
        email: earnEmail,
        siteName: earnSitename,
        siteType: earnSite,
        type: earnType,
        rewardType
      })
      .then(res => {
        if (res) {
          swal
            .fire({
              title: 'Success',
              html: 'User credited successfully!',
              type: 'success',
              allowOutsideClick: false
            })
            .then(() => {
              this.setState({
                earnAmount: '',
                earnEmail: '',
                earnSite: '',
                earnSitename: '',
                earnType: '',
                error: '',
                rewardType: ''
              });
            });
        }
      });
  }
  rearnSubmit(e) {
    e.preventDefault();
    this.setState({
      rerror: ''
    });
    const {
      rearnAmount,
      rearnEmail,
      rearnSite,
      rearnSitename,
      rearnType,
      rrewardType
    } = this.state;
    if (
      !rearnAmount ||
      !rearnEmail ||
      // !rearnSite ||
      //  !rearnSitename ||
      !rearnType
      // ||
      // !rrewardType
    ) {
      this.setState({
        rerror: 'Please fill all fields'
      });
      return;
    }
    this.props
      .reverseCredit({
        amount: rearnAmount,
        email: rearnEmail,
        siteType: rearnSite,
        siteName: rearnSitename,
        type: rearnType,
        rrewardType
      })
      .then(res => {
        if (res) {
          swal
            .fire({
              title: 'Success',
              html: 'Reversal successfully!',
              type: 'success',
              allowOutsideClick: false
            })
            .then(() => {
              this.setState({
                rearnAmount: '',
                rearnEmail: '',
                rearnSite: '',
                rearnSitename: '',
                rearnType: '',
                rerror: '',
                rrewardType: ''
              });
            });
        }
      });
  }
  /**
   * addUserSite
   */
  addUserSite(e) {
    this.setState({
      sUserSiteAddLoading: true
    });
    e.preventDefault();
    this.setState({
      rerror: ''
    });
    const {
      sUserEmail,
      sUserName,
      sUserSiteType,
      sUserSiteName
    } = this.state;
    if (
      !sUserEmail ||
      !sUserSiteType ||
      !sUserSiteName ||
      !sUserName
    ) {
      this.setState({
        sUserSiteAddLoading: false
      });
      swal.fire({
        title: "Error",
        html: "Please fill all fields",
        type: "error"
      })
      return
    }
    axios.post(`${apiUrl}/api/users/addusersite`, {
      email: sUserEmail,
      username: sUserName,
      sitetype: sUserSiteType,
      sitename: sUserSiteName
    }).then(res => {
      this.setState({
        sUserSiteAddLoading: false
      });
      swal.fire({
        type: 'success',
        html: 'site added to user successfully'
      });
    }, ({ response }) => {
      this.setState({
        sUserSiteAddLoading: false
      });
      swal.fire({
        type: 'error',
        html: response.data.message
      });
    })
  }

  /**
   * edit site commission
   */
  submitEditDFC = (e) => {
    e.preventDefault();
    this.setState({
      editDFC_loading: true
    });
    e.preventDefault();
    this.setState({
      rerror: ''
    });
    const {
      editDFC_sitetype,
      editDFC_sitename,
      editDFC_newcommission
    } = this.state;
    if (
      !editDFC_sitetype ||
      !editDFC_sitename ||
      !editDFC_newcommission
    ) {
      this.setState({
        editDFC_loading: false
      });
      swal.fire({
        title: "Error",
        html: "Please fill all fields",
        type: "error"
      })
      return
    }

    axios.post(`${apiUrl}/api/users/newsitecommission`, {
      sitetype: editDFC_sitetype,
      sitename: editDFC_sitename,
      commission: editDFC_newcommission
    }).then(res => {
      this.setState({
        editDFC_loading: false
      });
      swal.fire({
        type: 'success',
        html: 'commission updated successfully'
      });
    }, ({ response }) => {
      this.setState({
        editDFC_loading: false
      });
      swal.fire({
        type: 'error',
        html: response.data.message
      });
    })
  }
  /**
   * Fetch names that matches what the user is typing
   * @param {any} e
   * @returns {void}
   * @memberOf Users
   */
  getOptions(input) {
    return axios
      .get(`${apiUrl}/api/users/search?q=${input}`)
      .then(({ data }) => {
        const options = data.users.map(user => ({
          value: user.email,
          label: user.email
        }));
        return { options };
      });
  }
  getOptions2() {
    return axios.get(`${apiUrl}/api/users/sites/default`)
      .then(({ data }) => {
        this.setState({
          editDFC_allSites: data
        })
        let filter = [];
        data.map((site, i) => {
          if (!filter.find(v => v.site_type === site.site_type)) {
            filter.push(site);
          }
        });
        if (filter.length > 0) {
          const options = filter.map(s => ({
            value: s.site_type,
            label: s.site_type
          }));
          return { options }
        }

      });
  }

  /**
   * Set the student's name to state on change
   * @param {any} val
   * @returns {void}
   * @memberOf Documents
   */
  selectOptionChange(val) {
    this.setState(
      {
        earnEmail: val ? val.value : '',
        rearnEmail: ''
      },
      () => {
        axios
          .get(`${apiUrl}/api/users/sites/user?email=${val ? val.value : ''}`)
          .then(({ data }) => {
            const raw = data ? data.map(site => site.site_type) : [];
            this.setState({
              usersSites: Array.from(new Set(raw)),
              allUsersSites: data,
              usersSiteName: []
            });
          });
      }
    );
  }
  selectOptionChange2(val) {
    this.setState(
      {
        rearnEmail: val ? val.value : '',
        earnEmail: ''
      },
      () => {
        axios
          .get(`${apiUrl}/api/users/sites/user?email=${val ? val.value : ''}`)
          .then(({ data }) => {

            const raw = data.map(site => site.site_type);
            this.setState({
              usersSites2: Array.from(new Set(raw)),
              allUsersSites2: data,
              usersSiteName2: []
            });
          });
      }
    );
  }
  selectOptionChange3(val) {
    this.setState({
      sUserEmail: val ? val.value : '',
      sUserSiteName: '',
      sUserSiteType: ''
    },
      () => {
        axios
          .get(`${apiUrl}/api/users/sites/default`)
          .then(({ data }) => {

            const raw = data.map(site => site.site_type);
            this.setState({
              allSitesTypes: Array.from(new Set(raw)),
              allSites: data,
              allSitesNames: []
            });
          });
      }
    );
  }
  selectOptionChange4(val) {
    this.setState({
      editDFC_sitetype: val ? val.value : '',
      editDFC_selectedSites: [],
      editDFC_sitename: ''
    },
      () => {
        const raw = this.state.editDFC_allSites.filter(site => site.site_type === this.state.editDFC_sitetype);
        this.setState({
          editDFC_selectedSites: Array.from(new Set(raw))
        });
      }
    );
  }
  determineReward(earnSite) {
    switch (earnSite) {
      case 'poker':
        this.setState({
          rewards: [
            { value: 'rakeback_one', label: 'Rakeback One' },
            { value: 'rakeback_two', label: 'Rakeback Two' },
            { value: 'rakeback_three', label: 'Rakeback Three' }
          ]
        });
        break;
      case 'trading':
        this.setState({
          rewards: [
            { value: 'bonus', label: 'Bonus' },
            { value: 'free_rebate', label: 'Free Rebate' } //
          ]
        });
        break;
      case 'tools':
        this.setState({
          rewards: [
            { value: 'rewards', label: 'Rewards' },
            { value: 'free_rebate', label: 'Free Rebate' }
          ]
        });
        break;
      case 'sports':
        this.setState({
          rewards: [
            { value: 'betback', label: 'Betback' },
            { value: 'lossback', label: 'Lossback' }
          ]
        });
        break;
      default:
        this.setState({
          rewards: []
        });
    }
  }

  handleImageUpload = event => {
    const { target } = event;
    this.setState({
      fileName: target.files[0].name,
      file: target.files[0]
    });
  };

  saveBlogPost = () => {
    this.setState({ isLoading: true });
    const { file, category, description, title, link } = this.state;
    const form = new FormData();
    form.append('category', category);
    form.append('description', description);
    form.append('title', title);
    form.append('link', link);
    file && form.append('image', file);
    axios.post(`${apiUrl}/api/admin/blogpost`, form).then(res => {
      if (res.data.success) {
        this.setState({ postSuccessful: true, isLoading: false });
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

  updateBlogPost = e => {
    e.preventDefault();
    this.setState({ postLoading: true });
    const { file, category, description, title, link, editUserId } = this.state;
    const form = new FormData();
    form.append('id', editUserId);
    form.append('category', category);
    form.append('description', description);
    form.append('title', title);
    form.append('link', link);
    file && form.append('image', file);
    axios.post(`${apiUrl}/api/admin/updateBlogPost`, form).then(res => {
      if (res.data.success) {
        this.setState({ postSuccessful: true, postLoading: false });
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  addReferral = e => {
    e.preventDefault();
    const { ref, userEmail } = this.state;
    if (!ref || !userEmail) {
      this.setState({
        error: 'Please fill all the fields'
      });
      return;
    }
    axios
      .post(`${apiUrl}/api/admin/create-affiliate`, { ref, email: userEmail })
      .then(res => {
        swal.fire({
          type: 'success',
          html: 'Referral added successfully'
        });
      }, ({ response }) => {
        swal.fire({
          type: 'error',
          html: response.data.message
        });
      })
  };
  addNewSite = e => {
    e.preventDefault();
    const { new_siteType, new_siteName, new_siteCommission } = this.state;
    if (!new_siteType || !new_siteName || !new_siteCommission || isNaN(new_siteCommission)) {
      this.setState({
        error: 'Please check all the fields'
      });
      return;
    }

    let data = {
      siteType: new_siteType,
      siteName: new_siteName,
      commission: new_siteCommission
    }
    axios
      .post(`${apiUrl}/api/admin/create-site`, data)
      .then(res => {
        swal.fire({
          type: 'success',
          html: res.data.message
        }).then(() => {
          window.location.reload()
        });
      }, ({ response }) => {
        swal.fire({
          type: 'error',
          html: response.data.message
        });
      })
  };

  /**
   * Renders the Dashboard component
   * @method render
   * @returns {void}
   * @memberOf Dashboard
   */
  render() {
    const { error, rerror } = this.state;
    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated && this.props.auth.user.roleId === 1 && (
          <div>
            <section id="main" className="sec-pad admin">
              <div className="container">
                <div className="row">
                  <div className="d-flex flex-row mt-2">
                    <ul
                      className="nav nav-tabs nav-tabs--vertical nav-tabs--left"
                      role="navigation"
                    >
                      <li className="nav-item">
                        <a
                          href="#blogpost"
                          className="nav-link active"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          BLOG POSTS
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#lorem"
                          onClick={e => this.setState({ showDataTable: true })}
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="lorem"
                        >
                          EARNINGS
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#faq"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          FAQ
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#ipsum"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="ipsum"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          PAYOUTS
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#sit-amet"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          SITES
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#users"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          USERS
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#referrals"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          ADD REFERRAL
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#commissions"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          commissions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#sitesSettings"
                          className="nav-link"
                          data-toggle="tab"
                          role="tab"
                          aria-controls="sit-amet"
                          onClick={e => this.setState({ showDataTable: false })}
                        >
                          Sites Settings
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {/* <!-- 1st --> */}
                      <div
                        className="tab-pane fade show active"
                        id="blogpost"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div id="accordion">
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0">
                                    <button
                                      className="btn btn-link"
                                      data-toggle="collapse"
                                      data-target={`#collapseOne`}
                                      aria-expanded="true"
                                      aria-controls={`collapseOne`}
                                      style={{ color: '#000' }}
                                    >
                                      Blog posts
                                    </button>
                                  </h5>
                                </div>

                                <div
                                  id={`collapseOne`}
                                  className="collapse "
                                  aria-labelledby="headingOne"
                                  data-parent="#accordion"
                                >
                                  <div className="card-body">
                                    <div className="row">
                                      {this.state.blogposts.map(post => (
                                        <div
                                          className="col-md-6"
                                          style={{
                                            paddingBottom: '10px',
                                            paddingTop: '10px'
                                          }}
                                          key={post._id}
                                        >
                                          <div className="row">
                                            <div className="col-md-3">
                                              <img
                                                src={post.imgUrl}
                                                width="100px"
                                                height="50px"
                                              />
                                            </div>
                                            <div className="col-md-7">
                                              <div>{post.title}</div>
                                              <div>
                                                <small>
                                                  {moment(post.date).format(
                                                    'LL'
                                                  )}
                                                </small>
                                              </div>
                                            </div>

                                            <div className="col-md-2 col-lg-2">
                                              <a
                                                href="#"
                                                data-toggle="collapse"
                                                data-target={`#collapseOne1`}
                                                aria-expanded="true"
                                                aria-controls={`collapseOne1`}
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.editBlogPost(post._id);
                                                }}
                                                className=""
                                              >
                                                <small>Edit</small>
                                              </a>
                                              <br />
                                              <a
                                                href="#"
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.deletePost(post._id);
                                                }}
                                                className=""
                                              >
                                                <small>Delete</small>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div
                              className="history"
                              style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                            >
                              <h5>Add Blog Post</h5>

                              {this.state.postSuccessful === true ? (
                                <div className="alert alert-success">
                                  Blog post was Successful
                                </div>
                              ) : null}
                              {this.state.error ? (
                                <div className="alert alert-danger">
                                  Blog post was not Successful, Please try again
                                  later
                                </div>
                              ) : null}
                              <div className="history-list">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="">
                                      <label>
                                        {' '}
                                        Title{' '}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="title"
                                        onChange={this.onChange}
                                        name="title"
                                        value={this.state.title}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="">
                                      <label>
                                        {' '}
                                        Category{' '}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="category"
                                        onChange={this.onChange}
                                        name="category"
                                        value={this.state.category}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="">
                                      <label> Youtube video id</label>
                                      <input
                                        type="text"
                                        placeholder="youtube video id(e.g M7lc1UVf-VE)"
                                        onChange={this.onChange}
                                        name="link"
                                        value={this.state.link}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="">
                                      <label>
                                        {' '}
                                        Description{' '}
                                        <span className="text-danger">
                                          *
                                        </span>{' '}
                                      </label>
                                      {/* <Editor
                                        initialValue={this.state.value1}
                                        value={this.state.value1}
                                        init={{
                                          plugins: 'link image code',
                                          toolbar:
                                            'undo redo | bold italic | alignleft aligncenter alignright | code'
                                        }}
                                        onChange={this.onChange2}
                                      /> */}
                                      <Editor
                                        contentState={this.state.value1}
                                        initialEditorState={this.state.value1}
                                        editorState={this.state.value1}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onChange2}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {validator.isEmpty(
                                  this.state.fileName
                                ) ? null : (
                                    <div
                                      className="row "
                                      style={{ padding: '0px 15px' }}
                                    >
                                      You have choosen {this.state.fileName}
                                    </div>
                                  )}
                                {validator.isEmpty(this.state.fileName) ||
                                  validator.isEmpty(this.state.category) ||
                                  validator.isEmpty(this.state.description) ||
                                  validator.isEmpty(this.state.title) ? (
                                    <div style={{ marginTop: '10px' }}>
                                      <label
                                        className="picture-upload"
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <input
                                          className="upload-input"
                                          type="file"
                                          onChange={this.handleImageUpload}
                                          name="fileName"
                                        />
                                        upload image{' '}
                                        <i className="fa fa-arrow-circle-right" />
                                      </label>
                                    </div>
                                  ) : null}
                                <br />
                                {this.state.category &&
                                  this.state.description &&
                                  this.state.title ? (
                                    this.state.isEditBlog ? (
                                      <div>
                                        <button
                                          className="btn btn-success"
                                          style={{ marginTop: '10px' }}
                                          onClick={this.updateBlogPost}
                                        >
                                          Update
                                      </button>{' '}
                                        <button
                                          className="btn btn-primary"
                                          style={{ marginTop: '10px' }}
                                          onClick={this.clearBlogForm}
                                        >
                                          Cancel
                                      </button>{' '}
                                      </div>
                                    ) : (
                                        <button
                                          onClick={this.saveBlogPost}
                                          className="btn btn-success"
                                          disabled={this.state.isLoading}
                                        >
                                          {this.state.isLoading ? (
                                            <span>
                                              <i
                                                className="fa fa-spin fa-spinner"
                                                style={{ marginRight: '5px' }}
                                              />{' '}
                                              Uploading
                                        </span>
                                          ) : (
                                              'Continue'
                                            )}
                                        </button>
                                      )
                                  ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 2nd */}
                      <div className="tab-pane fade" id="lorem" role="tabpanel">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="flex">
                              <div
                                className="flex-first"
                                style={{ maxWidth: 'inherit' }}
                              >
                                <div
                                  className="convert"
                                  style={{
                                    boxShadow: ' 0 6.1px 10px 0 lightgrey'
                                  }}
                                >
                                  <h5>CREDIT USER</h5>
                                  {error && (
                                    <div className="error">{error}</div>
                                  )}
                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnEmail"
                                    >
                                      Please select user
                                    </label>
                                    <Async
                                      name="form-field-name"
                                      value={this.state.earnEmail}
                                      onChange={this.selectOptionChange}
                                      loadOptions={this.getOptions}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="small" htmlFor="earnSite">
                                      Select Site
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.earnSite}
                                      className="form-control"
                                      name="earnSite"
                                      id="earnSite"
                                    >
                                      <option value="">Please select</option>
                                      {this.state.usersSites.map(userSite => (
                                        <option value={userSite} key={userSite}>
                                          {' '}
                                          {userSite}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnSitename"
                                    >
                                      Select Sitename
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.earnSitename}
                                      className="form-control"
                                      name="earnSitename"
                                      id="earnSitename"
                                    >
                                      <option value="">Please select</option>
                                      {this.state.usersSiteName.map(
                                        (userSiteName, i) => (
                                          <option
                                            value={userSiteName.site_name}
                                            key={i}
                                          >
                                            {' '}
                                            {userSiteName.site_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>

                                  {/* <div className="form-group">
                                <label className="small" htmlFor="earnSitename">
                                  Payment Type
                            </label>
                                <select
                                  onChange={this.onChange}
                                  value={this.state.rewardType}
                                  className="form-control"
                                  name="rewardType"
                                >
                                  <option value="">Please select</option>
                                  {this.state.rewards.map((reward, i) => (
                                    <option value={reward.value} key={i}> {reward.label}</option>
                                  ))}
                                </select>
                              </div> */}

                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnAmount"
                                    >
                                      Enter Amount
                                    </label>
                                    <input
                                      onChange={this.onChange}
                                      value={this.state.earnAmount}
                                      type="number"
                                      className="form-control"
                                      name="earnAmount"
                                      aria-describedby="earnAmount"
                                      placeholder="Enter Amount"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label className="small" htmlFor="earnType">
                                      Select currency
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.earnType}
                                      className="form-control"
                                      name="earnType"
                                      id="earnType"
                                    >
                                      <option value="">Please select</option>
                                      <option value="USD">USD</option>
                                      <option value="BTC">BTC</option>
                                      <option value="ETH">ETH</option>
                                      <option value="BCH">BCH</option>
                                      <option value="LTC">LTC</option>
                                      <option value="DASH">DASH</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <button
                                      onClick={this.earnSubmit}
                                      className="cmn-btn"
                                    >
                                      CREDIT USER
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-second" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="flex">
                              <div
                                className="flex-first"
                                style={{ maxWidth: 'inherit' }}
                              >
                                <div
                                  className="convert"
                                  style={{
                                    boxShadow: ' 0 6.1px 10px 0 lightgrey'
                                  }}
                                >
                                  <h5> CREDIT USER REVERSAL</h5>
                                  {rerror && (
                                    <div className="error">{rerror}</div>
                                  )}
                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnEmail"
                                    >
                                      Please select user
                                    </label>
                                    <Async
                                      name="rform-field-name"
                                      value={this.state.rearnEmail}
                                      onChange={this.selectOptionChange2}
                                      loadOptions={this.getOptions}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label className="small" htmlFor="earnSite">
                                      Select Site
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.rearnSite}
                                      className="form-control"
                                      name="rearnSite"
                                      id="rearnSite"
                                    >
                                      <option value="">Please select</option>
                                      {this.state.usersSites2.map(userSite => (
                                        <option value={userSite} key={userSite}>
                                          {' '}
                                          {userSite}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnSitename"
                                    >
                                      Select Sitename
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.rearnSitename}
                                      className="form-control"
                                      name="rearnSitename"
                                      id="rearnSitename"
                                    >
                                      <option value="">Please select</option>
                                      {this.state.usersSiteName2.map(
                                        (userSiteName, i) => (
                                          <option
                                            value={userSiteName.site_name}
                                            key={i}
                                          >
                                            {' '}
                                            {userSiteName.site_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>

                                  {/* <div className="form-group">
                                <label className="small" htmlFor="earnSitename">
                                  Payment Reversal Type
                            </label>
                                <select
                                  onChange={this.onChange}
                                  value={this.state.rrewardType}
                                  className="form-control"
                                  name="rrewardType"
                                >
                                  <option value="">Please select</option>
                                  {this.state.rewards.map((reward, i) => (
                                    <option value={reward.value} key={i}> {reward.label}</option>
                                  ))}
                                </select>
                              </div> */}

                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnAmount"
                                    >
                                      Enter Amount To Reverse
                                    </label>
                                    <input
                                      onChange={this.onChange}
                                      value={this.state.rearnAmount}
                                      type="number"
                                      className="form-control"
                                      name="rearnAmount"
                                      aria-describedby="earnAmount"
                                      placeholder="Enter Amount"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label className="small" htmlFor="earnType">
                                      Select currency
                                    </label>
                                    <select
                                      onChange={this.onChange}
                                      value={this.state.rearnType}
                                      className="form-control"
                                      name="rearnType"
                                      id="earnType"
                                    >
                                      <option value="">Please select</option>
                                      <option value="USD">USD</option>
                                      <option value="BTC">BTC</option>
                                      <option value="ETH">ETH</option>
                                      <option value="BCH">BCH</option>
                                      <option value="LTC">LTC</option>
                                      <option value="DASH">DASH</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <button
                                      onClick={this.rearnSubmit}
                                      className="cmn-btn"
                                    >
                                      CREDIT REVERSE
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-second" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- 3rd --> */}
                      <div className="tab-pane fade" id="faq" role="tabpanel">
                        <div className="row">
                          <div className="col-md-12">
                            <div id="accordion">
                              <div className="card">
                                <div className="card-header" id="headingOne1">
                                  <h5 className="mb-0">
                                    <button
                                      className="btn btn-link"
                                      data-toggle="collapse"
                                      data-target={`#collapseOne1`}
                                      aria-expanded="true"
                                      aria-controls={`collapseOne1`}
                                      style={{ color: '#000' }}
                                    >
                                      Frequently asked question
                                    </button>
                                  </h5>
                                </div>

                                <div
                                  id={`collapseOne1`}
                                  className="collapse "
                                  aria-labelledby="headingOne1"
                                  data-parent="#accordion"
                                >
                                  <div className="card-body">
                                    <div className="row">
                                      {this.state.faqList.map(faq => (
                                        <div
                                          className="col-md-6"
                                          style={{
                                            paddingBottom: '10px',
                                            paddingTop: '10px'
                                          }}
                                          key={faq._id}
                                        >
                                          <div className="row">
                                            <div className="col-md-10">
                                              <div>{faq.title}</div>
                                              <div>
                                                <small>
                                                  Video Id - {faq.link}
                                                </small>
                                              </div>
                                              <div>
                                                <small>
                                                  {moment(faq.date).format(
                                                    'LL'
                                                  )}
                                                </small>
                                              </div>
                                            </div>

                                            <div className="col-md-2 col-lg-2">
                                              <a
                                                href="#"
                                                data-toggle="collapse"
                                                data-target={`#collapseOne1`}
                                                aria-expanded="true"
                                                aria-controls={`collapseOne1`}
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.editFaq(faq._id);
                                                }}
                                                className=""
                                              >
                                                <small>Edit</small>
                                              </a>
                                              <br />
                                              <a
                                                href="#"
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.deleteFaq(faq._id);
                                                }}
                                                className=""
                                              >
                                                <small>Delete</small>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div
                              className="history"
                              style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                            >
                              <h5>Add Frequently asked question </h5>

                              {this.state.fsuccess === true ? (
                                <div className="alert alert-success">
                                  Faq was posted Successfully
                                </div>
                              ) : null}
                              {this.state.ferror ? (
                                <div className="alert alert-danger">
                                  Faq was not posted Successfully, Please try
                                  again later
                                </div>
                              ) : null}
                              <div className="history-list">
                                <form onSubmit={this.submitfaq}>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="">
                                        <label>
                                          {' '}
                                          Title{' '}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          required
                                          type="text"
                                          placeholder="title"
                                          onChange={this.onChange}
                                          name="ftitle"
                                          value={this.state.ftitle}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="">
                                        <label>
                                          {' '}
                                          Category{' '}
                                          <span className="text-danger">*</span>
                                        </label>

                                        <select
                                          name="faqcategory"
                                          onChange={this.onChange}
                                          className="form-control"
                                          required="required"
                                          value={this.state.faqcategory}
                                        >
                                          <option value="">
                                            Select a category
                                          </option>
                                          <option value="general">
                                            General
                                          </option>
                                          <option value="poker">Poker</option>
                                          <option value="trading">
                                            Trading
                                          </option>
                                          <option value="sports">Sports</option>
                                          <option value="tools">Tools</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="">
                                        <label> Youtube video id</label>
                                        <input
                                          type="text"
                                          placeholder="youtube video id(e.g M7lc1UVf-VE)"
                                          onChange={this.onChange}
                                          name="flink"
                                          value={this.state.flink}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="">
                                        <label>
                                          {' '}
                                          Description{' '}
                                          <span className="text-danger">
                                            *
                                          </span>{' '}
                                        </label>
                                        {/* <RichTextEditor value={this.state.value2} onChange={this.onChange3} /> */}
                                        {/* <textarea required name="fdescription" onChange={this.onChange} id="" cols="30" rows="10"></textarea> */}
                                        {/* <Editor
                                          initialValue={this.state.value2}
                                          value={this.state.value2}
                                          init={{
                                            plugins: 'link image code',
                                            toolbar:
                                              'undo redo | bold italic | alignleft aligncenter alignright | code'
                                          }}
                                          onChange={this.onChange3}
                                        /> */}
                                        <Editor
                                          initialEditorState={this.state.value2}
                                          editorState={this.state.value2}
                                          toolbarClassName="toolbarClassName"
                                          wrapperClassName="wrapperClassName"
                                          editorClassName="editorClassName"
                                          onEditorStateChange={this.onChange3}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <style>
                                    {`
              .notranslate.public-DraftEditor-content{
                height:300px;
              }
                              }
                            `}
                                  </style>
                                  {this.state.isEdit ? (
                                    <div>
                                      <button
                                        className="btn btn-success"
                                        style={{ marginTop: '10px' }}
                                        onClick={this.updateFaq}
                                      >
                                        Update
                                      </button>{' '}
                                      <button
                                        className="btn btn-primary"
                                        style={{ marginTop: '10px' }}
                                        onClick={this.clearFaqForm}
                                      >
                                        Cancel
                                      </button>{' '}
                                    </div>
                                  ) : (
                                      <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{ marginTop: '10px' }}
                                      >
                                        {this.state.fLoading ? (
                                          <span>
                                            <i
                                              className="fa fa-spin fa-spinner"
                                              style={{ marginRight: '5px' }}
                                            />{' '}
                                            Uploading
                                        </span>
                                        ) : (
                                            'Submit'
                                          )}
                                      </button>
                                    )}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div />
                      </div>

                      {/* <!-- 4th --> */}
                      <div className="tab-pane fade" id="ipsum" role="tabpanel">
                        <div
                          className="history"
                          style={{
                            boxShadow: ' 0 6.1px 10px 0 lightgrey', maxHeight: '100vh',
                            overflow: "scroll",
                          }}
                        >
                          <h5>PAYOUT REQUESTS</h5>
                          {this.state.showEditBox ? (
                            <form onSubmit={this.submitPayoutEdition}>
                              <div className="row">
                                <div className="col-sm-12">
                                  <div
                                    className="row"
                                    style={{ padding: '5px' }}
                                  >
                                    <div className="col-sm-6 col-lg-6">
                                      <h6>
                                        Address:{' '}
                                        {this.state.editPayoutUser.email}
                                      </h6>
                                    </div>
                                    <div className="col-sm-3  col-lg-3">
                                      <h6>
                                        Amount:{' '}
                                        {this.state.editPayoutUser.amount}
                                      </h6>
                                    </div>
                                    <div className="col-sm-3  col-lg-3">
                                      <h6>
                                        Currency:{' '}
                                        {this.state.editPayoutUser.type}
                                      </h6>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label
                                      className="small"
                                      htmlFor="earnAmount"
                                    >
                                      Enter New Amount
                                    </label>
                                    <input
                                      onChange={this.onChange}
                                      type="number"
                                      required
                                      className="form-control"
                                      name="editPayoutAmount"
                                      placeholder={
                                        this.state.editPayoutUser.amount
                                      }
                                    />
                                  </div>
                                  <div className="form-group">
                                    {this.state.editPayoutError ? (
                                      <span className="text-danger danger-text">
                                        {this.state.editPayoutError}
                                      </span>
                                    ) : null}
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Edit Payout
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : null}
                          <div className="history-list">
                            <p>*</p>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>EMAIL</th>
                                  <th>AMOUNT</th>
                                  <th>CURRENCY</th>
                                  <th>Date</th>
                                  <th>ADDRESS</th>
                                  <th>STATUS</th>
                                  <th>ACTIONS</th>
                                  {/* <th>EDIT</th> */}
                                </tr>
                              </thead>
                              <tbody>{this.payouts()}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* <!-- 5th --> */}
                      <div
                        className="tab-pane fade"
                        id="sit-amet"
                        role="tabpanel"
                      >
                        <div
                          className="history sites-table-wrapper"
                          style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                        >
                          <h5>HISTORY</h5>
                          <div className="history-list">
                            <table className="table table-bordered responsive">
                              <thead>
                                <tr>
                                  <th>SITES</th>
                                  <th>USERNAME</th>
                                  <th>EMAIL</th>
                                  <th>ACTIONS</th>
                                </tr>
                              </thead>
                              <tbody>{this.sites()}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* <!-- 6th --> */}
                      <div className="tab-pane fade" id="users" role="tabpanel">
                        <div
                          className="history users-table-wrapper"
                          style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                        >
                          <h5>USERS</h5>
                          <div className="history-list">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>EMAIL</th>
                                  <th>ROLE</th>
                                  <th>Balance</th>
                                  <th>History</th>
                                  <th
                                    colSpan="2"
                                    style={{ textAlign: 'center' }}
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{this.users()}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <!-- 7th --> */}
                      <div
                        className="tab-pane fade"
                        id="referrals"
                        role="tabpanel"
                      >
                        <div
                          className="convert"
                          style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                        >
                          <h5>ADD REFERRAL</h5>
                          {error && <div className="error">{error}</div>}

                          <div className="form-group">
                            <label className="small" htmlFor="ref">
                              Enter Referral Code
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.ref}
                              type="text"
                              className="form-control"
                              name="ref"
                              aria-describedby="ref"
                              placeholder="Enter Referral Code"
                            />
                          </div>

                          <div className="form-group">
                            <label className="small" htmlFor="userEmail">
                              Enter Referred email
                            </label>
                            <input
                              onChange={this.onChange}
                              value={this.state.userEmail}
                              type="tezt"
                              className="form-control"
                              name="userEmail"
                              aria-describedby="userEmail"
                              placeholder="Enter the referred email"
                            />
                          </div>
                          <div className="form-group">
                            <button
                              onClick={this.addReferral}
                              className="cmn-btn"
                            >
                              Add referral
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- 8th --> */}
                      <div
                        className="tab-pane fade"
                        id="commissions"
                        role="tabpanel"
                      >
                        <div
                          className="history sites-table-wrapper"
                          style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                        >
                          <CommissionDataTable />
                        </div>
                      </div>

                      {/* <!-- 9th --> */}
                      <div
                        className="tab-pane fade container"
                        id="sitesSettings"
                        role="tabpanel"
                      >
                        <div className="row m-0 ">
                          {/**left */}
                          <div
                            className="convert col-md-5"
                            style={{ boxShadow: ' 0 6.1px 10px 0 lightgrey' }}
                          >
                            <h5>ADD New Site</h5>
                            {error && <div className="error">{error}</div>}

                            <div className="form-group">
                              <label className="small" htmlFor="new_siteType">
                                Enter Site Type
                              </label>
                              <input
                                onChange={this.onChange}
                                value={this.state.new_siteType}
                                type="text"
                                className="form-control"
                                name="new_siteType"
                                aria-describedby="new_siteType"
                                placeholder="poker || trading || sports || tools"
                              />
                            </div>

                            <div className="form-group">
                              <label className="small" htmlFor="new_siteName">
                                Enter Site Name
                              </label>
                              <input
                                onChange={this.onChange}
                                value={this.state.new_siteName}
                                type="text"
                                className="form-control"
                                name="new_siteName"
                                aria-describedby="new_siteName"
                                placeholder="Enter site Name"
                              />
                            </div>
                            <div className="form-group">
                              <label className="small" htmlFor="new_siteCommission">
                                Enter Default Site Commission
                              </label>
                              <input
                                onChange={this.onChange}
                                value={this.state.new_siteCommission}
                                type="number"
                                className="form-control"
                                name="new_siteCommission"
                                aria-describedby="new_siteCommission"
                                placeholder="Enter Default Site Commission"
                              />
                            </div>
                            <div className="form-group">
                              <button
                                onClick={this.addNewSite}
                                className="cmn-btn"
                              >
                                Add Site
                              </button>
                            </div>
                          </div>
                          {/**************************************** */}
                          <div
                            className="convert col-md-5 ml-4"
                            style={{
                              boxShadow: ' 0 6.1px 10px 0 lightgrey'
                            }}
                          >
                            <h5>Add Site To user</h5>
                            <form onSubmit={this.addUserSite}>
                              <div className="form-group">
                                <label
                                  className="small"
                                  htmlFor="sUserEmail"
                                >
                                  Please select user
                                  </label>
                                <Async
                                  name="form-field-name"
                                  value={this.state.sUserEmail}
                                  onChange={this.selectOptionChange3}
                                  loadOptions={this.getOptions}
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  className="small"
                                  htmlFor="sUserName"
                                >
                                  user name
                                  </label>
                                <input
                                  onChange={this.onChange}
                                  value={this.state.sUserName}
                                  type="text"
                                  className="form-control"
                                  name="sUserName"
                                  aria-describedby="sUserName"
                                  placeholder="Enter user name"
                                />
                              </div>
                              <div className="form-group">
                                <label className="small" htmlFor="sUserSiteType">
                                  Select Site
                                  </label>
                                <select
                                  onChange={this.onChange}
                                  value={this.state.sUserSiteType}
                                  className="form-control"
                                  name="sUserSiteType"
                                  id="sUserSiteType"
                                >
                                  <option value="">Please select</option>
                                  {this.state.allSitesTypes.map(userSite => (
                                    <option value={userSite} key={userSite}>
                                      {' '}
                                      {userSite}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group">
                                <label
                                  className="small"
                                  htmlFor="sUserSiteName"
                                >
                                  Select Sitename
                                  </label>
                                <select
                                  onChange={this.onChange}
                                  value={this.state.sUserSiteName}
                                  className="form-control"
                                  name="sUserSiteName"
                                  id="sUserSiteName"
                                >
                                  <option value="">Please select</option>
                                  {this.state.allSitesNames.map(
                                    (userSiteName, i) => (
                                      <option
                                        value={userSiteName.site_name}
                                        key={i}
                                      >
                                        {' '}
                                        {userSiteName.site_name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>

                              <div className="form-group">
                                {this.state.sUserSiteAddLoading ?
                                  <button className="btn btn-success" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                  </button> :
                                  <button
                                    className="cmn-btn"
                                    type="submit"
                                  >
                                    Add
                                  </button>

                                }
                              </div>

                            </form>
                          </div>
                          {/**************************************** */}
                        </div>
                        <div className="row m-0">
                          <div
                            className="convert col-md-5"
                            style={{
                              boxShadow: ' 0 6.1px 10px 0 lightgrey'
                            }}
                          >
                            <h5>Edit site commission</h5>
                            {/**DFC=> default site commission */}
                            <form onSubmit={this.submitEditDFC}>
                              <div className="form-group">
                                <label
                                  className="small"
                                  htmlFor="sUserEmail"
                                >
                                  Select Site
                                  </label>
                                <Async
                                  name="form-field-name"
                                  value={this.state.editDFC_sitetype}
                                  onChange={this.selectOptionChange4}
                                  loadOptions={this.getOptions2}
                                />
                              </div>
                              <div className="form-group">
                                <label className="small" htmlFor="editDFC_sitename">
                                  Select Sitename
                                  </label>
                                <select
                                  onChange={this.onChange}
                                  value={this.state.editDFC_sitename}
                                  className="form-control"
                                  name="editDFC_sitename"
                                  id="editDFC_sitename"
                                >
                                  <option value="">Please select</option>
                                  {this.state.editDFC_selectedSites.map(site => (
                                    <option value={site.site_name} key={site._id}>
                                      {' '}
                                      {site.site_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group">
                                <label className="small" htmlFor="editDFC_newcommission">
                                  Enter New Commission
                                  </label>
                                <input
                                  onChange={this.onChange}
                                  value={this.state.editDFC_newcommission}
                                  type="number"
                                  className="form-control"
                                  name="editDFC_newcommission"
                                  aria-describedby="editDFC_newcommission"
                                  placeholder="Enter new Commission"
                                />
                              </div>

                              <div className="form-group">
                                {this.state.editDFC_loading ?
                                  <button className="btn btn-success" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                  </button> :
                                  <button
                                    className="cmn-btn"
                                    type="submit"
                                  >
                                    Save
                                  </button>

                                }
                              </div>

                            </form>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {this.state.showDataTable && this.state.earnEmail ? (
              <section id="main" className="sec-pad poker">
                <div className="col-md-10 offset-1 col-sm-10 col-xs-12 col-lg-10">
                  <ReactDataTable
                    data={this.filterHistories(this.state.earnEmail)}
                  />
                </div>
              </section>
            ) : this.state.showDataTable && this.state.rearnEmail ? (
              <section id="main" className="sec-pad poker">
                <div className="col-md-10 offset-1 col-sm-10 col-xs-12 col-lg-10">
                  <ReactDataTable
                    data={this.filterHistories(this.state.rearnEmail)}
                  />
                </div>
              </section>
            ) : null}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  user: state.user
}); //

Admin.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired
  }).isRequired,
  logoutAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    logoutAction,
    getAdmin,
    getAllUsers,
    creditUser,
    reverseCredit,
  }
)(withRouter(Admin));
