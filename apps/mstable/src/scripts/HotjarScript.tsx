import { useEffectOnce } from 'react-use';

import type { FC } from 'react';

export const HotjarScript: FC = () => {
  useEffectOnce(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3620820,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
    `;

    document.head.appendChild(script);
  });

  return null;
};
