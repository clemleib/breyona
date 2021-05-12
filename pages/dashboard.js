import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import { withRouter } from 'next/router';
import apiUrl from '../lib/config';
import { getSingleUser } from '../lib/actions/userAction';
import moment from 'moment';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link';
import WAValidator from 'wallet-address-validator';
import pokersite from '../lib/poker.json';
import tradingsite from '../lib/trading';
import sportsite from '../lib/sport';
import toolsite from '../lib/tool';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactTable from 'react-table-v6';
import ReactTooltip from 'react-tooltip'

import 'react-table/react-table.css';
import InlineSocial from '../components/InlineSocial';
/**
 * Dashboard component
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
	/**
	 * Creates an instance of Dashboard.
	 * @param {any} props
	 * @memberOf Dashboard
	 */
	constructor(props) {
		super(props);
		this.state = {
			cryptocurrencyToCovertTo: '',
			amountToConvert: 0,
			conversionRate: 0,
			error: '',
			cerror: '',
			cashOutCrypto: '',
			cashOutAmount: 0,
			cashOutAddress: '',
			passwordError: '',
			currentPass: '',
			newPass: '',
			newPassConfirm: '',
			qrError: '',
			token: '',
			stage2: false,
			secretToken: '',
		};
		// this.logOut = this.logOut.bind(this);
		this.status = this.status.bind(this);
		this.tools = this.tools.bind(this);
		this.sports = this.sports.bind(this);
		this.pokers = this.pokers.bind(this);
		this.tradings = this.tradings.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.histories = this.histories.bind(this);
		this.affiliate = this.affiliate.bind(this);
		this.onChange = this.onChange.bind(this);
		this.convert = this.convert.bind(this);
		this.convertIt = this.convertIt.bind(this);
		this.affiliatePayments = this.affiliatePayments.bind(this);
		this.cashOut = this.cashOut.bind(this);
		this.checkValue = this.checkValue.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.generateQR = this.generateQR.bind(this);
		this.confirmToken = this.confirmToken.bind(this);
		this.disableTfa = this.disableTfa.bind(this);
		this.validateAddress = this.validateAddress;
		if (!this.props.auth.isAuthenticated) {
			this.props.router.push('/login');
		}
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
		} else {
			this.props.getSingleUser();
		}
		/**
		 * trigger enter key on modal
		 */
		$(document).keypress(function (e) {
			if ($("#tfa").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
				$("#tfaEnablebtn").trigger("click", this.confirmToken)
			}
		});
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
			loading: false,
		});
	}

	onChange(e) {
		e.preventDefault();
		if (e.target.name === 'cryptocurrencyToCovertTo') {
			this.convertIt(e.target.value);
		}
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	convertIt(type) {
		axios
			.get(`https://rest.coinapi.io/v1/exchangerate/USD/${type}`, {
				"headers": {
					'X-CoinAPI-Key': '9AC9987E-F334-46B8-81E2-1B1B67CFBE29',
				},
			})
			.then(({ data }) => {
				this.setState({
					conversionRate: data.rate,
				});
			});
	}

	convert(e) {
		e.preventDefault();
		const { amountToConvert, cryptocurrencyToCovertTo, conversionRate } = this.state;
		this.setState({
			error: '',
		});
		if (!amountToConvert || !cryptocurrencyToCovertTo) {
			this.setState({
				error: 'Please fill all the fields',
			});
			return;
		}
		const converted = amountToConvert * conversionRate - (1 / 100) * (amountToConvert * conversionRate);
		axios
			.post(`${apiUrl}/api/finance/convert`, {
				amount: amountToConvert,
				value: converted,
				type: cryptocurrencyToCovertTo,
			})
			.then(
				() => {
					this.props.getSingleUser();
					swal.fire({
						title: 'Success',
						html: 'Conversion successful!',
						type: 'success',
						allowOutsideClick: false,
					}).then(() => {
						this.setState({
							amountToConvert: 0,
							conversionRate: 0,
							cryptocurrencyToCovertTo: '',
						});
					});
				},
				({ response }) => {
					swal.fire({
						title: 'Error',
						html: response.data.message,
						type: 'error',
						allowOutsideClick: false, //
					});
				}
			);
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

	pokers() {
		let Poker;
		const { sites } = this.props.user;
		const pokers = sites.filter(site => site.site_type === 'poker');
		if (pokers.length > 0) {
			Poker = pokers.reverse().map((poker, i) => (
				<div className="row" key={i} style={{ fontSize: '0.9em' }}>
					<div className="col-md-2 mod">
						<a style={{ textDecoration: 'underline' }} href={`/${poker.site_name}`}>
							{poker.site_name}
						</a>
					</div>
					<div className="col-md-3 mod">
						{poker.username} &nbsp;
						{this.status(poker.status)}
					</div>
					<div className="col-md-1 mod">
						{pokersite[poker.site_name.toLowerCase()] && pokersite[poker.site_name.toLowerCase()].bonus}
					</div>
					<div className="col-md-2 mod">
						{pokersite[poker.site_name.toLowerCase()] && pokersite[poker.site_name.toLowerCase()].rakeback1}
					</div>
					<div className="col-md-2 mod">
						{pokersite[poker.site_name.toLowerCase()] && pokersite[poker.site_name.toLowerCase()].rakeback2}
					</div>
					<div className="col-md-2 mod">
						{pokersite[poker.site_name.toLowerCase()] && pokersite[poker.site_name.toLowerCase()].rakeback3}
					</div>
				</div>
			));
		} else {
			Poker = (
				<div className="row">
					<div className="col-md-12" style={{ textAlign: 'center' }}>
						No rakeback added yet.
					</div>
				</div>
			);
		}
		return Poker;
	}

	tradings() {
		let Trading;
		const { sites } = this.props.user;
		const tradings = sites.filter(site => site.site_type === 'trading');
		if (tradings.length > 0) {
			Trading = tradings.reverse().map((trading, i) => (
				<div className="row" key={i} style={{ fontSize: '0.9em' }}>
					<div className="col-md-2 mod">
						<a style={{ textDecoration: 'underline' }} href={`/${trading.site_name}`}>
							{trading.site_name}
						</a>
					</div>
					<div className="col-md-3 mod">
						{trading.username} &nbsp;
						{this.status(trading.status)}
					</div>
					<div className="col-sm-1 mod">
						{' '}
						{tradingsite[trading.site_name.toLowerCase()] &&
							tradingsite[trading.site_name.toLowerCase()].bonus}{' '}
					</div>
					<div className="col-sm-2 mod">
						{' '}
						{tradingsite[trading.site_name.toLowerCase()] &&
							tradingsite[trading.site_name.toLowerCase()].free_rebate}
					</div>
					<div className="col-sm-2 mod">
						{tradingsite[trading.site_name.toLowerCase()] &&
							tradingsite[trading.site_name.toLowerCase()].other}{' '}
					</div>
					<div className="col-sm-2 mod"> </div>
				</div>
			));
		} else {
			Trading = (
				<div className="row">
					<div className="col-md-12" style={{ textAlign: 'center' }}>
						No exchanges added yet.
					</div>
				</div>
			);
		}

		return Trading;
	}

	sports() {
		let Sport;
		const { sites } = this.props.user;
		const sports = sites.filter(site => site.site_type === 'sports');
		if (sports.length > 0) {
			Sport = sports.reverse().map((sport, i) => (
				<div className="row" key={i} style={{ fontSize: '0.9em' }}>
					<div className="col-md-2 mod">
						<a style={{ textDecoration: 'underline' }} href={`/${sport.site_name}`}>
							{sport.site_name}
						</a>
					</div>
					<div className="col-md-3 mod">
						{sport.username} &nbsp;
						{this.status(sport.status)}
					</div>
					<div className="col-md-1 mod">
						{sportsite[sport.site_name.toLowerCase()] && sportsite[sport.site_name.toLowerCase()].bonus}
					</div>
					<div className="col-md-2 mod">
						{sportsite[sport.site_name.toLowerCase()] && sportsite[sport.site_name.toLowerCase()].betback}
					</div>
					<div className="col-md-2 mod">
						{sportsite[sport.site_name.toLowerCase()] && sportsite[sport.site_name.toLowerCase()].lossback}
					</div>
					<div className="col-md-2 mod"> </div>
				</div>
			));
		} else {
			Sport = (
				<div className="row">
					<div className="col-md-12" style={{ textAlign: 'center' }}>
						No eSports added yet.
					</div>
				</div>
			);
		}

		return Sport;
	}

	tools() {
		let Tool;

		const { sites } = this.props.user;
		const tools = sites.filter(site => site.site_type === 'tools');

		if (tools.length > 0) {
			Tool = tools.reverse().map((tool, i) => (
				<div className="row" key={i} style={{ fontSize: '0.9em' }}>
					<div className="col-md-2 mod">
						<a style={{ textDecoration: 'underline' }} href={`/${tool.site_name}`}>
							{tool.site_name}
						</a>
					</div>
					<div className="col-md-3 mod">
						{tool.username} &nbsp;
						{this.status(tool.status)}
					</div>
					<div className="col-md-1 mod">
						{toolsite[tool.site_name.toLowerCase()] && toolsite[tool.site_name.toLowerCase()].bonus}
					</div>
					<div className="col-md-2 mod">
						{toolsite[tool.site_name.toLowerCase()] && toolsite[tool.site_name.toLowerCase()].discount}
					</div>
					<div className="col-md-2 mod">
						{toolsite[tool.site_name.toLowerCase()] && toolsite[tool.site_name.toLowerCase()].coupons}
					</div>
					<div className="col-md-2 mod"> </div>
				</div>
			));
		} else {
			Tool = (
				<div className="row">
					<div className="col-md-12" style={{ textAlign: 'center' }}>
						No tools added yet.
					</div>
				</div>
			);
		}

		return Tool;
	}

	checkValue(value, type) {
		if (type === 'payout') {
			return value === 0 ? 'pending' : 'processed';
		}
		return value;
	}

	histories(type) {
		let History;
		const { histories } = this.props.user;
		console.log('my his : ', histories);
		if (histories.length > 0) {
			if (type === 'credits') {
				History = histories.map((history, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>
							{moment(history.date)

								.format('lll')}
						</td>
						{/* <td>{moment(history.date).format('ll')}</td> */}
						{/* <td>{history.type}</td> */}
						<td>
							{history.site ? (
								<span>
									{history.site} {history.site_type}
								</span>
							) : (
									''
								)}
						</td>
						{/* <td>{history.address ? history.address : ''}</td> */}
						<td>
							{history.type === 'conversion'
								? `USD - ${history.amountType.toUpperCase()}`
								: history.amountType.toUpperCase()}
						</td>
						<td>
							{history.type === 'conversion'
								? `${history.amount} USD - ${history.value} ${history.amountType.toUpperCase()}`
								: history.amount || ''}
						</td>
						{/* <td>{this.checkValue(history.value, history.type)}</td> */}
					</tr>
				));
			} else if (type === 'conversions') {
				History = histories.map((history, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						{/* <td>
							{moment(history.date)
								.zone('+0100')
								.format('lll')}
						</td> */}
						{/* <td>{moment(history.date).format('ll')}</td> */}
						{/* <td>{history.type}</td> */}
						{/* <td>
							{history.site ? (
								<span>
									{history.site} {history.site_type}
								</span>
							) : (
								''
							)}
						</td> */}
						{/* <td>{history.address ? history.address : ''}</td> */}
						<td>
							{history.type === 'conversion'
								? `USD - ${history.amountType.toUpperCase()}`
								: history.amountType.toUpperCase()}
						</td>
						{/* <td>
							{history.type === 'conversion'
								? `${history.amount} USD - ${history.value} ${history.amountType.toUpperCase()}`
								: history.amount || ''}
						</td> */}
						{/* <td>{this.checkValue(history.value, history.type)}</td> */}
					</tr>
				));
			} else if (type === 'withdrawals') {
				History = histories.map((history, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						{/* <td>
							{moment(history.date)
								.zone('+0100')
								.format('lll')}
						</td> */}
						{/* <td>{moment(history.date).format('ll')}</td> */}
						{/* <td>{history.type}</td> */}
						{/* <td>
							{history.site ? (
								<span>
									{history.site} {history.site_type}
								</span>
							) : (
								''
							)}
						</td> */}
						{/* <td>{history.address ? history.address : ''}</td> */}
						{/* <td>
							{history.type === 'conversion'
								? `USD - ${history.amountType.toUpperCase()}`
								: history.amountType.toUpperCase()}
						</td> */}
						<td>
							{history.type === 'conversion'
								? `${history.amount} USD - ${history.value} ${history.amountType.toUpperCase()}`
								: history.amount || ''}
						</td>
						{/* <td>{this.checkValue(history.value, history.type)}</td> */}
					</tr>
				));
			}
		} else {
			History = (
				<tr>
					<td colSpan="7" style={{ textAlign: 'center' }}>
						You have no histories to show
					</td>
				</tr>
			);
		}

		return History;
	}
	substr(text, start, length) {
		if (text.length > length) {
			return text.substr(start, length) + '...';
		} else return text;
	}
	affiliate() {
		let Affiliate;
		const { affiliate } = this.props.user;
		if (affiliate) {
			Affiliate = affiliate.referrals.map((referral, i) => (
				<tr key={i}>
					<td>{i + 1}</td>
					<td>{moment(referral.date).format('l')}</td>
					{/* <td>{referral.type}</td> */}
					<td>
						{referral.email ? (
							<span>
								{this.substr(referral.email, 0, 2)}...
								{this.substr(referral.email, -10, 3)}...
								{referral.email.substr(-3)}
							</span>
						) : (
								''
							)}
					</td>
					{/* <td>{referral.address ? history.address : ''}</td> */}
					{/* <td>{referral.amountType}</td> */}
					{/* <td>{referral.amount || ''}</td> */}
					{/* <td>{this.checkValue(history.value, history.type)}</td> */}
				</tr>
			));
		} else {
			Affiliate = (
				<tr>
					<td colSpan="7" style={{ textAlign: 'center' }}>
						You have no referrals to show
					</td>
				</tr>
			);
		}

		return Affiliate;
	}
	affiliatePayments() {
		let Affiliate;
		const { affiliate } = this.props.user;
		if (affiliate) {
			Affiliate = affiliate.commission.map((referral, i) => (
				<tr key={i}>
					{/* <td>{i + 1}</td> */}
					{/* <td>{moment(referral.date).format("l")}</td> */}
					{/* <td>{referral.type}</td> */}
					<td>
						{referral.email ? (
							<span>
								{this.substr(referral.email, 0, 2)}...
								{this.substr(referral.email, -10, 3)}...
								{referral.email.substr(-3)}
							</span>
						) : (
								''
							)}
					</td>

					{/* <td>{referral.address ? history.address : ''}</td> */}
					{/* <td>{referral.amountType}</td> */}
					<td>{referral.amount || ''}</td>
					<td>{referral.type || ''}</td>
					{/* <td>{this.checkValue(history.value, history.type)}</td> */}
				</tr>
			));
		} else {
			Affiliate = (
				<tr>
					<td colSpan="7" style={{ textAlign: 'center' }}>
						You have not received any commission
					</td>
				</tr>
			);
		}

		return Affiliate;
	}
	formatDate(date) {
		const year = new Date(date).getFullYear();
		const month = new Date(date).getMonth();
		const day = new Date(date).getDate();

		return `${year}-${month}-${day}`;
	}
	validateAddress(cashOutAddress, cashOutCrypto) {
		var valid = WAValidator.validate(cashOutAddress, cashOutCrypto);
		if (valid) return true;
		else return false;
	}
	cashOut(e) {
		e.preventDefault();
		const { cashOutAddress, cashOutAmount, cashOutCrypto } = this.state;
		this.setState({
			cerror: '',
		});
		if (!cashOutAddress || !cashOutAmount || !cashOutCrypto) {
			this.setState({
				cerror: 'Please fill all fields',
			});
			return;
		} else if (!this.validateAddress(cashOutAddress, cashOutCrypto)) {
			this.setState({
				cerror: 'Please enter the correct withdrawal address',
			});
			return;
		}
		axios
			.post(`${apiUrl}/api/finance/payout`, {
				amount: cashOutAmount,
				address: cashOutAddress,
				type: cashOutCrypto,
			})
			.then(
				() => {
					this.props.getSingleUser();
					swal.fire({
						title: 'Success',
						html: 'Please check your email to confirm your withdrawal',
						type: 'success',
						allowOutsideClick: false,
					}).then(() => {
						this.setState({
							cashOutAmount: 0,
							cashOutAddress: '',
							cashOutCrypto: '',
						});
					});
				},
				({ response }) => {
					swal.fire({
						title: 'Error',
						html: response.data.message,
						type: 'error',
						allowOutsideClick: false, //
					});
				}
			);
	}

	changePassword() {
		const { currentPass, newPass, newPassConfirm } = this.state;
		this.setState({
			passwordError: '',
		});
		if (!currentPass || !newPass || !newPassConfirm) {
			this.setState({
				passwordError: 'Please fill all the fields',
			});
			return;
		}
		if (newPass !== newPassConfirm) {
			//
			this.setState({
				passwordError: 'Password does not match',
			});
			return;
		}
		axios.post(`${apiUrl}/api/auth/change-password`, { newPass, currentPass }).then(
			() => {
				swal.fire({
					title: 'Success',
					html: 'Password changed successfully',
					type: 'success',
					allowOutsideClick: false,
				}).then(() => {
					this.setState({
						newPass: '',
						currentPass: '',
						newPassConfirm: '',
					});
				});
			},
			({ response }) => {
				swal.fire({
					title: 'Error',
					html: response.data.message,
					type: 'error',
					allowOutsideClick: false,
				});
			}
		);
	}

	generateQR() {
		axios.post(`${apiUrl}/api/auth/generate-2fa`).then(
			({ data }) => {
				this.setState({
					qrImg: data.dataURL,
					secretToken: data.tempSecret,
					stage2: true,
				});
			},
			({ response }) => {
				this.setState({
					qrError: response.data.message,
				});
			}
		);
	}

	confirmToken() {
		console.log("confirm");
		this.setState({
			qrError: '',
		});
		if (!this.state.token) {
			this.setState({
				qrError: 'Please enter your token',
			});
		}
		axios.post(`${apiUrl}/api/auth/verify-2fa`, { token: this.state.token }).then(
			({ data }) => {
				jsCookie.set('jwtTokenBTCGrinders', data.token);
				swal.fire({
					title: 'Success',
					html: 'Two factor authentication added successfully',
					type: 'success',
					allowOutsideClick: false,
				}).then(() => {
					Router.reload();
				});
			},
			({ response }) => {
				this.setState({
					qrError: response.data.message,
				});
			}
		);
	}

	disableTfa = (e, email) => {
		e.preventDefault();
		swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Disable 2fa',
		}).then(result => {
			if (result.value) {
				axios.post(`${apiUrl}/api/auth/disable-2fa`, { email: email }).then(
					({ data }) => {
						jsCookie.set('jwtTokenBTCGrinders', data.token);
						swal.fire('Success!', '2fa disabled successfully', 'success').then(() => {
							Router.reload();
						});
					},
					({ response }) => {
						swal.fire('Error', response.data.message, 'error');
					}
				);
			}
		});
	};

	render() {
		var registeration;
		if (jsCookie.get('rsuccess')) {
			registeration = (
				<div className="alert alert-success" style={{ margin: '0px 20px 15px' }}>
					{jsCookie.get('rsuccess')}
				</div>
			);
			setTimeout(() => {
				jsCookie.remove('rsuccess');
			}, 4000);
		}

		const isDisabled = () => {
			return (
				!this.state.amountToConvert ||
				parseInt(this.state.amountToConvert, 10) <= 0 ||
				this.state.conversionRate <= 0
			);
		};
		let { user } = this.props;

		const { conversionRate, amountToConvert, error, cerror, passwordError } = this.state;
		const converted = amountToConvert * conversionRate - (1 / 100) * (amountToConvert * conversionRate);

		return (
			<React.Fragment>
				{this.props.auth.isAuthenticated && (
					<section id="main" className="sec-pad dashboard">
						<div className="container">
							<div className="row">
								<div className="d-flex flex-row mt-2">
									<ul className="nav nav-tabs nav-tabs--vertical nav-tabs--left" role="navigation">
										<li className="nav-item">
											<a
												href="#lorem"
												className="nav-link active"
												data-toggle="tab"
												role="tab"
												aria-controls="lorem"
											>
												CASHIER
											</a>
										</li>
										<li className="nav-item">
											<a
												href="#ipsum"
												className="nav-link"
												data-toggle="tab"
												role="tab"
												aria-controls="ipsum"
											>
												SITES
											</a>
										</li>
										<li className="nav-item">
											<a
												href="#sit-amet"
												className="nav-link"
												data-toggle="tab"
												role="tab"
												aria-controls="sit-amet"
											>
												HISTORY
											</a>
										</li>
										{this.props.user.affiliate ? (
											<li className="nav-item">
												<a
													href="#affiliate"
													className="nav-link"
													data-toggle="tab"
													role="tab"
													aria-controls="affiliate"
												>
													<label data-tip="30-95%">
														AFFILIATE
													 </label>
													<ReactTooltip />
												</a>
											</li>
										) : null}
									</ul>
									<div className="tab-content">
										<div className="tab-pane fade show active" id="lorem" role="tabpanel">
											{registeration}
											<div style={{ padding: '0px 20px' }}>
												{this.props.auth.user.tfa ? (
													<button
														id="submit"
														className="btn btn-primary"
														onClick={(e, email) =>
															this.disableTfa(e, this.props.auth.user.email)
														}
														style={{
															fontSize: '0.8em',
															margin: '0px 10px 15px 0px',
														}}
													>
														Disable 2-factor Authentication
													</button>
												) : (
														<button
															id="submit"
															className="btn btn-primary"
															data-toggle="modal"
															data-target="#tfa"
															style={{
																fontSize: '0.8em',
																margin: '0px 10px 15px 0px',
															}}
														>
															Add 2-factor Authentication
													</button>
													)}
												<button
													id="submit"
													className="btn btn-primary"
													data-toggle="modal"
													data-target="#changePass"
													style={{ fontSize: '0.8em', margin: '0px 0px  15px' }}
												>
													Change Password
												</button>
											</div>
											<div className="flex justify-content-start">
												<div className="flex-first pr-0">
													<div className="settings" />

													<div
														className="balance mb-0"
														style={{
															boxShadow: '0px 2px 5px 2px #e0e0e0',
															borderRadius: '10px',
														}}
													>
														<h5>BALANCES</h5>
														<p>
															USD: ${user.earnings.usd ? user.earnings.usd.toFixed(8) : 0}
														</p>
														<p>
															BTC:&nbsp;
															{user.earnings.btc ? user.earnings.btc.toFixed(8) : 0}
														</p>
														<p>
															ETH:&nbsp;
															{user.earnings.eth ? user.earnings.eth.toFixed(8) : 0}
														</p>
														<p>
															LTC:&nbsp;
															{user.earnings.ltc ? user.earnings.ltc.toFixed(8) : 0}
														</p>
														<p>
															BCH:&nbsp;
															{user.earnings.bch ? user.earnings.bch.toFixed(8) : 0}
														</p>
													</div>
													<div
														className="address"
														style={{
															boxShadow: '0px 2px 5px 2px #e0e0e0',
															borderRadius: '10px',
															marginTop: "20px"
														}}
													>
														<h5>WITHDRAW</h5>
														{cerror && (
															<div className="alert alert-danger error">
																{this.state.cashOutAddress === ''
																	? 'Please enter the correct withdrawal address'
																	: cerror}
															</div>
														)}
														<form onSubmit={this.cashOut}>
															<div className="form-group">
																<label className="small" htmlFor="cashOutCrypto">
																	Cryptocurrency:
																</label>
																<select
																	className="form-control"
																	name="cashOutCrypto"
																	id="cashOutCrypto"
																	value={this.state.cashOutCrypto}
																	onChange={this.onChange}
																>
																	<option value="">SELECT</option>
																	<option value="BTC">BTC (0.005 minimum)</option>
																	<option value="ETH">ETH (0.15 minimum)</option>
																	<option value="BCH">BCH (0.17 minimum)</option>
																	<option value="LTC">LTC (0.50 minimum)</option>
																</select>
															</div>
															<div className="form-group">
																<label className="small" htmlFor="cashOutAmount">
																	Amount
																</label>
																<input
																	type="cashOutAmount"
																	className="form-control"
																	name="cashOutAmount"
																	aria-describedby="cryptoAddress"
																	placeholder="Enter Amount"
																	value={this.state.cashOutAmount}
																	onChange={this.onChange}
																/>
															</div>
															<div className="form-group">
																<label className="small" htmlFor="cashOutAddress">
																	Enter a valid address
																</label>
																<input
																	className="form-control"
																	name="cashOutAddress"
																	aria-describedby="cryptoAddress"
																	placeholder="Enter Address"
																	value={this.state.cashOutAddress}
																	onChange={this.onChange}
																/>
															</div>
															<div className="form-group">
																<button
																	id="withdraw"
																	type="submit"
																	className="cmn-btn newbtnStyle"
																>
																	Withdraw
																</button>
															</div>
														</form>
													</div>
												</div>

												<div className="flex-second">
													<div
														className="convert"
														style={{
															boxShadow: '0px 2px 5px 2px #e0e0e0',
															borderRadius: '10px',
														}}
													>
														<h5>CONVERT USD TO CRYPTOCURRENCY</h5>
														{error && <div className="error">{error}</div>}
														<form onSubmit={this.convert}>
															<div className="form-group">
																<label className="small" htmlFor="amountToConvert">
																	USD amount to convert (min. $15)
																</label>
																<input
																	type="number"
																	className="form-control"
																	name="amountToConvert"
																	value={this.state.amountToConvert}
																	onChange={this.onChange}
																	aria-describedby="amountToConvert"
																	placeholder="Enter Amount"
																	min="15"
																/>
															</div>
															<div className="form-group">
																<label
																	className="small"
																	htmlFor="cryptocurrencyToCovertTo"
																>
																	Select a Cryptocurrency:
																</label>
																<select
																	className="form-control"
																	name="cryptocurrencyToCovertTo"
																	id="cryptocurrencyToCovertTo"
																	onChange={this.onChange}
																	value={this.state.cryptocurrencyToCovertTo}
																>
																	<option value="" disabled>
																		SELECT
																	</option>
																	<option value="BTC">BTC</option>
																	<option value="ETH">ETH</option>
																	<option value="BCH">BCH</option>
																	<option value="LTC">LTC</option>
																</select>
																<div className="realtime">
																	<span>
																		You get: {converted ? converted.toFixed(8) : 0}
																	</span>
																</div>
															</div>
															<div className="form-group">
																<button
																	type="submit"
																	disabled={isDisabled()}
																	className={`cmn-btn ${
																		isDisabled() ? 'disabled' : 'newbtnStyle'
																		}`}
																	id="convertToCrypto"
																>
																	Convert
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>

										{/* <!-- 2nd --> */}
										<div className="tab-pane fade" id="ipsum" role="tabpanel">
											<div
												className="history"
												style={{
													boxShadow: '0px 2px 5px 2px #e0e0e0',
													borderRadius: '10px',
												}}
											>
												<div
													className="row"
													style={{
														borderBottom: '1px solid #dee2e6',
														padding: '5px 0px',
													}}
												>
													<div className="col-sm-3 ">
														<span>
															<font size="4">Your Sites</font>
														</span>
													</div>
													<div className="col-sm-9">
														<span>
															<i className="material-icons" style={{ fontSize: '1em' }}>
																timer
															</i>
														</span>{' '}
														Confirmation pending{' '}
														<i
															className="material-icons"
															style={{ fontSize: '1em', marginLeft: '20px' }}
														>
															check
														</i>{' '}
														Properly Tracked{' '}
														<i
															className="material-icons"
															style={{ fontSize: '1em', marginLeft: '20px' }}
														>
															close
														</i>{' '}
														Not properly tracked
													</div>
												</div>
											
												<div className="history-list" style={{ paddingBottom: '10px' }}>
													<div className="row" style={{ padding: '10px 0px' }}>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'left' }}
														>
															Trading
														</div>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'right' }}
														>
															<a href="/trading" style={{ color: 'rgb(84, 84, 226)' }}>
																<font size="3">Add an Exchange</font>
															</a>
														</div>
													</div>

													<div
														className=" row "
														style={{
															fontSize: '0.9em',
														}}
													>
														<div className="col-lg-2 mod">
															<b>SITE</b>
														</div>
														<div className="col-lg-3 mod">
															<b>USER</b>
														</div>
														<div className="col-lg-1 mod">
															<b>BONUS</b>
														</div>
														<div className="col-lg-2 mod">
															<b>FEE REBATE</b>
														</div>
														<div className="col-lg-2 mod">
															<b>OTHER</b>
														</div>
														<div className="col-lg-2 mod">
															<b> </b>
														</div>
													</div>
													{this.tradings()}
												</div>
												<div className="history-list" style={{ paddingBottom: '10px' }}>
													<div className="row" style={{ padding: '10px 0px' }}>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'left' }}
														>
															Sports
														</div>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'right' }}
														>
															<a href="/sports" style={{ color: 'rgb(84, 84, 226)' }}>
																<font size="3">Add a eSports wager site</font>
															</a>
														</div>
													</div>

													<div
														className=" row "
														style={{
															fontSize: '0.9em',
														}}
													>
														<div className="col-lg-2 mod">
															<b>SITE</b>
														</div>
														<div className="col-lg-3 mod">
															<b>USER</b>
														</div>
														<div className="col-lg-1 mod">
															<b>BONUS</b>
														</div>
														<div className="col-lg-2 mod">
															<b>BETBACK</b>
														</div>
														<div className="col-lg-2 mod">
															<b>LOSSBACK</b>
														</div>
														<div className="col-lg-2 mod">
															<b> </b>
														</div>
													</div>
													{this.sports()}
												</div>

												<div className="history-list" style={{ paddingBottom: '10px' }}>
													<div className="row" style={{ padding: '10px 0px' }}>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'left' }}
														>
															Tools
														</div>
														<div
															className=" col-sm-6 col-md-6 col-lg-6"
															style={{ textAlign: 'right' }}
														>
															<a href="/tools" style={{ color: 'rgb(84, 84, 226)' }}>
																<font size="3">Add a Tool</font>
															</a>
														</div>
													</div>

													<div
														className=" row "
														style={{
															borderTop: '0.2px solid #dee2e6',
															fontSize: '0.9em',
														}}
													>
														<div className="col-lg-2 mod">
															<b>SITE</b>
														</div>
														<div className="col-lg-3 mod">
															<b>USER</b>
														</div>
														<div className="col-lg-1 mod">
															<b>BONUS</b>
														</div>
														<div className="col-lg-2 mod">
															<b>DISCOUNT</b>
														</div>
														<div className="col-lg-2 mod">
															<b>COUPONS</b>
														</div>
														<div className="col-lg-2 mod">
															<b> </b>
														</div>
													</div>
													{this.tools()}
												</div>
											</div>
										</div>
										<style>{`
                          div.mod{
                           border-bottom:0.2px solid  #dee2e6;
                           border-left:0.2px solid  #dee2e6;
                            padding:15px 10px
                          }
                          .row{margin:0px}
                          `}</style>
										{/* <!-- 3rd --> */}
										<div className="tab-pane fade" id="sit-amet" role="tabpanel">
											<div
												className="history"
												style={{
													boxShadow: '0px 2px 5px 2px #e0e0e0',
													borderRadius: '10px',
												}}
											>
												<h5>HISTORY</h5>
												<Tabs>
													<TabList>
														<Tab>Credits</Tab>
														<Tab>Conversions</Tab>
														<Tab>Withdrawals</Tab>
														<Tab>Commissions</Tab>
													</TabList>

													<TabPanel>
														<ReactTable
															data={user.histories.filter(
																item =>
																	item.type === 'credit' ||
																	item.type === 'credit reverse'
															)}
															columns={[
																{
																	Header: '#',
																	accessor: 'id',
																	Cell: row => <span>{row.index + 1}</span>,
																	width: 75,
																	className: 'text-center'
																},
																{
																	Header: 'DATE',
																	accessor: 'date',
																	Cell: row => (
																		<span>
																			{moment(row.value)
																				.utcOffset('+0100')
																				.format('lll')}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'AMOUNT',
																	accessor: 'amount',
																	Cell: row => <span>{row.original.amount} {row.original.amountType}</span>,
																	className: 'text-center'
																},
																{
																	Header: 'SITE',
																	accessor: 'site',
																	Cell: row => (
																		<span>
																			{row.original.site
																				? `(${row.original.site})`
																				: null}{' '}
																			<a
																				style={{ textDecoration: 'underline' }}
																				href={`/${row.original.site_type}`}
																			>
																				{row.original.site_type}
																			</a>
																		</span>
																	),
																	className: 'text-center'
																},
															]}
															defaultPageSize={10}
															className="-striped -highlight"
														/>

														{/* <div className="history-list">
															<table className="table table-bordered">
																<thead>
																	<tr>
																		<th>#</th>
																		<th>DATE</th>
																		<th>SITE</th>
																		<th>TYPE</th>
																		<th>AMOUNT</th>
																	</tr>
																</thead>
																<tbody>{this.histories('credits')}</tbody>
															</table>
														</div> */}
													</TabPanel>
													<TabPanel>
														{/* <div className="history-list">
															<table className="table table-bordered">
																<thead>
																	<tr>
																		<th>#</th>
																		<th>TYPE</th>
																	</tr>
																</thead>
																<tbody>{this.histories('conversions')}</tbody>
															</table>
														</div> */}
														<ReactTable
															data={user.histories.filter(
																item => item.type === 'conversion'
															)}
															columns={[
																{
																	Header: '#',
																	accessor: 'id',
																	Cell: row => <span>{row.index + 1}</span>,
																	width: 75,
																	className: 'text-center'
																},
																{
																	Header: 'Date',
																	accessor: 'date',
																	Cell: row => (
																		<span>
																			{moment(row.value)

																				.format('lll')}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'USD',
																	accessor: 'type',
																	Cell: row => <span>{row.original.amount}</span>,
																	className: 'text-center'
																},
																{
																	Header: 'Crypto',
																	accessor: 'type',
																	Cell: row => (
																		<span>
																			{`${
																				row.original.value
																				} ${row.original.amountType.toUpperCase()}`}
																		</span>
																	),
																	className: 'text-center'
																},
															]}
															defaultPageSize={10}
															className="-striped -highlight"
														/>
													</TabPanel>
													<TabPanel>
														{/* <div className="history-list">
																<table className="table table-bordered">
																	<thead>
																		<tr>
																			<th>#</th>
																			<th>AMOUNT</th>
																		</tr>
																	</thead>
																	<tbody>{this.histories('withdrawals')}</tbody>
																</table>
															</div>
														*/}
														<ReactTable
															data={user.histories.filter(item => item.type === 'payout')}
															columns={[
																{
																	Header: '#',
																	accessor: 'id',
																	Cell: row => <span>{row.index + 1}</span>,
																	width: 75,
																	className: 'text-center'
																},
																{
																	Header: 'Date',
																	accessor: 'date',
																	Cell: row => (
																		<span>
																			{moment(row.value)

																				.format('lll')}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'AMOUNT',
																	accessor: 'amount',
																	Cell: row => (
																		<span>{`${row.original.amount} ${
																			row.original.amountType
																			}`}</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'Status',
																	accessor: 'status',
																	Cell: row => (
																		<span>
																			{row.value ? row.value : "confirmed"}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'Address',
																	accessor: 'address',
																	className: 'text-center'
																},

															]}
															defaultPageSize={10}
															className="-striped -highlight"
														/>
													</TabPanel>

													<TabPanel>

														<ReactTable
															data={user.affiliate ? user.affiliate.commission.reverse() : []}
															columns={[
																{
																	Header: '#',
																	accessor: 'id',
																	Cell: row => <span>{row.index + 1}</span>,
																	width: 75,
																	className: 'text-center'

																}, {
																	Header: 'User',
																	accessor: 'email',
																	Cell: row => (
																		<span>
																			{this.substr(row.value, 0, 2)}...
																		{this.substr(row.value, -10, 3)}...
																		{row.value.substr(-3)}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'Amount',
																	accessor: 'amount',
																	Cell: row => (
																		<span>
																			{row.value}
																		</span>
																	),
																	className: 'text-center'
																},
																{
																	Header: 'Type',
																	accessor: 'type',
																	Cell: row => (
																		<span>
																			{row.value}
																		</span>
																	),
																	className: 'text-center'
																},

															]}
															defaultPageSize={10}
															className="-striped -highlight"
														/>
													</TabPanel>
												</Tabs>
												{/* <div className="history-list">
													<table className="table table-bordered">
														<thead>
															<tr>
																<th>#</th>
																<th>DATE</th>
																<th>REFERENCE</th>
																<th>SITE</th>
																<th>DESTINATION</th>
																<th>TYPE</th>
																<th>AMOUNT</th>
																<th>VALUE</th>
															</tr>
														</thead>
														<tbody>{this.histories()}</tbody>
													</table>
												</div> */}
											</div>
										</div>
										{/* <!-- 4rd --> */}
										{this.props.user.affiliate ? (
											<div className="tab-pane fade" id="affiliate" role="tabpanel">
												<div className="row">
													<div className="col-sm-12" style={{ padding: '20px' }}>
														<p style={{ paddingBottom: '10px' }}>
															Contact admin@coinrewards.org to get up to 95% of your referrals revenue and payments.
														</p>
														<p
															style={{
																width: 'max-content'
															}}
														>
															{/* <span style={{ backgroundColor: 'ivory', padding: '5px' }}>Referral Link:</span> */}
															<span
																style={{
																	backgroundColor: '#FFF',
																	padding: '5px',
																	border: '1px solid #dee2e6',
																	borderRadius: '10px',
																	WebkitUserSelect: 'all',
																	MozUserSelect: 'all',
																	msUserSelect: 'all',
																	userSelect: 'all',
																	cursor: 'pointer',
																}}
															>
																{this.props.user.affiliate.link
																	.replace(/register\?referral/g, '?ref')
																	.replace('www.', 'https://')}
															</span>
														</p>
														<InlineSocial url={
															this.props.user.affiliate.link
																.replace(/register\?referral/g, '?ref')
																.replace('www.', 'https://')
														} />
													</div>
													<div className="col-md-6">
														<div
															className="history"
															style={{
																boxShadow: '0px 2px 5px 2px #e0e0e0',
																borderRadius: '10px',
															}}
														>
															<h5>Referrals</h5>
															<div className="history-list">
																<table className="table table-bordered">
																	<thead>
																		<tr>
																			<th>#</th>
																			<th>DATE</th>
																			{/* <th>REFERENCE</th> */}
																			{/* <th>SITE</th> */}
																			<th>USER</th>
																			{/* <th>TYPE</th> */}
																			{/* <th>AMOUNT EARN</th> */}
																			{/* <th>VALUE</th> */}
																		</tr>
																	</thead>
																	<tbody>{this.affiliate()}</tbody>
																</table>
															</div>
														</div>
													</div>

												</div>
											</div>
										) : null}
									</div>
								</div>
							</div>
						</div>
						{/* Change password Modal */}
						<div
							className="modal fade"
							id="changePass"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											Change Password
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										{passwordError && <span className="error">{passwordError}</span>}
										<div className="form-group">
											<label className="small" htmlFor="currentPass">
												Current Password
											</label>
											<input
												// type="cashOutAddress"
												type="password"
												className="form-control"
												name="currentPass"
												aria-describedby="cryptoAddress"
												placeholder="Enter Old password"
												value={this.state.currentPass}
												onChange={this.onChange}
											/>
										</div>
										<div className="form-group">
											<label className="small" htmlFor="newPass">
												New Password
											</label>
											<input
												type="password"
												// type="cashOutAddress"
												className="form-control"
												name="newPass"
												aria-describedby="cryptoAddress"
												placeholder="Enter New Password"
												value={this.state.newPass}
												onChange={this.onChange}
											/>
										</div>
										<div className="form-group">
											<label className="small" htmlFor="newPassConfirm">
												Repeat New Password
											</label>
											<input
												type="password"
												// type="cashOutAddress"
												className="form-control"
												name="newPassConfirm"
												aria-describedby="cryptoAddress"
												placeholder="Confirm password"
												value={this.state.newPassConfirm}
												onChange={this.onChange}
											/>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-primary" onClick={this.changePassword}>
											Save changes
										</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* 2fa Modal es */}
						<div
							className="modal fade"
							id="tfa"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											Add Two-Factor authentication
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										{this.state.qrError && <span className="error">{this.state.qrError}</span>}
										<div className="form-group">
											<button className="btn btn-primary" onClick={this.generateQR}>
												Generate your Google 2FA code
											</button>
										</div>

										{this.state.stage2 && (
											<div>
												<p>
													Please enter this code <strong>{this.state.secretToken}</strong> on
													google authenticator and input the generated token below
												</p>
												<p>-- OR --</p>
												<p>
													Scan this QR image using google authenticator and input the
													generated token below.
												</p>
												<div>
													<img src={this.state.qrImg} alt="QR image" />
												</div>
												<div className="form-group">
													<label className="small" htmlFor="newPass">
														Token
													</label>
													<input
														type="text"
														className="form-control"
														name="token"
														aria-describedby="token"
														placeholder="Enter Token"
														value={this.state.token}
														onChange={this.onChange}
													/>
												</div>
											</div>
										)}
									</div>
									<div className="modal-footer">
										{this.state.stage2 && (
											<button
												type="button"
												id="tfaEnablebtn"
												className="btn btn-primary"
												onClick={this.confirmToken}
											>
												Enable 2fa
											</button>
										)}
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user,
});

export default connect(
	mapStateToProps,
	{
		getSingleUser,
	}
)(withRouter(Dashboard));