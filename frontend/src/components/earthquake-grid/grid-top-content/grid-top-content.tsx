import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDownIcon } from '@/assets/svg/chevron-down-icon';
import { PlusIcon } from '@/assets/svg/plus-icon';
import { SharedSelection } from '@heroui/system';
import { ColumnType } from '@/components/earthquake-grid/earthquake-grid';
import { Earthquake_earthquakes_Earthquake as EarthquakeType } from '@/graphql/types/earthquake.query';

type GridTopContentProps = {
  visibleColumns: SharedSelection;
  onVisibleColumns: (value: SharedSelection) => void;
  columns: ColumnType[];
  onSelectedEarthquake: (value: EarthquakeType | null) => void;
  onAction: (value?: 'add' | 'update') => void;
  onOpen: () => void;
  earthquakes: (EarthquakeType | null)[];
}

function GridTopContent({visibleColumns, onVisibleColumns, columns, onSelectedEarthquake, onAction, onOpen, earthquakes}: GridTopContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <div className="flex gap-4">
          <Dropdown>
            <DropdownTrigger className="sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectionMode="multiple"
              onSelectionChange={onVisibleColumns}
              selectedKeys={visibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onPress={() => {
              onSelectedEarthquake(null);
              onAction('add');
              onOpen();
            }}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center  gap-3">
          <span className="text-default-400 text-small">
            Total {earthquakes.length} earthquakes
          </span>
      </div>
    </div>
  )
}

export default GridTopContent;