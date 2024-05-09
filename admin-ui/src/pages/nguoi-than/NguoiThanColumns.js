const NguoiThanColumn = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    fixed: 'left',
    editable: false
  },

  {
    key: 'MaHocVien',
    title: 'Mã học viên',
    dataIndex: 'MaHocVien',
    fixed: 'left',
    editable: false
  },
  {
    key: 'HoTenNguoiThan',
    title: 'Họ tên người thân',
    dataIndex: 'HoTenNguoiThan',
    fixed: 'left',
    editable: true
  },
  {
    key: 'NgaySinh',
    title: 'Ngày sinh',
    dataIndex: 'NgaySinh',
    fixed: 'left',
    editable: true
  },
  {
    key: 'NoiO',
    title: 'Nơi ở',
    dataIndex: 'NoiO',
    editable: true
  },
  {
    key: 'MoiQuanHe',
    title: 'Mối quan hệ',
    dataIndex: 'MoiQuanHe',
    editable: true
  }
];

export default NguoiThanColumn;
