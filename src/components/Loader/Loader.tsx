const Loader = ({
  message = '',
}: any) => (
  <div className='animated fadeIn pt-1 text-center max-width: 50%;'>
  <div className='spinner-border text-primary' />
  <h5 className='mt-2'>
    {message}
  </h5>
</div>
);
  
export default Loader;