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
          .post(props.url, props.data)
          .then(response => {
            setIsLoaded(true);
            setData(response);
          })
          .catch(error => {
            setIsLoaded(true);
            setError({error: error.response.data});
          });
      };
      postData();
    }, [props.url, props.data]);
  
    return { data, error, isLoaded };
};

const PostData = (props) => {
    const { data, error, isLoaded } = useApiRequest({url: props.url, data: props.data});

    if (!isLoaded) {
        return <LoadingSpinner />;
    }
    props.sendResponse(data || error);

  };
  
  export default PostData;