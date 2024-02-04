import { Layout, Form } from '../component'
import { Navigation } from '../component/common/Nav'

const SubscriptionPage = () => {
  return (
    <div data-testid='subscription'>
      <Navigation />
      <Layout Component={<Form />} />
    </div>
  )
}

export default SubscriptionPage