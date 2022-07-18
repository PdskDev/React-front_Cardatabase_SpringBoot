import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import TestRender from 'react-test-renderer';
import AddCar from './components/AddCar';

test('open add car modal form', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('New Car'));
  expect(screen.getByRole('dialog')).toHaveTextContent('New Car');
});

test('renders a snapshot', () => {
  const tree = TestRender.create(<AddCar />).toJSON();
  expect(tree).toMatchSnapshot();
});
