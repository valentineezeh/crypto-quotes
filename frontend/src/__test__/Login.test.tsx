import { fireEvent, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { cleanup, renderApollo} from './utils';
import { loginMocks as mocks } from './mock'
import { Login } from '../component/Login'

type Options = {
  onSuccess: () => void,
  onError: () => void
}

describe('Render Login Component', () => {
  afterEach(cleanup)
  it('should render component', async() => {
    renderApollo(
      <GoogleOAuthProvider clientId='1234'>
        <Login />
      </GoogleOAuthProvider>
      , {mocks, addTypename: false, resolvers: {}});

    const mainElement = await screen.findAllByText('Login with GMail')
    expect(mainElement).toHaveLength(1);
  })
  it('should send a GraphQL mutation to login the user when clicking on "login" button', async () => {

    const useGoogleLogin = jest.fn()

    const mockUseGoogleLogin = (options: any) => ({
      onSuccess: options.onSuccess || jest.fn(),
      onError: options.onError || jest.fn(),
    });

    (useGoogleLogin as jest.Mock).mockImplementation(mockUseGoogleLogin);

    renderApollo(
      <GoogleOAuthProvider clientId='1234'>
        <Login />
      </GoogleOAuthProvider>
    , {mocks, addTypename: false, resolvers: {}})

    useGoogleLogin((options: Options) => ({
      onSuccess: options.onSuccess || jest.fn(),
      onError: options.onError || jest.fn(),
    }));

    const submitButton = await screen.findByTestId('login-button')
    fireEvent.click(submitButton);

    expect(useGoogleLogin).toHaveBeenCalled();
})})