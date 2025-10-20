"use client";

import { ReactNode, useEffect } from "react";
import useJsonStore from "../../json/stores/jsonStore";
import useQueryStore from "../../query/stores/queryStore";
import useStorage from "../hooks/useStorage";
import fakeData from "../framework/fakeData";
import { masterQuery } from "../framework/query";
import Skeleton from "react-loading-skeleton";

const StoreInitializer = ({ children }: { children: ReactNode }) => {
  const {
    setJson,
    loading: loadingJsonStore,
    setLoading: setLoadingJsonStore,
    refreshPreviousJson,
  } = useJsonStore();
  const {
    setQueryText,
    loading: loadingQueryStore,
    setLoading: setLoadingQueryStore,
    refreshPreviousQueryText,
  } = useQueryStore();

  const {
    value: savedQuery,
    error: queryError,
    isLoading: loadingSavedQuery,
  } = useStorage("queryText");
  const {
    value: savedJson,
    error: jsonError,
    isLoading: loadingSavedJson,
  } = useStorage("recipesJson");

  const loading =
    loadingJsonStore ||
    loadingQueryStore ||
    loadingSavedJson ||
    loadingSavedQuery;
  const error = jsonError || queryError;

  useEffect(() => {
    if (loadingSavedJson || loadingSavedJson) return;
    if (!loading) return;
    setJson(savedJson ?? fakeData);
    setQueryText(savedQuery ?? masterQuery);
    refreshPreviousJson();
    refreshPreviousQueryText();
    setLoadingJsonStore(false);
    setLoadingQueryStore(false);
  }, [loading, loadingJsonStore, loadingQueryStore, loadingSavedJson, refreshPreviousJson, refreshPreviousQueryText, savedJson, savedQuery, setJson, setLoadingJsonStore, setLoadingQueryStore, setQueryText]);

  if (error) {
    throw new Error("Error occurred initializing stores.");
  }

  if (loading) {
    return <Skeleton height={500} />;
  }

  return children;
};

export default StoreInitializer;
