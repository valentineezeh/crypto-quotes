import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';

const renderApollo = (
  node: React.ReactElement,
  { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: MockedProviderProps & RenderOptions
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options
  );
};

export * from '@testing-library/react';
export { renderApollo };