import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form, Space } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import ThamGapColumns from './ThamGapColumns';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import Global from '../../constant/Global';

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
const ViewAllLichSuThamGap = () => {
  const [searchText, SetSearchText] = useState('');
  const [searchedColumn, SetSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [ThamGap, SetThamGap] = useState([]);
  const [FilteredThamGap, SetFilteredThamGap] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const navigate = useNavigate();

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

  const handleOnClick = async (event) => {
    event.preventDefault();
    navigate('/addthamgap');
  };

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      cccdHocVien: '',
      idNguoiThan: '',
      NgayThamGap: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const deleteRecord = async (record) => {
    SetThamGap((pre) => {
      return pre.filter((thamgap) => thamgap.id !== record.id);
    });

    const req = await axios
      .delete(`${host.BASE_URL}/${host.API.BASE_END_POINT}/thamgap/${record.id}`, {
        headers: {
          access_token: localStorage.getItem(Global.key.token)
        }
      })
      .then((result) => {
        console.log(result);
      });
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.getFieldValue();
      const newData = [...ThamGap];
      const index = newData.findIndex((item) => key === item.id);

      console.log('this is row: ', row);

      const req = await axios
        .put(`${host.BASE_URL}/${host.API.BASE_END_POINT}/thamgap/${key}`, row, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((result) => {
          console.log(result);
        });

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        SetThamGap(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetThamGap(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const ThamGapColumnWithSearchProp = ThamGapColumns.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.key)
  }));

  const columns = [
    ...ThamGapColumnWithSearchProp
    // {
    //   key: 'operation',
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   fixed: 'right',
    //   width: 200,
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.id)}
    //           style={{
    //             marginRight: 8
    //           }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <span>
    //         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
    //           Edit
    //         </Typography.Link>
    //         {/*<Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record)}>*/}
    //         {/*  <a style={{ marginLeft: 8 }} disabled={editingKey !== ''}>*/}
    //         {/*    Delete*/}
    //         {/*  </a>*/}
    //         {/*</Popconfirm>*/}
    //       </span>
    //     );
    //   }
    // }
  ];

  const GetAllThamGap = async () => {
    try {
      const res = await axios
        .get(`${host.BASE_URL}/${host.API.BASE_END_POINT}/thamgap`, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((res) => {
          SetThamGap(res.data.data.data);
          SetFilteredThamGap(res.data.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllThamGap();
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
      <Title style={{ color: '#00A9FF' }}>Lịch sử thăm gặp</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Button onClick={handleOnClick}>Đăng ký thăm gặp cho học viên</Button>

      <Divider />

      <CSVLink data={FilteredThamGap} filename={'TTN2-ThamGap.csv'} className="btn btn-primary">
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
          dataSource={ThamGap}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
          onChange={(pagination, filters, sorter, extra) => {
            SetFilteredThamGap(extra.currentDataSource);
          }}
          bordered
          tableLayout="auto"
          scroll={{ x: 'max-content' }}
        />
      </Form>
    </div>
  );
};
export default ViewAllLichSuThamGap;
