'use client';

import { useGetEarthquake } from '@/hooks/use-get-earthquake';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  SortDescriptor,
  useDisclosure,
} from '@heroui/react';
import { columns, INITIAL_VISIBLE_COLUMNS } from '@/shared/constants/grid';
import { useMemo, useState } from 'react';
import { Earthquake_earthquakes_Earthquake as EarthquakeType } from '@/graphql/types/earthquake.query';
import { SharedSelection } from '@heroui/system';

import EarthquakeModal from '@/components/earthquake-modal/earthquake-modal';
import GridTopContent from '@/components/earthquake-grid/grid-top-content/grid-top-content';
import { GridCell } from '@/components/earthquake-grid/grid-cell/grid-cell';

export type ColumnType = {
  name: string;
  uid: string;
  sortable: boolean;
};

function EarthquakeGrid() {
  const { earthquakes, loading } = useGetEarthquake();
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<EarthquakeType | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<SharedSelection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [action, setAction] = useState<'add' | 'update'>();

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const sortedItems = useMemo(() => {
    return [...earthquakes].sort((a, b) => {
      const first = a?.[
        `${sortDescriptor?.column}`.toLowerCase() as keyof EarthquakeType
      ] as string;
      const second = b?.[
        `${sortDescriptor?.column}`.toLowerCase() as keyof EarthquakeType
      ] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor?.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, earthquakes]);

  return (
    <>
      <Table
        isStriped
        isVirtualized
        aria-label="table"
        maxTableHeight={750}
        rowHeight={40}
        sortDescriptor={sortDescriptor}
        topContent={
          <GridTopContent
            visibleColumns={visibleColumns}
            onVisibleColumns={setVisibleColumns}
            columns={columns}
            onSelectedEarthquake={(value) => setSelectedEarthquake(value)}
            onAction={(value) => setAction(value)}
            onOpen={onOpen}
            earthquakes={earthquakes}
          />
        }
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name.toUpperCase()}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={'No rows to display.'}
        >
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  <GridCell
                    columnKey={columnKey}
                    earthquake={item}
                    onAction={setAction}
                    onSelectedEarthquake={setSelectedEarthquake}
                    onOpen={onOpen}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EarthquakeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        earthquake={selectedEarthquake}
        deleteOpenedEarthquake={() => setSelectedEarthquake(null)}
        action={action}
      />
    </>
  );
}

export default EarthquakeGrid;
