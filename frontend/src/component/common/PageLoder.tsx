import { TailSpin } from 'react-loader-spinner';

export const PageLoader = () => {
  return (
    <div className='page-loader'>
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#0c3756"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}