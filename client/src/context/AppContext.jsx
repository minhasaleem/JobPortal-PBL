import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser, useAuth } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: '', location: '' });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true); // 🔹 added
  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) setJobs(data.jobs);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken }
      });
      if (data.success) setCompanyData(data.company);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    setUserLoading(true); // 🔹 start loading
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("FETCH USER ERROR:", error);
      toast.error(error.message);
    } finally {
      setUserLoading(false); // 🔹 done loading
    }
  };

  //Function to fetch user's applied applications data
  const fetchUserApplications = async ()=>{
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl+'/api/users/applications',
        {headers:{Authorization : `Bearer ${token}`}}
      )
      if (data.success) {
        setUserApplications(data.applications)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Load jobs and tokens on mount
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem('companyToken');
    if (storedCompanyToken) setCompanyToken(storedCompanyToken);
    
    const storedAdminToken = localStorage.getItem('adminToken');
    if (storedAdminToken) setAdminToken(storedAdminToken);
  }, []);

  // Fetch company data when companyToken changes
  useEffect(() => {
    if (companyToken) fetchCompanyData();
  }, [companyToken]);

  // Fetch user data when user changes
  useEffect(() => {
    if (user) 
      fetchUserData();
    fetchUserApplications()
  }, [user, getToken]);

  const value = {
    setSearchFilter,
    searchFilter,
    setIsSearched,
    isSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    adminToken,
    setAdminToken,
    backendUrl,
    userData,
    setUserData,
    userLoading, // 🔹 expose it here
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
