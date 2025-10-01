import { useEffect, useState } from 'react';

export enum HTMLPositionEnum {
  Head = 'HEAD',
  Body = 'BODY',
  Footer = 'FOOTER',
}

type UseScriptProps = {
  src?: string;
  delay?: number;
  scriptContent?: string;
  scriptId?: string;
  position?: HTMLPositionEnum;
  isLoading?: boolean;
  type?: string;
};
const useScript = ({
  src = '',
  delay = 10,
  scriptContent = '',
  position = HTMLPositionEnum.Head,
  scriptId = '',
  isLoading = true,
  type = '',
}: UseScriptProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`,
    );

    let timeout: null | ReturnType<typeof setTimeout> = null;

    if (!script && isLoading) {
      if (delay) {
        timeout = setTimeout(() => {
          injectScript();
          //console.log('ejecuto', scriptId);
          // Add event listener after the script is added
        }, delay);
      }
    }

    //code to inject script
    function injectScript() {
      script = document.createElement('script');
      if (src) {
        script.src = src as string;
      }
      if (scriptId) {
        const scriptDouble = document.getElementById(scriptId);
        if (scriptDouble) scriptDouble.remove();
        script.id = scriptId;
      }
      script.async = true;
      if (type) {
        script.type = type;
      }
      script.appendChild(document.createTextNode(scriptContent));
      if (position === HTMLPositionEnum.Head) document.head.appendChild(script);
      else document.body.appendChild(script);
      setLoaded(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay, position, scriptContent, src, scriptId, isLoading, type]);

  return {
    loaded,
  };
};

export default useScript;
