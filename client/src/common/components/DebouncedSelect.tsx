import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";

type Props = {
  inputValue: any;
  onInputChange: (value: SingleValue<any>) => void;
  debounce?: number;
} & any;

function DebouncedSelect(props: Props) {
  const { onInputChange, debounce = 1000 } = props;

  const [inputValue, setInputValue] = useState(props.inputValue);

  useEffect(() => {
    setInputValue(props.inputValue);
  }, [props.inputValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onInputChange(inputValue), debounce);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Select {...props} inputValue={inputValue} onInputChange={setInputValue} />
  )
}

export default DebouncedSelect;