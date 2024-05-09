const CongTienColumns = [
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
    key: 'SoTienNap',
    title: 'Số tiền đã cộng',
    dataIndex: 'SoTienNap',
    editable: false
  },
  {
    key: 'createdAt',
    title: 'Ngày cộng tiền',
    dataIndex: 'createdAt',
    editable: false
  }
];

export default CongTienColumns;
