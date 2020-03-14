import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';

describe('Transaction input component', () => {
  const getTransactionID = jest.fn()
  const component = shallow(<Input getTransactionID={getTransactionID}/>);

  it('should match the snapshot', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('propegates transaction ID on submition', () => {
    expect(component.find('form').length).toBe(1);
    expect(component.find(TextField).length).toBe(1);

    component.find('form').simulate('submit', {
      target: {transactionID: {value: 'My new value'}}
    });

    expect(getTransactionID).toHaveBeenCalledWith(
      {"target": { "transactionID": {"value": "My new value"}}},
      "My new value"
    );
  })
});