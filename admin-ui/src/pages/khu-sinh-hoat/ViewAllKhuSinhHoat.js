import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import { CSVLink } from 'react-csv';
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
const ViewAllKhuSinhHoat = () => {
  const [form] = Form.useForm();
  const [KhuSinhHoat, SetKhuSinhHoat] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      TenKhu: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const headers = [
    { label: 'id khu sinh hoạt', key: 'id' },
    { label: 'Tên khu', key: 'TenKhu' }
  ];

  const deleteRecord = async (record) => {
    console.log('deleted: ', record);
    console.log(record.id);
    SetKhuSinhHoat((pre) => {
      return pre.filter((khusinhhoat) => khusinhhoat.id !== record.id);
    });

    const req = await axios
      .delete(`${host.BASE_URL}/${host.API.BASE_END_POINT}khusinhhoat/${record.id}`, {
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
      const row = await form.validateFields();
      const newData = [...KhuSinhHoat];
      const index = newData.findIndex((item) => key === item.id);

      const req = await axios
        .put(`${host.BASE_URL}/${host.API.BASE_END_POINT}/khusinhhoat/${key}`, row, {
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
        SetKhuSinhHoat(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetKhuSinhHoat(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      editable: false
    },
    {
      key: 'TenKhu',
      title: 'Tên Khu',
      dataIndex: 'TenKhu',
      editable: true
    },
    {
      key: 'operation',
      title: 'operation',
      dataIndex: 'operation',
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

  const GetAllKhuSinhHoat = async () => {
    try {
      const res = await axios
        .get(`${host.BASE_URL}/${host.API.BASE_END_POINT}/khusinhhoat`, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((res) => {
          SetKhuSinhHoat(res.data.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllKhuSinhHoat();
  }, []);
  const { Title } = Typography;
  const navigate = useNavigate();

  const handleOnClick = async (event) => {
    event.preventDefault();
    navigate('/addkhusinhhoat');
  };
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
      <Title style={{ color: '#00A9FF' }}>Khu Sinh Hoạt </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Button onClick={handleOnClick}>Thêm Khu Sinh Hoạt</Button>

      <Divider />

      <CSVLink data={KhuSinhHoat} filename={'TTN2-KhuSinhHoat.csv'} className="btn btn-primary" headers={headers}>
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
          dataSource={KhuSinhHoat}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
    </div>
  );
};
export default ViewAllKhuSinhHoat;
