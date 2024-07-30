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
}

const defaultContextValue: UserContextType = {
  user: null,
  isLoading: true
}

const UserContext = createContext<UserContextType>(defaultContextValue);

const UserContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { data: user, isLoading } = useGetUser();

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
}

export default UserContextProvider;