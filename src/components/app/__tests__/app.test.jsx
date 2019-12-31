import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from '../index';

describe('App', () => {
  const app = <App />;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Snapshot', () => {
    const component = renderer.create(app);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('find header ', () => {
    const wrapper = mount(app);
    expect(wrapper.find('h1').text()).toContain('Hello World');
  });
});
