import { BurnForm } from '../components/BurnForm';
import { Hero } from '../components/Hero';
import { Provider } from '../state';

export const Burn = () => {
  return (
    <Provider>
      <Hero my={4} />
      <BurnForm my={4} />
    </Provider>
  );
};
