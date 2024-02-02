import './App.css';
import Logo from './KNAB.png'
import { Form } from './component/Form'

const App = () => {

  return (
    <main className='main' data-testid='main'>
      <div className='container'>
        <img src={Logo} alt='logo' />
          <Form />
      </div>
  </main>
  );
}

export default App;
