import { ChangeEvent, ElementType, ReactNode } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { useField } from './Form';

type Props = {
  as: ElementType;
  inputProps: Record<string, unknown>;
  children?: ReactNode;
  name: string;
  label?: string;
};

const Field = ({
  as: Component,
  inputProps: { ...inputProps },
  children,
  name,
  label,
}: Props) => {
  const [value, setValue] = useField(name);
  const onChange = (
    eventOrValue: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (typeof eventOrValue === 'string') {
      setValue(eventOrValue);
      return;
    }

    setValue(eventOrValue.target.value);
  };

  return (
    <FormGroup className="mb-3">
      {label && <Label>{label}</Label>}
      <Component onChange={onChange} value={value} name={name} {...inputProps}>
        {children}
      </Component>
    </FormGroup>
  );
};

export default Field;
