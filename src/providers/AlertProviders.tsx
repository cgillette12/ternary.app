import { createContext, useState, useContext, useMemo } from 'react';

const AlertContext = createContext(undefined);

export const useAlert = () => {
  const alertValue: any = useContext(AlertContext);
  if (alertValue === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return alertValue.setAlert;
};

const RenderAlert = () => {
  const { alert, setAlert, error }: any = useContext(AlertContext);
  let AlertComponent = null;
  if (alert) {
    if (alert.type === 'notification') {
      AlertComponent = (
        <div className="bg-danger p-3 text-white fixed-top w-100 shadow-sm text-center">
          {alert.message}
        </div>
      );
    }

    if (alert.type === 'alert') {
      AlertComponent = (
        <div
          className="modal fade show modal-background"
          style={{ display: 'block' }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-dark">
              <div className="modal-header bg-danger text-white">
                An Error has occured!
              </div>
              <div className="modal-body">
                {alert.message}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-dark"
                  onClick={() => setAlert(null)}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      console.warn(error);
    } if (alert.type === 'critical') {
      window.alert(alert.message);
      console.error(error);
    } 
  }


  setTimeout(() => {
    setAlert(null);
  }, 6000);

  return AlertComponent;
};

const AlertProvider = ({ children }: any) => {
  const [alert, setAlert] = useState(null);
  const value = useMemo(() => ({ alert, setAlert }), [alert]);
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AlertContext.Provider value={value}>
      {alert && <RenderAlert />}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;