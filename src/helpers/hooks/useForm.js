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
  return {
    values,
    setValues,
    handleInputChange,
    handleCheckBoxToggle,
  };
};
export default useForm;
