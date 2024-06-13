import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyToClipboardProps } from '../../interfaces/interfaces';

export const CopyToClipboardComponent: React.FC<CopyToClipboardProps> = ({text}) => {
  const [copySuccess, setCopySucess] = useState<boolean>(false);

  useEffect(() => {
    if(copySuccess === true) {
      setTimeout(() => {
        setCopySucess(false);
      }, 1000);
    }
  }, [copySuccess]);

  return (
    <>
      <CopyToClipboard text={':' + text + ':'} onCopy={() => setCopySucess(true)} >
        <button className="w-full py-8 font-semibold text-slate-700">{copySuccess ? 'Copied!' : 'Copy'}</button>
      </CopyToClipboard>
    </>
  );
}