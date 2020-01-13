import ReactDOM from 'react-dom';

const createContainer = () => {
  const container = document.createElement('div');
  return {
    render: component => {
      ReactDOM.render(component, container);
    },
    container,
  };
};

export default createContainer;
