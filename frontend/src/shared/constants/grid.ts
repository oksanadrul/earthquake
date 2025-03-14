export enum Grid {
  MAGNITUDE = "MAGNITUDE",
  DATE = "DATE",
  LATITUDE = "LATITUDE",
  LONGITUDE = "LONGITUDE",
}

export const customColumns = Object.keys(Grid).map((column) => ({
  name: column.toLowerCase(),
  uid: column.toLowerCase(),
  sortable: true,
}));

export const actionsColumn = {
  name: 'actions',
  uid: 'actions',
  sortable: false,
};

export const columns = [...customColumns, actionsColumn];

export const INITIAL_VISIBLE_COLUMNS = [
  'magnitude',
  'date',
  'longitude',
  'latitude',
  'actions',
];
