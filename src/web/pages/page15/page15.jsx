import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj, {
  expression as n
} from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import { Row, Col, Table, Input, Button, Pagination, Tabs, Checkbox, Modal, Tree, Message } from 'antd';
import Notification from '../../../utils/notification';
import ModalFormPage from './modalFormPage';
import ModalDetailPage from './modalDetailPage';

//页面容器组件
@registerTmpl('Page15')
@inject('store')
@observer
export default class Page15 extends Component {
  @observable detailModalVisible = false;
  @observable inputRole = '';
  @observable detailData = [];
  @observable selectedRowKeys = [];
  @observable selectedRows = [];

  componentDidMount() {
    const { store: { page15 } } = this.props;

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      page15.getRoleManagementData(),
      page15.getRoleMenuTree().then(() => page15.initTree())
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onSearch() {
    if (this.inputRole == '') {
      const closeLoading = Message.loading('正在获取数据...', 0);
      Promise.all([
        this.props.store.page15.getRoleManagementData(),
      ]).then(() => {
        closeLoading();
      });
    } else {
      const { store: { page15 } } = this.props;
      const searchRole = page15.tableDataO.filter(n => n.name.indexOf(this.inputRole.trim()) > -1);
      page15.setTableData(searchRole);
    }
  }

  @autobind
  onAddRole() {
    const { store: { page15 } } = this.props;
    page15.setAddModalVisible(true);
    page15.setDisable(true);
    page15.setActiveKey('tab1');
    page15.setAddInputRole('');
    page15.setAddInputDes('');
  }

  @autobind
  onDeleteRole() {
    const { store: { page15 } } = this.props;
    if (this.selectedRowKeys.length == 0) {
      Notification.error({ description: '请勾选要删除的角色！', duration: 3 });
    } else {
      Modal.confirm({
        title: '你确认要删除角色吗？',
        onOk: () => {
          const closeLoading = Message.loading('正在获取数据...', 0);
          const roleId = this.selectedRows.map((item) => item.roleId);

          Promise.all([
            page15.deleteRole({ roleId: roleId })
          ]).then(() => {
            page15.getRoleManagementData();
          }).then(() => {
            this.selectedRowKeys = [];
            closeLoading();
          });
        }
      });
    }
  }

  @computed get tableColumns() {
    return [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '角色描述',
      dataIndex: 'describe',
    }, {
      title: '创建时间',
      dataIndex: 'cTime',
    }, {
      title: '修改时间',
      dataIndex: 'mTime',
    }, {
      title: '操作',
      dataIndex: 'handler',
      render: (text, record, index) => (
        <span>
          <a href="javascript:;" onClick={() => this.onEdit(record, index)} className="btn-link">编辑</a>
          <a href="javascript:;" onClick={() => this.onDetail(record, index)} className="btn-link">用户明细</a>
        </span>
      ),
    }];
  }

  @autobind
  onEdit(record, index) {
    const { store: { page15 } } = this.props;
    page15.setEditModalVisible(true);
    page15.setSaveBtnDisabled(true);
    page15.setActiveKey('tab1');
    page15.setAddInputRole(record.name);
    page15.setAddInputDes(record.describe);
    page15.setRoleId(record.roleId);
    page15.setDisable(false);

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      page15.getRoleMenuTree({ roleId: record.roleId }).then(() => page15.initTree()),
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onDetail(record, index) {
    const { store: { page15 } } = this.props;
    page15.setDetailModalVisible(true);
    page15.setDetailData(record.users);
  }

  getRowSelection() {
    return {
      selectedRowKeys: this.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      }
    };
  }

  render() {
    const { store: { page15 } } = this.props;

    return (
      <div className="page15">
        <style jsx>{`
          .page15 {
            background-color: #fff;
            padding: 100px 40px 40px;

            h2 {
              margin-bottom: 25px;
              font-size: 16px;
            }

            .handlerBox {
              margin-bottom: 20px;
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
            }

            .handlerBox:after {
              content: '';
              display: table;
              clear: both;
            }

            .lable {
              float: left;
              margin-right: 10px;
              line-height: 28px;
            }
          }

          .checks {
            border-top: 1px solid #eaeaea;
            margin-top: 15px;
            padding: 15px 0;
            text-align: center;
          }

          .hide {
            display: none;
          }
        `}</style>
        <style jsx global>{`
          .page15 {
            .input {
              width: 200px;
              margin-right: 20px;
              border-color: #d9d9d9;
            }

            .ant-table-thead tr th {
              text-align: center;
            }

            .ant-table-tbody tr td {
              text-align: center;
              padding: 10px 5px;

              .btn-link {
                margin: 0 5px;
              }
            }

            .frombox {
              padding: 20px;

              li {
                margin-bottom: 10px;
                display: block;
              }

              .textarea {
                width: 100%;
                border: 1px solid #d9d9d9;
              }

              .red:before {
                content: '*';
                color: red;
                font-size: 14px;
                position: absolute;
                margin: 3px;
              }
            }

            .btn {
              margin-right: 20px;
            }
          }
        `}</style>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <h2>角色管理 page15</h2>
        <div className="handlerBox">
          <span className="lable">角色名称</span>
          <Input className="input" n-mobx-bind="inputRole" />
          <Button className="btn" onClick={this.onSearch}>查询</Button>
          <Button className="btn" onClick={this.onAddRole}>新增</Button>
          <Button className="btn" onClick={this.onDeleteRole}>删除</Button>
          <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row className="buttons">
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
              <Col span={3}>
                <i className="hide">hide</i>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>

        <Table rowSelection={this.getRowSelection()}
          columns={toJS(this.tableColumns)}
          dataSource={toJS(page15.tableData)}
          bordered />

        <ModalFormPage tabName="增加角色" />
        <ModalFormPage tabName="编辑角色" />
        <ModalDetailPage />
      </div>
    );
  }
}