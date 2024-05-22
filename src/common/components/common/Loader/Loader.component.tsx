import Image from 'next/image';
import LoadingIcon from '../../../images/static/loading.svg';

interface LoaderProps {
  width?: number;
}

const Loader = ({ width }: LoaderProps) => {
  return (
    <Image
      src={LoadingIcon}
      alt="Loading Icon"
      width={width || 64}
      aria-label="Loading icon"
    />
  );
};

export default Loader;
