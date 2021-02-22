import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { baseURL } from "../config/constant";

export function MakeAPICall(props) {
  const makeRequest = (
    reqType,
    reqURL,
    dataObj,
    params,
    headers,
    successCallback,
    failureCallback
  ) => {
    axios({
      method: reqType,
      url: reqURL,
      baseURL: baseURL,
      headers: headers,
      data: dataObj,
      params: params,
      timeout: 60000,
      onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        // console.log("API call on process");
      },
      onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        // console.log("API call on Download process");
      },
    })
      .then((res) => {
        successCallback(res.data);
      })
      .catch((err) => {
        failureCallback(err.response);
      });
  };

  // Handle API Param on Change
  useEffect(() => {
    if (props.apiParam)
      makeRequest(
        props.apiParam.reqType,
        props.apiParam.reqURL,
        props.apiParam.dataObj,
        props.apiParam.params,
        props.apiParam.headers,
        props.apiParam.successCallback,
        props.apiParam.failureCallback
      );
  }, [props.apiParam]);

  return <Fragment></Fragment>;
}

export default MakeAPICall;
