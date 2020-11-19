import React from "react";
import useI18n from "@paprika/l10n/lib/useI18n";
import { filter } from "./helpers";

function prepareDataDictionary(key, data) {
  const dictionary = {};

  data.forEach(d => {
    dictionary[d[key]] = d;
  });

  return dictionary;
}

export default function useListBoxWithTags(
  key,
  { defaultData = [], defaultFilteredData = [], defaultSelectedKeys = [], filterAttribute = "label" }
) {
  if (!key)
    throw new Error("Key is Required for useListBoxWithTags and should be one of the key (string) in your object");

  const [data, setData] = React.useState(defaultData);
  const { t } = useI18n();
  const [selectedKeys, setSelectedKeys] = React.useState(defaultSelectedKeys);
  const [filteredData, setFilteredData] = React.useState(defaultFilteredData);

  const dataDictionary = React.useMemo(() => {
    return prepareDataDictionary(key, data);
  }, [data, key]);

  function handleChange(option, options, selectedOption) {
    setSelectedKeys(prev => {
      const prevClone = prev.slice(0);
      const id = options[selectedOption].content.props[key];
      if (prev.includes(id)) {
        prev.splice(prevClone.indexOf(id), 1);
        return prev;
      }

      return [...new Set(prevClone.concat([id]))];
    });

    setFilteredData(defaultData);
  }

  function getSelectedOptions() {
    if (selectedKeys.length) {
      const options = [];
      selectedKeys.forEach(key => {
        options.push(dataDictionary[key]);
      });

      return options;
    }

    return [];
  }

  function handleRemove(option) {
    const index = selectedKeys.indexOf(option[key]);
    if (index >= 0) {
      setSelectedKeys(prev => {
        const clone = prev.slice(0);
        clone.splice(index, 1);
        return clone;
      });
    }
  }

  function isSelected(id) {
    return selectedKeys.includes(id);
  }

  const handleAddedOption = (func = label => ({ label, isCustom: true })) => label => {
    // useReducer might be a better alternative

    const option = func(label);
    setData(prev => {
      return prev.concat(option);
    });

    setSelectedKeys(prev => {
      return prev.concat(option[key]);
    });

    setData(prevData => {
      return prevData.concat(option);
    });

    setFilteredData(defaultData);
  };

  function handleFilter({ search }) {
    setFilteredData(filter(search, data, filterAttribute));
  }

  return {
    data,
    filteredData,
    selectedKeys,
    setSelectedKeys,
    handleChange,
    handleFilter,
    isSelected,
    handleRemove,
    handleAddedOption,
    getSelectedOptions,
    // divider
    filter: handleFilter,
    noResultsMessage: t("listBoxWithTags.no_results_found"),
    onChange: handleChange,
    onCustomOption: handleAddedOption,
    onRemove: handleRemove,
  };
}
