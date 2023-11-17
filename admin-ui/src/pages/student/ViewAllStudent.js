import { Typography, Divider, Row, Col, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import { Select, Space, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const VewAllStudent = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [gender, SetGender] = useState(0);
  const [file, SetFile] = useState('');
  const [detoxForm, SetDetoxForm] = useState('');

  const handleSelectFile = (e) => SetFile(e.target.files[0]);

  const dateFormat = 'DD/MM/YYYY';

  const onGenderChange = (e) => {
    console.log('radio checked', e.target.value);
    SetGender(e.target.value);
  };

  const onDetoxFormChange = (e) => {
    console.log('radio checked', e.target.value);
    SetDetoxForm(e.target.value);
  };

  const handleChangeRace = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeProvinceCity = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeMarriageStatus = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeAcademicLevel = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeReligion = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeDistrict = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeActivityArea = (value) => {
    console.log(`selected ${value}`);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 14
          }
        }
      : null;

  return (
    <div>
      <Title style={{ color: '#00A9FF' }}> Đăng Kí Đối Tượng </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Title level={4} style={{ color: '#00A9FF' }}>
        Thông tin cá nhân đối tượng{' '}
      </Title>

      <Row
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: '4px', // optional: add border-radius for rounded corners
          padding: '16px'
        }}
      >
        {/*  First column */}
        <Col span={12}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            labelWrap
            labelCol={{ flex: '200px' }}
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Họ tên">
              <Input />
            </Form.Item>

            <Form.Item label="Giới tính">
              <Radio.Group onChange={onGenderChange} value={gender}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Ngày sinh">
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi đăng kí thường trú">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày cấp CMND">
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Dân tộc">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Chọn dân tộc"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeRace}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'kinh',
                      label: 'Kinh'
                    },
                    {
                      value: 'tay',
                      label: 'Tày'
                    },
                    {
                      value: 'thai',
                      label: 'Thái'
                    },
                    {
                      value: 'hoa',
                      label: 'Hoa'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Tỉnh">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Chọn Tỉnh/TP"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeProvinceCity}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'angiang',
                      label: 'An Giang'
                    },
                    {
                      value: 'brvt',
                      label: 'Bà Rịa - Vũng Tàu'
                    },
                    {
                      value: 'tpdn',
                      label: 'TP. Đà Nẵng'
                    },
                    {
                      value: 'daklak',
                      label: 'Đắk Lắk'
                    },
                    {
                      value: 'tphcm',
                      label: 'TP. Hồ Chí Minh'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    },
                    {
                      value: 'langthang',
                      label: 'Lang thang'
                    },
                    {
                      value: 'nuocngoai',
                      label: 'Nước ngoài'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Đơn vị">
              <Input />
            </Form.Item>

            <Form.Item label="Tình trạng hôn nhân">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Chưa đăng kí kết hôn"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'notmarried',
                      label: 'Chưa đăng kí kết hôn'
                    },
                    {
                      value: 'married',
                      label: 'Đã đăng kí kết hôn'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Năm sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Tiền sự">
              <Input />
            </Form.Item>

            <Form.Item label="Khu sinh hoạt">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Chọn khu sinh hoạt"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeActivityArea}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'nam1',
                      label: 'Khu quản lý học viên nam 1'
                    },
                    {
                      value: 'nam2',
                      label: 'Khu quản lý học viên nam 2'
                    },
                    {
                      value: 'nam3',
                      label: 'Khu quản lý học viên nam 3'
                    },
                    {
                      value: 'catcon',
                      label: 'Khu quản lý học viên cắt cơn'
                    },
                    {
                      value: 'nu',
                      label: 'Khu quản lý học viên nữ'
                    },
                    {
                      value: 'nam-baove',
                      label: 'Phòng bảo vệ - Khu quản lý học viên nam'
                    },
                    {
                      value: 'tunguyen',
                      label: 'Khu quản lý học viên cai nghiện tự nguyện'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Cơ quan bàn giao">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Cấp xã"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'xa',
                      label: 'Cấp xã'
                    },
                    {
                      value: 'huyen',
                      label: 'Cấp huyện'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Thành phần gia đình">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Công nhân"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'congnhan',
                      label: 'Công nhân'
                    },
                    {
                      value: 'nongdan',
                      label: 'Nông dân'
                    },
                    {
                      value: 'laodong',
                      label: 'Lao động'
                    },
                    {
                      value: 'congchuc',
                      label: 'Công chức'
                    },
                    {
                      value: 'doanhnhan',
                      label: 'Doanh nhân'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Loại ma túy sử dụng">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Thuốc phiện"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'thuocphien',
                      label: 'Thuốc phiện'
                    },
                    {
                      value: 'heroin',
                      label: 'Heroin'
                    },
                    {
                      value: 'cansa',
                      label: 'Cần sa'
                    },
                    {
                      value: 'boda',
                      label: 'Bồ đà'
                    },
                    {
                      value: 'matuyda',
                      label: 'Ma túy đá'
                    },
                    {
                      value: 'ketamin',
                      label: 'Ketamin'
                    },
                    {
                      value: 'thuoclac',
                      label: 'Thuốc lắc'
                    },
                    {
                      value: 'tanduoc',
                      label: 'Tân dược gây nghiện'
                    },
                    {
                      value: 'nhieumatuy',
                      label: 'Sử dụng nhiều loại ma túy'
                    }
                  ]}
                />
              </Space>
            </Form.Item>
            <Form.Item label="Cơ quan xác định tình trạng nghiện">
              <Input />
            </Form.Item>

            <Form.Item label="Tuổi lần đầu sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Tuổi lần đầu tiêm chích">
              <Input />
            </Form.Item>

            <Form.Item label="Tổng thời gian sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Hình thức cai nghiện">
              <Radio.Group defaultValue="tunguyen" buttonStyle="solid" onChange={onDetoxFormChange}>
                <Radio.Button value="tunguyen">Tự nguyện</Radio.Button>
                <Radio.Button value="batbuoc">Bắt buộc</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>

        {/*  Second column */}
        <Col span={12}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            labelCol={{ flex: '200px' }}
            labelWrap
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Tên khác">
              <Input />
            </Form.Item>

            <Form.Item label="Trình độ">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Trình độ học vấn"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeAcademicLevel}
                  options={[
                    {
                      value: 'dh',
                      label: 'Đại học'
                    },
                    {
                      value: '12',
                      label: '12/12'
                    },
                    {
                      value: '9',
                      label: '9/12'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Việc làm">
              <Input />
            </Form.Item>

            <Form.Item label="Số CMND">
              <Input />
            </Form.Item>

            <Form.Item label="Nơi cấp CMND">
              <Input />
            </Form.Item>

            <Form.Item label="Tôn giáo">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Không"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeReligion}
                  options={[
                    {
                      value: 'noreligion',
                      label: 'Không'
                    },
                    {
                      value: 'buddhism',
                      label: 'Đạo Phật'
                    },
                    {
                      value: 'Christianity',
                      label: 'Đạo Chúa'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Huyện">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Quận/Huyện"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeDistrict}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[
                    {
                      value: 'dis1',
                      label: 'Quận 1'
                    },
                    {
                      value: 'chaudoc',
                      label: 'Châu Đốc'
                    },
                    {
                      value: 'dis2',
                      label: 'Quận 2'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <input type="file" name="file" id="file" onChange={handleSelectFile} multiple={false} />
            </Form.Item>

            <Form.Item label="Hình thức sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Tiền án">
              <Input />
            </Form.Item>

            <Form.Item label="Trong tháng trở lại đây">
              <Input />
            </Form.Item>

            <Form.Item label="Nguyên nhân tái nghiện">
              <Input />
            </Form.Item>

            <Form.Item label="Lý do giảm">
              <Input />
            </Form.Item>

            <Form.Item label="Nghề nghiệp">
              <Input />
            </Form.Item>

            <Form.Item label="Thành phần bản thân">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Học sinh"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'hocsinh',
                      label: 'Học sinh'
                    },
                    {
                      value: 'sinhvien',
                      label: 'Sinh viên'
                    },
                    {
                      value: 'canbo-congchuc-viecchuc',
                      label: 'Cán bộ - Công chức - Viên chức'
                    },
                    {
                      value: 'congnhan',
                      label: 'Công nhân'
                    },
                    {
                      value: 'nongdan',
                      label: 'Nông dân'
                    },
                    {
                      value: 'kinhdoanh-muaban',
                      label: 'Kinh doanh - mua bán'
                    },
                    {
                      value: 'tudo',
                      label: 'Lao động tự do'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Tình trạng việc làm">
              <Input />
            </Form.Item>

            <Form.Item label="Nhập mới">
              <Input />
            </Form.Item>

            <Form.Item label="Trốn nhập lại">
              <Input />
            </Form.Item>

            <Form.Item label="Trình độ phổ thông">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Title level={4} style={{ color: '#00A9FF' }}>
        Thông tin hình thức cai nghiện
      </Title>

      {/* Form for "cai nghiện tự nguyện" */}
      {detoxForm === 'tunguyen' && (
        <Row
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px', // optional: add border-radius for rounded corners
            padding: '16px'
          }}
        >
          {/*  First column */}
          <Col span={12}>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              labelWrap
              labelCol={{ flex: '200px' }}
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Form.Item label="Tự nguyện đóng phí">
                <Input />
              </Form.Item>

              <Form.Item label="Tự nguyện tại cộng đồng">
                <Input />
              </Form.Item>

              <Form.Item label="Số hợp đồng">
                <Input />
              </Form.Item>

              <Form.Item label="Người giám hộ (đối với người cai nghiện từ đủ 12 tuổi đến dưới 18 tuổi)">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn hợp đồng">
                <Input />
              </Form.Item>
            </Form>
          </Col>

          {/*  Second column */}
          <Col span={12}>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              labelCol={{ flex: '200px' }}
              labelWrap
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Form.Item label="Ngày thanh lý hợp đồng">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày cấp giấy hoàn thành">
                <Input />
              </Form.Item>

              <Form.Item label="Số giấy hoàn thành">
                <Input />
              </Form.Item>

              <Form.Item label="Các giai đoạn cai nghiện">
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}

      {/* Form for "cai nghiện bắt buộc"*/}
      {detoxForm === 'batbuoc' && (
        <Row
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px', // optional: add border-radius for rounded corners
            padding: '16px'
          }}
        >
          {/*  First column */}
          <Col span={12}>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              labelWrap
              labelCol={{ flex: '200px' }}
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <p>bat buoc</p>
            </Form>
          </Col>

          {/*  Second column */}
          <Col span={12}>
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              labelCol={{ flex: '200px' }}
              labelWrap
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <p>bat buoc</p>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default VewAllStudent;
