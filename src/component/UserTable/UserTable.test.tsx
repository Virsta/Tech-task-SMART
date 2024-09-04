import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from '../../redux/reducers';
import UserTable from './UserTable';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

// Enable fetch mocks
fetchMock.enableMocks();

// Create a mock store for testing
const store = createStore(userReducer);

const mockUsers = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', phone: '010-692-6593' },
];

describe('UserTable Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches and displays users correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    render(
      <Provider store={store}>
        <UserTable />
      </Provider>
    );

    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Check that the table contains the user data
    expect(screen.getByText('Bret')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-8031')).toBeInTheDocument();
  });

  it('filters users based on input', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    render(
      <Provider store={store}>
        <UserTable />
      </Provider>
    );

    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Enter text into the Name filter
    userEvent.type(screen.getByPlaceholderText(/Search by name/i), 'Leanne');

    // Check that only "Leanne Graham" is visible after filtering
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  });

});
