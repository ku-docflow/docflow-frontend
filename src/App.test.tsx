// Mock Firebase auth (must be first)
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  onAuthStateChanged: jest.fn(() => () => {}), // Default: just return a no-op function
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';
import { RootState } from './store';
import { onAuthStateChanged } from 'firebase/auth';

interface TestState {
  auth?: {
    user: any;
    loading: boolean;
  };
  ui?: {
    selectedOrg: null;
    selectedTeam: null;
    selectedPeer: null;
    selectedDocument: null;
    selectedRenderMode: string;
  };
}

const createMockStore = (initialState: TestState = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        loading: false,
        ...initialState.auth,
      },
      ui: {
        selectedOrg: null,
        selectedTeam: null,
        selectedPeer: null,
        selectedDocument: null,
        selectedRenderMode: 'chat',
        ...initialState.ui,
      },
    },
  });

  return store;
};

const renderWithProviders = (component: React.ReactElement, initialState: TestState = {}) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
        {component}
    </Provider>
  );
};

describe('App', () => {
  beforeEach(() => {
    // Reset window location before each test
    window.history.pushState({}, '', '/');
    // Reset the mock before each test
    (onAuthStateChanged as jest.Mock).mockImplementation(() => () => {});
  });

  it('renders login page by default when not authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      if (typeof callback === 'function') callback(null);
      return () => {};
    });
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('renders signup page when navigating to /signup', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      if (typeof callback === 'function') callback(null);
      return () => {};
    });
    renderWithProviders(<App />);
    window.history.pushState({}, '', '/signup');
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
  });

  it('renders main page when authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      if (typeof callback === 'function') callback({
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
      });
      return () => {};
    });
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
    };
    renderWithProviders(<App />, {
      auth: {
        user: mockUser,
        loading: false,
      },
    });
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('shows loading state initially', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      if (typeof callback === 'function') callback(null);
      return () => {};
    });
    renderWithProviders(<App />, {
      auth: {
        user: null,
        loading: true,
      },
    });
    // Check for loading indicator instead of pathname
    await waitFor(() => {
      const loadingContainer = document.querySelector('.loading-container');
      expect(loadingContainer).toBeInTheDocument();
    });
  });
});
