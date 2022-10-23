import { createContext, useState, useContext, ReactNode } from 'react';

import { Form as BSForm } from 'reactstrap';

type FormContextType = {
  values: Record<string, unknown>;
  setFieldValue: (field: string, value: unknown) => void;
};
const FormContext = createContext<FormContextType | null>(null);

type UseField = [value: unknown, setValue: (value: unknown) => void];
export const useField = (field: string): UseField => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useField must be used within a Form');
  }

  const value = context.values[field];
  const setValue = (value: unknown) => context.setFieldValue(field, value);

  return [value, setValue];
};

type Props = {
  defaultValues: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  children: ReactNode;
};

const Form = ({ defaultValues, onSubmit, children }: Props) => {
  const [values, setValues] = useState(defaultValues);

  const setFieldValue = (field: string, value: unknown) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  return (
    <FormContext.Provider
      value={{
        values,
        setFieldValue,
      }}
    >
      <BSForm
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(values);
        }}
      >
        {children}
      </BSForm>
    </FormContext.Provider>
  );
};

export default Form;
