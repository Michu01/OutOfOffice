import React, { useEffect, useState } from "react";

type Props = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

function DebouncedInput(props: Props) {
  const { onChange, debounce = 1000 } = props;

  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} className="form-control" value={value} onChange={e => setValue(e.target.value)} />;
}

export default DebouncedInput;