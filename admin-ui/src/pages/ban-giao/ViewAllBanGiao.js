import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form, Space } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import BanGiaoColumns from './BanGiaoColumns';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {CSVLink} from "react-csv";

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ViewAllBanGiao = () => {
  const [searchText, SetSearchText] = useState('');
  const [searchedColumn, SetSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [BanGiao, SetBanGiao] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const handleSearch = (selectedKey, confirm, dataIndex) => {
    confirm();
    SetSearchText(selectedKey[0]);
    SetSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    SetSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              SetSearchText(selectedKeys[0]);
              SetSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      cccd: null,
      SoVanBanBanGiao: '',
      NgayRaVanBan: '',
      NgayBanGiao: '',
      LyDoBanGiao: '',
      CanBoBenNhan: '',
      CoQuanNhan: '',
      ThongTinLienLacBenNhan: '',
      CanBoGiaiQuyet: '',
      LanhDaoChucVu: '',
      id_dot_cntn: '',
      id_dot_cnbb: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const deleteRecord = async (record) => {
    SetBanGiao((pre) => {
      return pre.filter((bangiao) => bangiao.id !== record.id);
    });

    const req = await axios.delete(`${host.local}/ttn2/v1/bangiao/${record.id}`).then((result) => {
      console.log(result);
    });
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.getFieldValue();
      const newData = [...BanGiao];
      const index = newData.findIndex((item) => key === item.id);

      console.log('this is row: ', row);

      const req = await axios.put(`${host.local}/ttn2/v1/bangiao/${key}`, row).then((result) => {
        console.log(result);
      });

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        SetBanGiao(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetBanGiao(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const BanGiaoColumnWithSearchProp = BanGiaoColumns.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.key)
  }));

  const columns = [
    ...BanGiaoColumnWithSearchProp,
    {
      key: 'operation',
      title: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record)}>
              <a style={{ marginLeft: 8 }} disabled={editingKey !== ''}>
                Delete
              </a>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  const GetAllBanGiao = async () => {
    try {
      const res = await axios.get(`${host.local}/ttn2/v1/bangiao`).then((res) => {
        SetBanGiao(res.data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllBanGiao();
  }, []);
  const { Title } = Typography;

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <div>
      <Title style={{ color: '#00A9FF' }}>Bàn giao học viên</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Divider />

      <CSVLink data={BanGiao} filename={'TTN2-BanGiao.csv'} className="btn btn-primary" >
        Export to Excel file
      </CSVLink>


      <Form form={form} component={false}>
        <Table
          rowKey="id"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={BanGiao}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
          bordered
          tableLayout="auto"
          scroll={{ x: 'max-content' }}
        />
      </Form>
   </div>
  );
};
export default ViewAllBanGiao;
