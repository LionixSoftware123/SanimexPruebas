import React, { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/solid';
import Facebook from '@/images/icon-facebook-login.svg';
import CopyLink from '@/images/copy_link.svg';
import Email from '@/images/email-share.svg';
import Twitter from '@/images/Twitter.svg';
import Linkedin from '@/images/linkeIn.svg';
import Whatsapp from '@/images/whatsapp.svg';
import XMarkIcon from '@/images/crossClose.svg';
import { useRouter } from 'next/router';
import { FRONTEND_ENDPOINT } from '@/utils/constants';

type SharedProps = {
  title?: string;
  url?: string;
};
const ButtonShared: React.FC<SharedProps> = ({ title = '', url }) => {
  const [openButton, setOpenButton] = useState(false);
  const router = useRouter();
  const animalUrl = url || `${FRONTEND_ENDPOINT}${router.asPath}`;
  const handleLinkShare = () => {
    navigator.clipboard
      .writeText(animalUrl)
      .then(() => {
        window.alert('Link copiado correctamente');
      })
      .catch(() => {
        window.alert('¡Ops! el link no fue copiado correctamente');
      });
  };

  const handleMailTo = () => {
    window.open(`mailto:?subject=${title}&body=${animalUrl}`);
  };

  const handleShareTwitter = () => {
    const twiterUrl = `//twitter.com/intent/tweet?text=${title}&url=${animalUrl}&via=pajaropolitico`;
    const options = 'status=1,width=520,height=400,top=auto,left=auto';
    window.open(twiterUrl, 'twitter', options);
    return false;
  };

  const handleWhatsApp = () => {
    const linkedlnUrl = `https://api.whatsapp.com/send?text=${animalUrl}`;
    window.open(linkedlnUrl);
  };
  const linkedlnShare = () => {
    const linkedlnUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${animalUrl}`;
    window.open(linkedlnUrl);
  };

  const facebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${animalUrl}`;
    window.open(fbUrl);
  };

  return (
    <div className="font-Century-Gothic relative overflow-visible">
      <button
        id="tooltip"
        onClick={() => setOpenButton(!openButton)}
        className="relative flex items-center justify-center text-[14.4px] font-Inter-Regular w-[50px]"
      >
        <span id="tooltipText">Compartir</span>

        <ShareIcon
          className={
            `${!openButton ? '' : 'hidden'}` + ' h-[20px] w-[20px] mr-1 '
          }
        />
        <XMarkIcon
          className={
            `${!openButton ? 'hidden' : ''}` + ' h-[14px] w-[14px] mr-1'
          }
        />
      </button>
      <div
        className={`${
          openButton ? '' : 'hidden'
        } absolute top-[20px] left-[-180px] bg-white w-[220px] border border-[#E6E6E6] rounded-[3px] py-[10px] px-[15px] z-10`}
      >
        <div>
          <div className="font-bold pt-[10px] text-[19px]">Compartir</div>
          <div className="border-b border-[#E6E6E6] py-[10px]">
            <button
              onClick={() => handleLinkShare()}
              className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center"
            >
              <div className=" bg-[#1C355E] group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full text-white border border-[#E6E6E6]">
                <CopyLink />
              </div>
              <p className="flex self-center text-[13px]">Copiar enlace</p>
            </button>
          </div>
          <div className="border-b border-[#E6E6E6] py-[10px]">
            <button
              onClick={() => handleMailTo()}
              className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center"
            >
              <div className="text-white group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full bg-[#1C355E] border border-[#E6E6E6]">
                <Email />
              </div>
              <p className="flex self-center text-[13px]">Correo</p>
            </button>
          </div>
          <div
            onClick={() => facebookShare()}
            className="border-b border-[#E6E6E6] py-[10px]"
          >
            <button className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center">
              <div className="text-primary group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full bg-[#1C355E] border border-[#E6E6E6]">
                <Facebook className={'mr-[3px]'} />
              </div>
              <p className="flex self-center text-[13px]">Facebook</p>
            </button>
          </div>
          <div className="border-b border-[#E6E6E6] py-[10px]">
            <button
              onClick={() => handleShareTwitter()}
              className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center"
            >
              <div className=" text-white group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full bg-[#1C355E] border border-[#E6E6E6]">
                <Twitter className={'ml-[1px]'} />
              </div>
              <p className="flex self-center text-[13px]">Twitter</p>
            </button>
          </div>
          <div className="border-b border-[#E6E6E6] py-[10px]">
            <button
              onClick={() => linkedlnShare()}
              className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center"
            >
              <div className="text-[#1C355E] group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full bg-[#1C355E] border border-[#E6E6E6]">
                <Linkedin />
              </div>
              <p className="flex self-center text-[13px]">Linkedin</p>
            </button>
          </div>
          <div className="py-[10px]">
            <button
              onClick={() => handleWhatsApp()}
              className="group flex space-x-[10px] hover:text-[#0033A1] place-items-center"
            >
              <div className="text-primary group-hover:bg-[#0033A1]  w-[28px] h-[28px] flex justify-center place-items-center rounded-full bg-[#1C355E] border border-[#E6E6E6]">
                <Whatsapp className={'ml-[2px]'} />
              </div>
              <p className="flex self-center text-[13px]">Whatsapp</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ButtonShared;
