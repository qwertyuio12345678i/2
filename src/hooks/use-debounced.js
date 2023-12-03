import { useEffect, useState } from 'react';

export default function useDebounced(current, timeout = 500) {
  const [value, setValue] = useState(current);
  useEffect(() => {
    const id = setTimeout(() => setValue(current), 500);
    return () => clearTimeout(id);
  }, [current, timeout]);

  return value;
}
