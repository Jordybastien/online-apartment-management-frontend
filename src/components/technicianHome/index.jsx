import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Tag, Modal, message, Popconfirm, Button } from 'antd';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  handleChangeRequest,
  handleDeleteRequest,
} from '../../actions/requests';
import TextArea from '../textArea';
import TextBox from '../textBox';

class TechnicianHome extends Component {
  state = {
    loading: false,
    status: '',
    selectedRequest: null,
    modal1Visible: false,
    technicianNote: '',
    seriaNo: '',
    modelNumber: '',
    requests: this.props.requests,
    tab: 'all',
    deleteId: '',
  };

  handleRequest = (selectedRequest) => {
    this.setState({ selectedRequest });
    if (selectedRequest.status === 'pending') {
      this.switchToProcessing(selectedRequest, 'processing');
    } else {
      this.switchToCompleted(selectedRequest, 'completed');
    }
  };

  switchToProcessing = (selectedRequest, status) => {
    this.setState({ loading: true });
    this.props
      .dispatch(handleChangeRequest(selectedRequest.id, { status }))
      .then((res) => {
        this.setState({ loading: false, requests: this.props.requests });

        if (res.type !== 'LOG_ERROR') {
          message.success('Request started successfully');
        } else message.error('Request not found');
      });
  };

  switchToCompleted = () => {
    this.setState({ modal1Visible: true });
  };

  handleFinishRequest = () => {
    this.setState({ loading: true });
    const {
      selectedRequest,
      technicianNote,
      seriaNo,
      modelNumber,
    } = this.state;

    this.props
      .dispatch(
        handleChangeRequest(selectedRequest.id, {
          status: 'completed',
          technicianNote,
          seriaNo,
          modelNumber,
        })
      )
      .then((res) => {
        this.setState({
          loading: false,
          modal1Visible: false,
          requests: this.props.requests,
        });

        if (res.type !== 'LOG_ERROR') {
          message.success('Request finished successfully');
        } else message.error('Failed to make changes to request');
      });
  };

  handleNote = (e) => this.setState({ technicianNote: e.target.value });

  handleSerial = (e) => this.setState({ seriaNo: e.target.value });

  handleModel = (e) => this.setState({ modelNumber: e.target.value });

  handleTab = (tab) => {
    let newRequests;
    if (tab === 'all') {
      newRequests = this.props.requests;
    } else {
      newRequests = this.props.requests
        .filter((request) => request.status === tab)
        .sort((a, b) => b.id - a.id);
    }
    this.setState({
      tab,
      requests: newRequests,
    });
  };

  handleDeleteRequest(request) {
    this.setState({ loading: true, deleteId: request.id });

    this.props.dispatch(handleDeleteRequest(request.id)).then((res) => {
      this.setState({ loading: false });

      if (res.type !== 'LOG_ERROR') {
        message.success('Request deleted successfully');
        window.location.href = '/dashboard';
      } else message.error(res.error);
    });
  }

