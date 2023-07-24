import Link from 'next/link';
import { BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import { signOut, useSession } from 'next-auth/react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';


const Sidebar = ({  }) => {
  const { data: session } = useSession();
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Profile',
      href: '/',
      icon: FaUser,
      
    },
    // {
    //   label: "Exit",
    //   href: '/SignInPage',
    //   icon: BiLogOut

    // }
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            // Use passHref to pass the href to the SidebarItem component
            <Link href={item.href} passHref key={item.href}>
              <SidebarItem label={item.label} icon={item.icon} />
            </Link>
          ))}
          {/*logout button displayed if there is a session availble*/}
          {session ? (
            <button onClick={signOut}>
            <SidebarItem onClick={signOut} icon={BiLogOut} label="Logout" />
          </button>
          ): null}
          
          
          <SidebarTweetButton />
          {/* displays authenticated user information. If there is not a session, user info not displayed.  */}
         {session ? (
            <div
            className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
              >
              
            <img
              src={session.user.image}
              alt=""
              className="h-10 w-10 rounded-full xl:mr-2.5"
            />
            <div className="hidden xl:inline leading-5">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-[#6e767d]">@{session.user.tag}</p>
            </div>
            <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
          </div>
         ): null}
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
