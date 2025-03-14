import {
  Button,
  ModalBody,
  ModalFooter,
  ModalContent,
  Modal,
  ModalHeader,
  Form,
  Input,
  DatePicker,
  addToast,
} from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import { ZonedDateTime } from '@internationalized/date';
import { Earthquake_earthquakes_Earthquake as EarthquakeType } from '@/graphql/types/earthquake.query';
import { ApolloError } from '@apollo/client';
import { useUpdateEarthquake } from '@/hooks/update-earthquake';
import { useAddEarthquake } from '@/hooks/add-earthquake';
import { FormValues } from '@/shared/types/form-value-types';
import { transformFormData } from '@/shared/utils/transform-form-data';
import { formValidation } from '@/shared/utils/form-validation';
import {
  formDefaultValues,
  transformToDefaultFormValue,
} from '@/shared/utils/transform-to-default-form-value';

type EarthquakeModalProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  action?: 'add' | 'update';
  earthquake?: EarthquakeType | null;
  deleteOpenedEarthquake?: () => void;
};

function EarthquakeModal({
  isOpen,
  onOpenChange,
  earthquake,
  action,
  deleteOpenedEarthquake,
}: EarthquakeModalProps) {
  const { updateEarthquake, loading: updateLading } = useUpdateEarthquake();
  const { addEarthquake, loading: addLoading } = useAddEarthquake();
  const [formValues, setFormValues] = useState<FormValues>(formDefaultValues);
  const [errors, setErrors] = useState({});
  const isActionButtonDisabled = useMemo(
    () =>
      Object.entries(formValues).some(
        ([key, value]) => key !== 'id' && !value
      ) || Object.values(errors).some((field) => field),
    [errors, formValues]
  );

  useEffect(() => {
    setFormValues(transformToDefaultFormValue(earthquake));
  }, [earthquake]);

  function handleUpdateField(
    keyField: string,
    value: string | ZonedDateTime | null
  ) {
    setFormValues((prev) => ({ ...prev, [keyField]: value }));
  }

  function handleFormErrors(
    keyField: string,
    value: string | ZonedDateTime | null
  ) {
    const { condition, errorMessage } = formValidation(keyField, value);

    if (condition) {
      setErrors((prevState) => ({
        ...prevState,
        [keyField]: errorMessage,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [keyField]: false,
      }));
    }
  }

  async function handleUpdateEarthquake() {
    try {
      await updateEarthquake(transformFormData(formValues));
      addToast({
        title: 'Earthquake Updated Successfully',
        description: `The earthquake record with ID ${earthquake?.id} has been successfully updated in the database.`,
        color: 'success',
      });
    } catch (error) {
      addToast({
        title: "Earthquake can't be updated",
        description: (error as ApolloError).message,
        color: 'danger',
      });
    }
  }

  async function handleAddEarthquake() {
    try {
      await addEarthquake(transformFormData(formValues));
      addToast({
        title: 'Earthquake Added Successfully',
        description: `The earthquake record with ID ${earthquake?.id} has been successfully added to the database.`,
        color: 'success',
      });
    } catch (error) {
      addToast({
        title: "Earthquake can't be added",
        description: (error as ApolloError).message,
        color: 'danger',
      });
    }
  }

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <Form validationErrors={errors} validationBehavior="aria">
            <ModalHeader>{action} earthquake</ModalHeader>
            <ModalBody className="w-full flex flex-col gap-4">
              <Input
                isRequired
                label="Magnitude"
                labelPlacement="outside"
                name="magnitude"
                type="number"
                placeholder="0.00"
                min={0}
                max={10}
                step={0.01}
                value={formValues.magnitude}
                onValueChange={(value) => {
                  handleFormErrors('magnitude', value);
                  handleUpdateField('magnitude', value);
                }}
              />
              <DatePicker
                isRequired
                isInvalid={formValues.date === null}
                className="max-w-md"
                granularity="second"
                label="Event date"
                labelPlacement="outside"
                value={formValues.date}
                onChange={(value) => {
                  handleFormErrors('date', value);
                  handleUpdateField('date', value);
                }}
              />

              <Input
                isRequired
                label="Latitude"
                labelPlacement="outside"
                name="latitude"
                type="number"
                placeholder="0.00"
                min={-90}
                max={90}
                step={0.01}
                value={formValues.latitude}
                onValueChange={(value) => {
                  handleFormErrors('latitude', value);
                  handleUpdateField('latitude', value);
                }}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Lt</span>
                  </div>
                }
              />

              <Input
                isRequired
                label="Longitude"
                labelPlacement="outside"
                name="longitude"
                type="number"
                placeholder="0.00"
                min={-180}
                max={180}
                step={0.01}
                value={formValues.longitude}
                onValueChange={(value) => {
                  handleFormErrors('longitude', value);
                  handleUpdateField('longitude', value);
                }}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Ln</span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter className="flex justify-end gap-4 w-full">
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  setErrors({});
                  deleteOpenedEarthquake && deleteOpenedEarthquake();
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                isLoading={action === 'update' ? updateLading : addLoading}
                isDisabled={isActionButtonDisabled}
                onPress={() => {
                  action === 'update'
                    ? handleUpdateEarthquake()
                    : handleAddEarthquake();
                  onClose();
                  deleteOpenedEarthquake && deleteOpenedEarthquake();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EarthquakeModal;
