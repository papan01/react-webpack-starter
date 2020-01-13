import React from 'react';
import createContainer from '../../utils/test/domManipulators';
import CustomerForm from './index';

describe('CustomerForm', () => {
  let render;
  let container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('renders the first name field as a text box', () => {
    render(<CustomerForm />);
    const field = form('customer').elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toEqual('text');
  });
});
