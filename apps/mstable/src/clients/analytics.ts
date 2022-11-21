import Plausible from 'plausible-tracker';

export const plausible = Plausible({
  domain: 'yield.mstable.org',
});

export const registerPlausible = () => {
  plausible.enableAutoPageviews();
  plausible.enableAutoOutboundTracking();
};
