import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Spin, Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form, Space, Modal } from 'antd';
import axios from 'axios';
import host from '../../axios/host';
import StudentColumn from './StudentColumn';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { CSVLink } from 'react-csv';
import Global from '../../constant/Global';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  try {
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
  } catch (error) {
    console.log(error);
  }
};
const ViewAllStudent = () => {
  const [searchText, SetSearchText] = useState('');
  const [searchedColumn, SetSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [HocVien, SetHocVien] = useState([]);
  const [FilteredHocVienData, SetFilterdHocVienData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  const [file, SetFile] = useState(null);
  const [UpdatingImageCCCD, SetUpdatingImageCCCD] = useState(null);
  const [UpdateImageFile, SetUpdateImageFile] = useState({ HinhAnh: null });
  const [isLoading, SetIsLoading] = useState(false);

  const handleSearch = (selectedKey, confirm, dataIndex) => {
    confirm();
    SetSearchText(selectedKey[0]);
    SetSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    SetSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => {
    const excludedColumns = ['HinhAnh'];

    if (excludedColumns.includes(dataIndex)) {
      return {};
    }

    return {
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
      onFilter: (value, record) => {
        if (record[dataIndex]) return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      },
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
    };
  };

  const isEditing = (record) => record.cccd === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      cccd: '',
      NoiCapCCCD: '',
      SoDu: '',
      Ho: '',
      Ten: '',
      TenDayDu: '',
      Tuoi: '',
      GioiTinh: '',
      NgaySinh: '',
      DCThuongTru: '',
      DanToc: '',
      Tinh: '',
      Huyen: '',
      DonVi: '',
      TinhTrangHN: '',
      TienAn: '',
      TienSu: '',
      TenKhac: '',
      TrinhDo: '',
      ViecLam: '',
      TonGiao: '',
      HinhAnh: '',
      NamSudung: '',
      HinhThucSuDung: '',
      TinhTrangNghien: '',
      LoaiMaTuySD: '',
      DienThoai: '',
      DieuTriARV: '',
      LyDoGiam: '',
      CoQuanBanGiao: '',
      ThanhPhanGiaDinh: '',
      CoQuanXacDinhTinhTrangNghien: '',
      TuoiLanDauSuDung: '',
      TuoiLanDauTiemChich: '',
      TongThoiGianSuDung: '',
      SoNgayLanSuDung: '',
      NguyenNhanTaiNghien: '',
      ThanhPhanBanThan: '',
      TinhTrangViecLam: '',
      TronNhapLai: '',
      NhapMoi: '',
      GhiChu: '',
      ...record
    });
    setEditingKey(record.cccd);
  };

  const updateImage = (record) => {
    setIsUpdateImage(true);
    SetUpdatingImageCCCD(record.cccd);
  };

  const handleOk = async () => {
    try {
      setIsUpdateImage(false);
      SetIsLoading(true);
      SetFile(null);
      const req = await axios
        .put(`${host.BASE_URL}/${host.API.BASE_END_POINT}/hocvien/${UpdatingImageCCCD}`, UpdateImageFile, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((result) => {
          console.log(result);
        });
      resetFileInput();
      successModal();
      SetIsLoading(false);
      GetAllHocVien();
    } catch (error) {
      SetIsLoading(false);
      console.log(error);
      errorModal();
    }
  };

  const handleCancel = () => {
    setIsUpdateImage(false);
    SetFile(null);
    resetFileInput();
  };

  const handleSelectFile = (e) => {
    SetFile(e.target.files[0]);
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        UpdateImageFile.HinhAnh = reader.result;
        console.log(UpdateImageFile.HinhAnh);
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const successModal = () => {
    Modal.success({
      content: 'Cập nhật thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Lỗi',
      content: 'Có lỗi xảy ra, vui lòng thử lại'
    });
  };

  const deleteRecord = async (record) => {
    console.log('deleted: ', record);
    console.log(record.cccd);
    SetHocVien((pre) => {
      return pre.filter((khusinhhoat) => khusinhhoat.cccd !== record.cccd);
    });

    const req = await axios
      .delete(`${host.BASE_URL}/${host.API.BASE_END_POINT}/hocvien/${record.cccd}`, {
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
      const newData = [...HocVien];
      const index = newData.findIndex((item) => key === item.cccd);

      const req = await axios
        .put(`${host.BASE_URL}/${host.API.BASE_END_POINT}/hocvien/${key}`, row, {
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
        SetHocVien(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetHocVien(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const StudentColumnWithSearchProp = StudentColumn.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.key)
  }));

  const columns = [
    ...StudentColumnWithSearchProp,
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
            <br />
            <Typography.Link style={{ marginTop: 8 }} disabled={editingKey !== ''} onClick={() => updateImage(record)}>
              Update Image
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

  const GetAllHocVien = async () => {
    try {
      const res = await axios
        .get(`${host.BASE_URL}/${host.API.BASE_END_POINT}/count-cn/hocvien`, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((res) => {
          SetHocVien(res.data.data.data);
          SetFilterdHocVienData(res.data.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllHocVien();
  }, []);

  const { Title } = Typography;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
        inputType: col.dataIndex === 'HinhAnh' ? 'file' : 'text',
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

      <CSVLink data={FilteredHocVienData} filename={'TTN2-HocVien.csv'} className="btn btn-primary">
        Export to Excel file
      </CSVLink>

      <Form form={form} component={false}>
        <Table
          rowKey="cccd"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={HocVien}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
          onChange={(pagination, filters, sorter, extra) => {
            SetFilterdHocVienData(extra.currentDataSource);
          }}
          bordered
          tableLayout="auto"
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p style={{ margin: 0 }}>Tổng số lần cai nghiện: {record.Count_CNTuNguyen + record.Count_CNBatBuoc}</p>
                <p style={{ margin: 0 }}>Số lần cai nghiện tự nguyện: {record.Count_CNTuNguyen},</p>
                <p style={{ margin: 0 }}>Số lần cai nghiện bắt buộc: {record.Count_CNBatBuoc}</p>
              </>
            )
          }}
        />
      </Form>
      <Modal title="Cập nhật ảnh học viên" open={isUpdateImage} onOk={handleOk} onCancel={handleCancel}>
        <input
          style={{ marginTop: 20 }}
          type="file"
          name="file"
          id="file"
          onChange={handleSelectFile}
          multiple={false}
          ref={fileInputRef}
        />
      </Modal>
      <Modal
        style={{ textAlign: 'center' }}
        title="Đang cập nhật ảnh, vui lòng đợi trong giây lát"
        open={isLoading}
        footer={null}
        closable={false}
        keyboard={false}
      >
        <Spin size="large" />
      </Modal>
    </div>
  );
};
export default ViewAllStudent;
