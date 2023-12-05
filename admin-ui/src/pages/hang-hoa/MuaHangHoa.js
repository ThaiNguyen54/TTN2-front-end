import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal, Select, Space } from 'antd';
import axios from 'axios';
import ChiTietMuaData from '../../data/ChiTietMua.json';
import host from '../../axios/host';

const Purchase = () => {
  const { Title } = Typography;

  const [ChiTietMua, SetChiTietMua] = useState(ChiTietMuaData);
  const [HangHoa, SetHangHoa] = useState([]);
  const [UnitPrice, SetUnitPrice] = useState(0);
  const [SoLuong, SetSoLuong] = useState(0);
  const [TotalCost, SetTotalCost] = useState(0);
  const [form] = Form.useForm();

  const GetAllHangHoa = async () => {
    try {
      const res = await axios.get(`${host.local}/ttn2/v1/hanghoa`).then((res) => {
        SetHangHoa(res.data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllHangHoa();
  }, []);

  const onHangHoaChange = (value) => {
    console.log('selected: ', value);
    const filteredHangHoa = HangHoa.filter((hanghoa) => hanghoa.id === value);
    SetUnitPrice(filteredHangHoa[0].DonGia);
    SetChiTietMua({ ...ChiTietMua, idHangHoa: value });

    SetTotalCost(SoLuong * filteredHangHoa[0].DonGia);
    form.setFieldsValue({
      tenhang: value
    });
  };

  const onTongTienChange = (value) => {
    console.log('selected: ', value);
  };

  const success = () => {
    Modal.success({
      content: 'Mua thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Mua thất bại',
      content: 'Đã có lỗi xảy ra. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    ChiTietMua.ThanhTien = TotalCost;
    console.log('this is chi tiet mua');
    console.log(ChiTietMua);

    try {
      const row = await form.validateFields();
      const res = await axios.post(`${host.local}/ttn2/v1/chitietmua`, ChiTietMua).then((result) => {
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
      form={form}
    >
      <Title style={{ color: '#00A9FF' }}> Mua Hàng Hóa Cho Học Viên </Title>
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
            SetChiTietMua({ ...ChiTietMua, cccd: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="tenhang"
        rules={[
          {
            required: true,
            message: 'Chọn hàng hóa'
          }
        ]}
        label="Mặt hàng"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            showSearch
            placeholder="-- Chọn mặt hàng --"
            style={{
              width: '100%'
            }}
            onChange={onHangHoaChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={HangHoa.map((hanghoa) => ({
              label: hanghoa.TenHangHoa,
              value: hanghoa.id
            }))}
          />
        </Space>
      </Form.Item>

      <Form.Item
        name="soluong"
        rules={[
          {
            required: true,
            message: 'Nhập số lượng cần mua'
          }
        ]}
        label="Số lượng"
      >
        <Input
          onChange={(e) => {
            SetChiTietMua({ ...ChiTietMua, SoLuong: e.target.value });
            SetSoLuong(e.target.value);
            SetTotalCost(e.target.value * UnitPrice);
          }}
        />
      </Form.Item>

      <Form.Item label="Đơn giá">
        <Input disabled={true} value={UnitPrice} suffix="VND" />
      </Form.Item>

      <Form.Item label="Tổng tiền">
        <Input disabled={true} value={TotalCost} suffix="VND" />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Mua hàng
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Purchase;
