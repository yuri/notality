import React, {Component} from 'react';
import Form from '../ui/Form';
import Input from '../ui/Input';
import FormLabel from '../ui/FormLabel';
import {reduxForm} from 'redux-form';

class FilterBox extends Component {
  /* eslint react/prop-types: 0 */
  render() {
    const {fields: {text, showArchived}} = this.props;
    return (
      <Form>
        <Input
          placeholder = "Search text"
          className = "p0 m0"
          fieldDefinition = {text} />
        <FormLabel>Show archived</FormLabel><input
          className = ""
          type = "checkbox"
          {...showArchived} />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'noteFilter',
  fields: ['text', 'showArchived'],
})(FilterBox);
