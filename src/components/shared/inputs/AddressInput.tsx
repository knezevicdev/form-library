import { useEffect, useState, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import cities from '../../../data/cities.json';

const getCityStreets = (cityName: string) => {
  return (cities as any)[cityName] || [];
};

const getStreetValueByLabel = (streets: any[], label: string) => {
  const street = streets.find((street) => street.name === label);
  if (!street) return [];

  return [street];
};

type Props = {
  city: string;
  value: string;
  name: string;
  onChange?: (value: string) => void;
};
const AddressInput = ({ city, value, name, onChange, ...props }: Props) => {
  const [streets, setStreets] = useState(getCityStreets(city));
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
