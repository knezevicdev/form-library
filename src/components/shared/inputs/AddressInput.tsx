import { useEffect, useState, useRef, FC, ComponentProps } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import cities from '../../../data/cities.json';

type Street = typeof cities[keyof typeof cities][number];

const getCityStreets = (cityName: keyof typeof cities) => {
  return cities[cityName] || [];
};

const getStreetValueByLabel = (streets: Street[], label: string) => {
  const street = streets.find((street) => street.name === label);
  if (!street) return [];

  return [street];
};

type Props = Omit<
  ComponentProps<typeof Typeahead>,
  'options' | 'defaultSelected' | 'selected' | 'onChange'
> & {
  city: keyof typeof cities;
  value: string;
  name: string;
  onChange?: (value: string) => void;
};
const AddressInput: FC<Props> = ({ city, value, name, onChange, ...props }: Props) => {
  const [streets, setStreets] = useState<Street[]>(getCityStreets(city));
  const defaultSelectedStreet = useRef(getStreetValueByLabel(streets, value));
  const thRef = useRef(null);

  useEffect(() => {
    setStreets(getCityStreets(city));
  }, [city]);

  return (
    <Typeahead
      ref={thRef}
      id={name}
      labelKey="name"
      onChange={(street) => onChange?.(street.length ? (street[0] as any).name : '')}
      onBlur={() => {
        if (value) return;

        const valueFromInput = getStreetValueByLabel(
          streets,
          (thRef.current as any)?.state.text
        );
        valueFromInput.length
          ? onChange?.(valueFromInput[0].name)
          : (thRef.current as any)?.clear?.();
      }}
      options={streets}
      defaultSelected={defaultSelectedStreet.current}
      {...props}
    />
  );
};

export default AddressInput;