  render() {
    // const {} = this.props;
    const {
      loading,
      selectedRequest,
      technicianNote,
      seriaNo,
      modelNumber,
      requests,
      tab,
      deleteId,
    } = this.state;

    return (
      <Fragment>
        <Modal
          title="Add details"
          centered
          visible={this.state.modal1Visible}
          footer={null}
          onCancel={() =>
            this.setState({ modal1Visible: false, loading: false })
          }
        >
          <TextArea
            type="text"
            placeholder="Short note"
            value={technicianNote}
            name="email"
            onChange={this.handleNote}
          />
          <TextBox
            type="text"
            placeholder="Serial number(optional)"
            value={seriaNo}
            name="email"
            onChange={this.handleSerial}
          />
          <TextBox
            type="text"
            placeholder="Modal number(optional)"
            value={modelNumber}
            name="email"
            onChange={this.handleModel}
          />
          <button
            className="btn btn-primary btn-block custom-btn"
            onClick={this.handleFinishRequest}
            disabled={technicianNote === ''}
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                size="2x"
                color="#fff"
                className="ml-2"
              />
            ) : (
              'Finish'
            )}
          </button>
        </Modal>
        <div className="client-container">
          <div className="section-header">
            <div>
              <span className="header-title">
                {' '}
                {requests && requests.length !== 0
                  ? 'Requests'
                  : 'Nothing to show here'}
              </span>
            </div>
          </div>
          <div className="pre-header">
            <div className="employee-header-row">
              <div className="employee-tabs">
                <div
                  className={`employee-tab ${tab === 'all' && 'selected-tab'}`}
                  onClick={() => this.handleTab('all')}
                >
                  <span>All</span>
                </div>
                <div
                  className={`employee-tab ${
                    tab === 'pending' && 'selected-tab'
                  }`}
                  onClick={() => this.handleTab('pending')}
                >
                  <span>Pending</span>
                </div>
                <div
                  className={`employee-tab ${
                    tab === 'processing' && 'selected-tab'
                  }`}
                  onClick={() => this.handleTab('processing')}
                >
                  <span>Processing</span>
                </div>
                <div
                  className={`employee-tab ${
                    tab === 'completed' && 'selected-tab'
                  }`}
                  onClick={() => this.handleTab('completed')}
                >
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="section-body">
            {requests &&
              requests.length !== 0 &&
              requests.map((request, index) => (
                <div
                  className="user-request-card tech-card"
                  key={index}
                  onClick={() =>
                    this.setState({
                      selectedRecord: request,
                    })
                  }
                >
                  <div className="card-heading">
                    <span className="font-weight-bold pl-3">
                      Requester: {request.clientNames}
                    </span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Description:</span>
                    <span className="data-holder-value">
                      {request.description}
                    </span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Apartment:</span>
                    <span className="data-holder-value">
                      {request.clientAddress.split(',')[0]}
                    </span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Address:</span>
                    <span className="data-holder-value">
                      {request.clientAddress.split(',')[1]}
                    </span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Serial No:</span>
                    <span className="data-holder-value">
                      {request.serialNo}
                    </span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Model No:</span>
                    <span className="data-holder-value">{request.modelNo}</span>
                  </div>
                  <div className="request-description">
                    <span className="data-holder-label">Technician Note:</span>
                    <span className="data-holder-value">
                      {request.technicianNote}
                    </span>
                  </div>
                  <div className="request-footer">
                    <div className="request-time">
                      <span className="time-holder-label">
                        {request.status !== 'processing' ? 'Sent' : 'Started'}
                      </span>
                      <span className="time-holder-value">
                        {request.status !== 'processing'
                          ? moment(request.createdAt).fromNow()
                          : moment(request.updatedAt).fromNow()}
                      </span>
                    </div>
                    <div className="tag-holder">
                      {
                        <Tag
                          color={
                            request.status !== 'processing' ? 'gold' : 'blue'
                          }
                        >
                          {request.status.toUpperCase()}
                        </Tag>
                      }
                    </div>
                  </div>
                  {request && request.status !== 'completed' && (
                    <div className="action-button-holder">
                      <button
                        className={`btn btn-primary btn-block custom-btn ${
                          request.status === 'processing' && 'finish-btn'
                        }`}
                        onClick={() => this.handleRequest(request)}
                      >
                        {loading &&
                        selectedRequest &&
                        selectedRequest.id === request.id ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            size="2x"
                            color="#fff"
                            className="ml-2"
                          />
                        ) : request.status !== 'processing' ? (
                          'Start'
                        ) : (
                          'Finish'
                        )}
                      </button>
                      <div>
                        <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={() => this.handleDeleteRequest(request)}
                          okText="Yes"
                          cancelText="No"
                          className="delete-confirm"
                        >
                          <Button
                            type="primary"
                            danger
                            className="custom-delete"
                          >
                            {loading && deleteId === request.id ? (
                              <FontAwesomeIcon
                                icon={faSpinner}
                                size="1x"
                                color="#fff"
                                className="ml-2"
                              />
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser, requests }) => {
  return {
    authedUser,
    requests: requests && Object.values(requests).sort((a, b) => b.id - a.id),
  };
};

export default connect(mapStateToProps)(TechnicianHome);
