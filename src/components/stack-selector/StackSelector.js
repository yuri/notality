import React from 'react';
import NewStackModal from './NewStackModal';
import StackButton from './StackButton';
import Button from '../ui/Button';

function getStackValue(stacks, id, value) {
  return stacks.getIn(['byId', id]).toJS()[value];
}

const StackSelector = ({ stacks, handlers}) => (
  <div
    className="collections"
    >

    <NewStackModal
      isVisible = { stacks.get('newStackFormIsVisible') }
      value = { stacks.get('newStackName') }
      onSubmit = { () => {
        /* eslint no-console: 0 */
        console.log('stacks on submit:', stacks.get('newStackName'));
        handlers.hideNewStackForm();
        handlers.addStack(stacks.get('newStackName'));
        handlers.setNewStackName();
      }}
      onValue = { (value) => {
        handlers.setNewStackName(value);
      }} />

    <Button className="btn-outline p0" onClick = { handlers.showNewStackForm }>New Stack</Button>

    <ul>
    {stacks.get('ordered').map((id) => (
      <li><StackButton
        name={getStackValue(stacks, id, 'name')}
        key={getStackValue(stacks, id, 'id')}/></li>
    ))}
    </ul>
  </div>
);

export default StackSelector;
