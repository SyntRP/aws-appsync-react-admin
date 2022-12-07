import { Auth } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { ADMIN_GROUP } from "../../constants";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    Auth.currentSession()
      .then((res) => {
        setSession(res);
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (
      session?.accessToken &&
      session?.accessToken?.payload["cognito:groups"]?.includes(ADMIN_GROUP)
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
