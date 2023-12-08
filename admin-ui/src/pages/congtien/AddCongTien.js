import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal } from 'antd';
import axios from 'axios';
import CongTienHocVien from '../../data/CongTien.json';
import host from '../../axios/host';
import Global from '../../constant/Global';

const AddCongTien = () => {
  const { Title } = Typography;

  const [CongTien, SetCongTien] = useState(CongTienHocVien);
  const [form] = Form.useForm();

  const success = () => {
    Modal.success({
      content: 'Hoàn tất xử lý'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Có lỗi xảy ra',
      content: 'Đã có lỗi xảy ra. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const row = await form.validateFields();
    try {
      const res = await axios
        .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/naptien`, CongTien, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((result) => {
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
        span: 8
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
      <Title style={{ color: '#00A9FF' }}>Cộng tiền cho học viên</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Form.Item
        name="cccd"
        rules={[
          {
            required: true,
            message: 'Nhập căn cước công dân của học viên'
          }
        ]}
        label="cccd"
      >
        <Input
          onChange={(e) => {
            SetCongTien({ ...CongTien, cccd: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="sotiennap"
        rules={[
          {
            required: true,
            message: 'Nhập số tiền cần cộng thêm'
          }
        ]}
        label="Số tiền cộng thêm"
      >
        <Input
          onChange={(e) => {
            SetCongTien({ ...CongTien, SoTienNap: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Hoàn tất
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddCongTien;
