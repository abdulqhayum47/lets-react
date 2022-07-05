import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../shared-components/loading-spinner/loading-spinner";

const useApiRequest = (props) => {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const postData = () => {
        setIsLoaded(false);
        axios
          .get(props.url,props.params)
          .then(response => {
            setIsLoaded(true);
            setData({data: response});
          })
          .catch(error => {
            setIsLoaded(true);
            setError({error: true, status: 400, message: "You are screwed"});
          });
      };
      postData();
    }, []);
  
    return { data, error, isLoaded };
};

const GetData = (props) => {
    const { data, error, isLoaded } = useApiRequest({url: props.url, params: props.params ? props.params : {}});
    if (!isLoaded) {
        return <LoadingSpinner />;
    }
    props.sendResponse(data, error);

};
  
  export default GetData;