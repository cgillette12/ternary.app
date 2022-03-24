const Loader = ({
  message = '',
  width = '100',
  className,
}: any) => (
    <div className={className}>
      <img src="https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png" width={width} alt="" />
      {message && (
        <h4 className="mt-4">{message}</h4>
      )}
    </div>
);
  
export default Loader;