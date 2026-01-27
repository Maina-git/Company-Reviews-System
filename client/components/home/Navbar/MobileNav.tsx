import { navigation } from '@/constants';
import { X } from 'lucide-react';
import Link from 'next/link';

interface props{
    showNav:boolean;
    closeNav:()=>void;
}

const MobileNav = ({closeNav, showNav}:props) => {
const navOpen = showNav ? "translate-x-0":"translate-x-[-200%]";

return (
<div>
{/* overlay */}
<div className={`fixed top-0 ${navOpen} inset-0 transform  transition-all duration-500 z-[100002] bg-black
opacity-70 w-full h-screen`}></div>
{/*  nav links*/}

<div className={`text-white ${navOpen} top-0 fixed justify-center flex flex-col 
h-full transform transition-all 
duration-500 delay-300 w-[80%] sm:w-[60%] bg-gray-900 space-y-6 z-[100050]`}>
{navigation.map((item, index)=>{
        return (
            <Link key={index} href={item.href}>
                <p className="text-white w-fit text-2xl ml-12
                border-b-[1.5px] pb-2 border-white sm:text[30px]">
                    {item.name}
                </p>
            </Link>
        )
    })}
<Link href="/want to know" className="text-white w-fit text-2xl ml-12 border-b-[1.5px]
border-white sm:text-[30px]">
    <span className="text-xl font-medium whitespace-nowrap">Want to Know</span>
</Link>
{/* close icon */}
<X onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
</div>
    </div>
  );
}

export default MobileNav;
