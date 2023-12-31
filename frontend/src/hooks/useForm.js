import { useState } from "react";

function useForm (initialState) {
  const [form, setForm] = useState(initialState);
  /*const [errors, setErrors] = useState({});*/

  const handleChange = (evt) => {
    const input = evt.target;

    /*setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });*/

    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  return { form, /*errors, */handleChange };
};

export default useForm;