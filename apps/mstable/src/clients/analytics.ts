import Plausible from 'plausible-tracker';

export const plausible = Plausible({
  domain: 'yield.mstable.org',
});

export const registerPlausible = () => {
  plausible.enableAutoPageviews();
  // this breaks all external links by attaching an event listener to all a tags
  // TODO needs a cleanup function
  // plausible.enableAutoOutboundTracking();
};
