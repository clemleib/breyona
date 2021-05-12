import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

class ReactDataTable extends Component {
  state = {};

  render() {
    const { data } = this.props;

    const columns = [
      {
        Header: 'Date',
        accessor: 'date', // String-based value accessors!
        Cell: props => <span className="number">{moment(props.value).format('YYYY-MM-DD')}</span>,
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'User',
        accessor: 'email',
      },
      {
        Header: 'Site',
        accessor: 'site',
      },
      {
        Header: 'Amount Type',
        accessor: 'amountType',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
    ];

    return <ReactTable data={data} columns={columns} className="-striped -highlight" defaultPageSize={50} />;
  }
}

export default ReactDataTable;
