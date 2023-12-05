import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal } from 'antd';
import axios from 'axios';
import HangHoaData from '../../data/HangHoa.json';
import host from '../../axios/host';
import { useNavigate } from 'react-router-dom';

const AddHangHoa = () => {
  const { Title } = Typography;

  const [HangHoa, SetHangHoa] = useState(HangHoaData);
  const [form] = Form.useForm();

  const success = () => {
    Modal.success({
      content: 'Thêm hàng hóa thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Thêm hàng hóa thất bại',
      content: 'Đã có lỗi xảy ra. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const row = await form.validateFields();
    try {
      const res = await axios.post(`${host.local}/ttn2/v1/hanghoa`, HangHoa).then((result) => {
        console.log(result);
        success();
      });
    } catch (error) {
      errorModal();
      console.log(error);
    }
  };

  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      initialValues={{
        size: 'default'
      }}
      size="default"
      style={{
        maxWidth: 600
      }}
      colon={false}
    >
      <Title style={{ color: '#00A9FF' }}> Thêm Hàng Hóa </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Form.Item
        name="hanghoa"
        rules={[
          {
            required: true,
            message: 'Nhập tên hàng hóa'
          }
        ]}
        label="Tên hàng hóa"
      >
        <Input
          onChange={(e) => {
            SetHangHoa({ ...HangHoa, TenHangHoa: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="dongia"
        rules={[
          {
            required: true,
            message: 'Nhập đơn giá'
          }
        ]}
        label="Đơn giá"
      >
        <Input
          onChange={(e) => {
            SetHangHoa({ ...HangHoa, DonGia: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Thêm hàng hóa
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddHangHoa;
