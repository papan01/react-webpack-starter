import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import createContainer from '../../utils/test/domManipulators';
import CustomerForm from './index';

describe('CustomerForm', () => {
  let render;
  let container;

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  const itRendersAsATextBox = fieldName => {
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual('INPUT');
      expect(field(fieldName).type).toEqual('text');
    });
  };

  const itIncludesTheExistingValue = fieldName => {
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  };

  const itRendersALabel = (fieldName, label) => {
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = fieldName => {
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName, value) => {
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm {...{ [fieldName]: value }} onSubmit={props => expect(props[fieldName]).toEqual(value)} />);
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  const itSubmitsNewValue = (fieldName, value) => {
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props => expect(props[fieldName]).toEqual(value)}
        />,
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'firstName');
    itSubmitsNewValue('firstName', 'anotherName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'lastName');
    itSubmitsNewValue('lastName', 'anotherName');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', 'phoneNumber');
    itSubmitsNewValue('phoneNumber', 'anotherNumber');
  });
});
