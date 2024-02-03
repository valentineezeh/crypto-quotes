import { Layout, Form } from '../component'
import { Navigation } from '../component/common/Nav'

const SubscriptionPage = () => {
  return (
    <>
      <Navigation />
      <Layout Component={<Form />} />
    </>
  )
}

export default SubscriptionPage