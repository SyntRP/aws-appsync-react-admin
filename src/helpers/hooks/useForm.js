import { useState } from "react";
const useForm = (initialFormValues) => {
  const [values, setValues] = useState(initialFormValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCheckBoxToggle = (e) => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
  };
  const handleRadioButtonChange = (e, newValue) => {
    const { name } = e.target;
    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const handleAutoCompleteChange = (value, name1, name2) => {
    if (value)
      setValues({
        ...values,
        [name1]: value?.id,
        [name2]: value,
      });
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleCheckBoxToggle,
    handleRadioButtonChange,
    handleAutoCompleteChange,
  };
};
export default useForm;
