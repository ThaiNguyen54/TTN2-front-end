import { Typography, Divider, Row, Col, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { Form, Input, Radio } from 'antd';
import { Select, Space } from 'antd';
import axios from 'axios';

const VewAllStudent = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [gender, SetGender] = useState(0);
  const [file, SetFile] = useState('');
  const [detoxForm, SetDetoxForm] = useState('tunguyen');
  const [division, SetDivision] = useState([]);
  const [district, SetDistrict] = useState([]);
  const [ward, SetWard] = useState([]);
  const [disableDistrict, SetDisableDistrict] = useState(true);
  const [defaultDistrictValue, SetDefaultDistrictValue] = useState('');
  const [disableWard, SetDisableWard] = useState(true);
  const [defaultWardValue, SetDefaultWardValue] = useState('');
  const handleSelectFile = (e) => SetFile(e.target.files[0]);

  const dateFormat = 'DD/MM/YYYY';

  const getVietnameseAdministrativeDivision = async () => {
    await axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
      SetDivision(response.data);
    });
  };

  useEffect(() => {
    getVietnameseAdministrativeDivision();
  }, []);

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
    const filteredProvinceCityResult = division.filter((division) => division.codename === value);
    SetDistrict(filteredProvinceCityResult[0].districts);
    SetDisableDistrict(false);
    SetDefaultDistrictValue(filteredProvinceCityResult[0].districts[0].name);
  };

  const handleChangeDistrict = (value) => {
    console.log(`Selected: ${value}`);
    const filteredDistrictResult = district.filter((district) => district.codename === value);
    SetDefaultDistrictValue(value);
    SetWard(filteredDistrictResult[0].wards);
    if (filteredDistrictResult[0].wards.length > 0) {
      SetDefaultWardValue(filteredDistrictResult[0].wards[0].name);
      SetDisableWard(false);
    } else {
      SetDefaultWardValue('');
      SetDisableWard(true);
    }
  };

  const handleChangeWard = (value) => {
    console.log(`Selected: ${value}`);
    SetDefaultWardValue(value);
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

      {/* Form for "Thông tin đối tượng" */}
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
                  defaultValue="-- Chọn Tỉnh/Thành Phố --"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeProvinceCity}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={division.map((division) => ({
                    label: division.name,
                    value: division.codename
                  }))}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Đơn vị">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  onChange={handleChangeWard}
                  value={defaultWardValue !== '' ? defaultWardValue : '-- Chọn Phường/Xã --'}
                  disabled={disableWard}
                  style={{
                    width: '100%'
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={ward.map((ward) => ({
                    label: ward.name,
                    value: ward.codename
                  }))}
                />
              </Space>
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
                  value={defaultDistrictValue !== '' ? defaultDistrictValue : '-- Chọn Quận/Huyện --'}
                  style={{
                    width: '100%'
                  }}
                  disabled={disableDistrict}
                  onChange={handleChangeDistrict}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={district.map((district) => ({
                    label: district.name,
                    value: district.codename
                  }))}
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

      {/* Form for "Thôn tin hình thức cai nghiện "*/}
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
              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px' }}>
                Tạm giữ xác định tình trạng nghiện
              </Title>

              <Form.Item label="Số quyết định tạm giữ">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định tạm giữ">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày có kết quả nghiện">
                <Input />
              </Form.Item>

              <Form.Item label="Kết quả">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày hoàn thành xác định tình trạng nghiện">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Theo quyết định quản lý
              </Title>

              <Form.Item label="Số quyết định quản lý">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền án
              </Title>

              <Form.Item label="Tiền án ma túy hoặc tiền án khác">
                <Input />
              </Form.Item>

              <Form.Item label="Tội danh">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn tù">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền sự
              </Title>

              <Form.Item label="Số lần cai">
                <Input />
              </Form.Item>

              <Form.Item label="Nơi cai nghiện">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tài sản
              </Title>

              <Form.Item label="Loại tài sản">
                <Input />
              </Form.Item>

              <Form.Item label="Tình trạng tài sản">
                <Input />
              </Form.Item>

              <Form.Item label="Bàn giao (nơi nhận hoặc người thân)">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Kỷ luật
              </Title>

              <Form.Item label="Số quyết định kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày vi phạm">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày hết hạn kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Hành vi vi phạm khác">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Khen thưởng
              </Title>

              <Form.Item label="Số quyết định khen thưởng">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức khen thưởng">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Thăm gặp
              </Title>

              <Form.Item label="Họ tên người thăm">
                <Input />
              </Form.Item>

              <Form.Item label="Mối quan hệ">
                <Input />
              </Form.Item>

              <Form.Item label="Số người thăm">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày thăm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển viện
              </Title>

              <Form.Item label="Nơi chuyển viện">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày chuyển viện">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày nhập lại">
                <Input />
              </Form.Item>

              <Form.Item label="Thông tin liên hệ gia đình">
                <Input />
              </Form.Item>

              <Form.Item label="Ghi chú">
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
              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px' }}>
                Tòa án
              </Title>

              <Form.Item label="Ngày họp - Ngày quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Giờ họp">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức họp">
                <Input />
              </Form.Item>

              <Form.Item label="Thẩm phán phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Thư ký phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Hoãn phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Khiếu nại">
                <Input />
              </Form.Item>

              <Form.Item label="Tình trạng xử lý đơn vắng mặt">
                <Input />
              </Form.Item>

              <Form.Item label="Số quyết định tòa án">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Nơi chấp hành quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Di lý
              </Title>

              <Form.Item label="Công văn di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Thời gian di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Thời gian gia hạn di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Số quyết định đưa ra khỏi cơ sở">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày nhập lại hoặc cắt giảm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Trốn viện - Trốn phép
              </Title>

              <Form.Item label="Ngày trốn viện/trốn phép">
                <Input />
              </Form.Item>

              <Form.Item label="Số thông báo">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra thông báo">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày cắt giảm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển cơ sở
              </Title>

              <Form.Item label="Ngày chuyển cơ sở">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ bàn giao">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Bàn giao cho cơ quan khác
              </Title>

              <Form.Item label="Số văn bản bàn giao">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra văn bản">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <Input />
              </Form.Item>

              <Form.Item label="Lý do bàn giao">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ bên nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Thông tin liên lạc bên nhận (Số điện thoại)">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ giải quyết">
                <Input />
              </Form.Item>

              <Form.Item label="Lãnh đạo giao - chức vụ">
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}

      {/* Form for "Thông tin gia đình" */}
      <Title level={4} style={{ color: '#00A9FF' }}>
        Thông tin gia đình
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
            <Form.Item label="Họ tên cha">
              <Input />
            </Form.Item>

            <Form.Item label="Họ tên mẹ">
              <Input />
            </Form.Item>

            <Form.Item label="Nơi ở cha">
              <Input />
            </Form.Item>

            <Form.Item label="Họ tên vợ/chồng">
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
            <Form.Item label="Ngày sinh cha">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày sinh mẹ">
              <Input />
            </Form.Item>

            <Form.Item label="Nơi ở mẹ">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày sinh vợ/chồng">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default VewAllStudent;
