import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import {
  Table,
  Input,
  Button,
  Pagination,
  Tabs,
  Checkbox,
  Modal,
  Tree,
  Message
} from 'antd';
import Notification from '../../../utils/notification';

@inject('store')
@observer
export default class ModalDetailPage extends Component {
  @autobind
  onDetailModalCancel() {
    const { store: { page18 } } = this.props;
    page18.setDetailModalVisible(false);
  }

  @computed get detailColumns() {
    return [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '登录名',
      dataIndex: 'loginName',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      title: '部门',
      dataIndex: 'department',
    }, {
      title: '职务',
      dataIndex: 'duty',
    }, {
      title: '开通时间',
      dataIndex: 'oTime',
    }];
  }

  render() {
    const { store: { page18 } } = this.props;

    return (
      <Modal width={800} visible={page18.detailModalVisible} footer={null} onCancel={this.onDetailModalCancel} title={<div>用户明细</div>}>
        <Table pagination={true} columns={toJS(this.detailColumns)} dataSource={toJS(page18.detailData)} rowKey={(record, index) => `${record.key}-${index}`} bordered />
      </Modal>
    );
  }
}