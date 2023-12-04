import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form, Space } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import HocVienKhuSinhHoatCoulumns from './HocVienKhuSinhHoatColumns';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

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
const ViewHocVienKhuSinhHoat = () => {
  const [searchText, SetSearchText] = useState('');
  const [searchedColumn, SetSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [HocVien_KhuSinhHoat, SetHocVien_KhuSinhHoat] = useState([]);
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
      id_khu_sh: '',
      cccd: '',
      NgayBatDauO: '',
      NgayChuyenKhu: '',
      TrangThai: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const deleteRecord = async (record) => {
    SetHocVien_KhuSinhHoat((pre) => {
      return pre.filter((hocvienkhusinhhoat) => hocvienkhusinhhoat.id !== record.id);
    });

    const req = await axios.delete(`${host.local}/ttn2/v1/hocvien_khusinhhoat/${record.id}`).then((result) => {
      console.log(result);
    });
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.getFieldValue();
      const newData = [...HocVien_KhuSinhHoat];
      const index = newData.findIndex((item) => key === item.id);

      console.log('this is row: ', row);

      const req = await axios.put(`${host.local}/ttn2/v1/hocvien_khusinhhoat/${key}`, row).then((result) => {
        console.log(result);
      });

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        SetHocVien_KhuSinhHoat(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetHocVien_KhuSinhHoat(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const HocVienKhuSinhHoatColumnWithSearchProp = HocVienKhuSinhHoatCoulumns.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.key)
  }));

  const columns = [
    ...HocVienKhuSinhHoatColumnWithSearchProp,
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

  const GetAllHocVienKhuSinhHoat = async () => {
    try {
      const res = await axios.get(`${host.local}/ttn2/v1/hocvien_khusinhhoat`).then((res) => {
        SetHocVien_KhuSinhHoat(res.data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllHocVienKhuSinhHoat();
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
      <Title style={{ color: '#00A9FF' }}>Học viên - Khu sinh hoạt</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Divider />

      <Form form={form} component={false}>
        <Table
          rowKey="id"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={HocVien_KhuSinhHoat}
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
export default ViewHocVienKhuSinhHoat;
