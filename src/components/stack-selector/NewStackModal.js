import React from 'react';
import Modal from '../ui/Modal';
import ModalContent from '../ui/ModalContent';
import Form from '../ui/Form';
import FormLabel from '../ui/FormLabel';
import Alert from '../ui/Alert';
import Input from '../ui/Input';
import Button from '../ui/Button';

const NewStackModal = ({isVisible, isPending, value, onSubmit, onValue }) => (
  <Modal isVisible={ isVisible }>
    <ModalContent>
      <h1 className="mr2 ml2">New Stack</h1>
      <Form handleSubmit={ onSubmit }>
        <Alert isVisible={ isPending }>Loading...</Alert>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter new stack name"
          fieldDefinition={{
            value,
            name,
            onChange: (event) => onValue(event.target.value),
          }}
          />
        <Button type="submit">
          Create New Stack
        </Button>
      </Form>
    </ModalContent>
  </Modal>
);

export default NewStackModal;
