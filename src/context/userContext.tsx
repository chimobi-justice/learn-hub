import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { useGetUser } from '@hooks/user/useGetUser'

interface UserContextType {
  user: any;
  isLoading: boolean;
  isSuccess: boolean;
}

const defaultContextValue: UserContextType = {
  user: null,
  isLoading: true,
  isSuccess: false
}

const UserContext = createContext<UserContextType>(defaultContextValue);

const UserContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const clu = JSON.parse(localStorage.getItem('clu') || "false");

  const { data, isLoading: loading, isSuccess: success } = useGetUser();

  useEffect(() => {
    if (clu && success && data) {
      setUser(data);
      setIsLoading(loading);
      setIsSuccess(success);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [clu, data, loading, success]);

  return (
    <UserContext.Provider value={{ user, isLoading, isSuccess }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}

export default UserContextProvider;