import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import createContainer from '../../utils/test/domManipulators';
import CustomerForm from './index';

describe('CustomerForm', () => {
  const originalFetch = window.fetch;
  let render;
  let container;
  let fetchSpy;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  const fetchRequestBody = () => JSON.parse(fetchSpy.mock.calls[0][1].body);

  const fetchResponseOk = body =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    });

  const fetchResponseError = () => Promise.resolve({ ok: false });

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
      render(<CustomerForm {...{ [fieldName]: value }} />);
      ReactTestUtils.Simulate.submit(form('customer'));
      expect(fetchRequestBody()).toMatchObject({
        [fieldName]: value,
      });
    });
  };

  const itSubmitsNewValue = (fieldName, value) => {
    it('saves new value when submitted', async () => {
      render(<CustomerForm {...{ [fieldName]: 'existingValue' }} />);
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
      expect(fetchRequestBody()).toMatchObject({
        [fieldName]: value,
      });
    });
  };

  beforeEach(() => {
    ({ render, container } = createContainer());
    fetchSpy = jest.fn(() => fetchResponseOk({}));
    window.fetch = fetchSpy;
  });

  afterEach(() => {
    window.fetch = originalFetch;
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

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm />);
    ReactTestUtils.Simulate.submit(form('customer'));
    expect.objectContaining({
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('notifies onSave when form is submitted', async () => {
    const customer = { id: 123 };
    fetchSpy.mockReturnValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();
    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    fetchSpy.mockReturnValue(fetchResponseError());
    const saveSpy = jest.fn();
    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();
    render(<CustomerForm />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'), {
        preventDefault: preventDefaultSpy,
      });
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    fetchSpy.mockReturnValue(fetchResponseError());
    render(<CustomerForm />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });

    const errorElement = container.querySelector('.error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
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
