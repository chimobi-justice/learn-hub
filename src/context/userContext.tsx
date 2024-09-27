import { 
  createContext, 
  ReactElement, 
  ReactNode, 
  useContext 
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
  const { data: user, isLoading, isSuccess } = useGetUser();

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