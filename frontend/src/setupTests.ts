// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// import { MockedProvider, MockedResponse } from '@apollo/client/testing'
// import { InMemoryCache } from '@apollo/client'
// import { render } from '@testing-library/react'

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

// type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

// export type CommonOpts = {
//   requestsMock: MockedResponse<Record<string, any>>[]
//   props?: Record<string, any>
//   queryCache?: any
// }

// type RenderPage = CommonOpts & {
//   Page: any
// }

// type RenderComponent = CommonOpts & {
//   Component: any
// }


// export const renderScene = ({
//   Page,
//   Component,
//   requestsMock,
//   props,
//   queryCache,
// }: XOR<RenderPage, RenderComponent>) => {

//   const cache = new InMemoryCache()
//   if (queryCache) {
//     cache.writeQuery(queryCache)
//   }


//   const ToRender = (
//     <Page {...props} />
//   )

//   return {
//     ...render(
//       <MockedProvider
//         mocks={requestsMock}
//         addTypename={false}
//         cache={cache}
//         defaultOptions={{
//           watchQuery: { fetchPolicy: 'network-only' },
//           query: { fetchPolicy: 'network-only' },
//         }}
//       >
//           {ToRender}
//       </MockedProvider>
//     )
//   }
// }