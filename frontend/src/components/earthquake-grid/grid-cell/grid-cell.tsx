import { Earthquake_earthquakes_Earthquake as EarthquakeType } from '@/graphql/types/earthquake.query';
import { Key } from 'react';
import { addToast, Button, Chip, Tooltip } from '@heroui/react';
import { EditIcon } from '@/assets/svg/edit-icon';
import { Exact } from '@/shared/types/graphql-global-types';
import { DeleteEarthquakeVariables } from '@/graphql/types/delete-earthquake.mutation';
import { ApolloError } from '@apollo/client';
import { useDeleteEarthquake } from '@/hooks/use-delete-earthquake';
import { DeleteIcon } from '@/assets/svg/delete-icon';

type GridCellProps = {
  earthquake: EarthquakeType | null;
  columnKey: Key;
  onAction: (value?: 'add' | 'update') => void;
  onSelectedEarthquake: (value: EarthquakeType | null) => void;
  onOpen: () => void;
};

export const GridCell = ({ earthquake, columnKey, onAction, onSelectedEarthquake, onOpen }: GridCellProps) => {
  const { deleteEarthquake, loading: deleteLoading } = useDeleteEarthquake();
  async function handleDeleteEarthquake(earthquakeId: string) {
    try {
      await deleteEarthquake(earthquakeId as unknown as Exact<DeleteEarthquakeVariables>);
      addToast({
        title: 'Earthquake Deleted Successfully',
        description: `The earthquake record with ID ${earthquakeId} has been successfully deleted from the database.`,
        color: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Error Deleting Earthquake',
        description: (error as ApolloError).name,
        color: 'danger',
      });
    }
  }

  switch (columnKey) {
    case 'magnitude':
      return (
        <Chip
          className="capitalize"
          color={earthquake?.magnitude && +earthquake?.magnitude >= 8 ? 'danger' : 'warning'}
          size="sm"
          variant="flat"
        >
          {earthquake?.magnitude}
        </Chip>
      );
    case 'date':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{earthquake?.date}</p>
        </div>
      );
    case 'longitude':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{Number(earthquake?.location.longitude).toFixed(2)}</p>
        </div>
      );
    case 'latitude':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{Number(earthquake?.location.latitude).toFixed(2)}</p>
        </div>
      );
    case 'actions':
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Edit earthquake">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button
                isIconOnly
                onPress={() => {
                  onAction('update');
                  earthquake && onSelectedEarthquake(earthquake);
                  onOpen();
                }}
                endContent={<EditIcon />}
              />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete earthquake">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Button
                isIconOnly
                isLoading={deleteLoading}
                color="danger"
                onPress={() => {
                  earthquake && handleDeleteEarthquake(earthquake.id);
                }}
                endContent={<DeleteIcon />}
              />
            </span>
          </Tooltip>
        </div>
      );

    default:
      return <></>;
  }
};

export default GridCell;
