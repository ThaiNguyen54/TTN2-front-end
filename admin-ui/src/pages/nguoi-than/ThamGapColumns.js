const ThamGapColumn = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    fixed: 'left',
    editable: false
  },
  {
    key: 'cccd',
    title: 'Căn cước công dân học viên',
    dataIndex: 'cccd',
    fixed: 'left',
    editable: false
  },
  {
    key: 'idNguoiThan',
    title: 'ID người thân',
    dataIndex: 'idNguoiThan',
    editable: true
  },
  {
    key: 'NgayThamGap',
    title: 'Ngày thăm gặp',
    dataIndex: 'NgayThamGap',
    editable: true
  }
];

export default ThamGapColumn;
