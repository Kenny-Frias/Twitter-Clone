import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';
//component for header of app. Interface is the structure for the back arrow and label.
//Completing the header this way makes it reuseable. In the index file, you can add a 
//header tag and whatever is added will appear in the header section.  
interface HeaderProps {
    showBackArrow?: boolean;
    label: string;
  }


  const Header: React.FC<HeaderProps> = ({label, showBackArrow }) => {
    const router = useRouter();
    const handleBack = useCallback(() => {
        router.back();
      }, [router]);


      return (
        <div className="border-b-[1px] border-neutral-800 p-5">
          <div className="flex flex-row items-center gap-2">
            {showBackArrow && (
              <BiArrowBack 
                onClick={handleBack} 
                color="white" 
                size={20} 
                className="
                  cursor-pointer 
                  hover:opacity-70 
                  transition
              "/>
            )}
            <h1 className="text-white text-xl font-semibold">
                {/* pass label child as content */}
              {label}
            </h1>
          </div>
        </div>
      );
    }
    
    export default Header;