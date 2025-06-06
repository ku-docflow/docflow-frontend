import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

type PreloadedState = Record<string, unknown>;

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: (state = {}) => state,
      preloadedState: preloadedState || {},
    }),
    route = '/',
    ...renderOptions
  }: {
    preloadedState?: PreloadedState;
    store?: ReturnType<typeof configureStore>;
    route?: string;
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render }; 