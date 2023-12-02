import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import StudentColumn from './StudentColumn';

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
const ViewAllStudent = () => {
  console.log(StudentColumn);
  const [form] = Form.useForm();
  const [KhuSinhHoat, SetKhuSinhHoat] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.cccd === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      cccd: '',
      TenKhu: '',
      ...record
    });
    setEditingKey(record.cccd);
  };

  const deleteRecord = async (record) => {
    console.log('deleted: ', record);
    console.log(record.cccd);
    SetKhuSinhHoat((pre) => {
      return pre.filter((khusinhhoat) => khusinhhoat.cccd !== record.cccd);
    });

    const req = await axios.delete(`${host.local}/ttn2/v1/khusinhhoat/${record.cccd}`).then((result) => {
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
      const index = newData.findIndex((item) => key === item.cccd);

      const req = await axios.put(`${host.local}/ttn2/v1/khusinhhoat/${key}`, row).then((result) => {
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
    ...StudentColumn,
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
              onClick={() => save(record.cccd)}
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
      const res = await axios.get(`${host.local}/ttn2/v1/hocvien`).then((res) => {
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
    navigate('/addStudent');
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
      <Title style={{ color: '#00A9FF' }}>Học Viên</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Button onClick={handleOnClick}>Thêm Học Viên</Button>

      <Divider />

      <Form form={form} component={false}>
        <Table
          rowKey="cccd"
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
          bordered
          tableLayout="auto"
          scroll={{ x: 'max-content' }}
        />
      </Form>
    </div>
  );
};
export default ViewAllStudent;
