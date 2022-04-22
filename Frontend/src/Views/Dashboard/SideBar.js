import { AiOutlineUser } from 'react-icons/ai';
import { MdDashboard, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <section className="border-r-2 w-10% h-screen px-4 flex flex-col items-center">
      <Link to={'/'} className="hidden lg:inline">
        <span className="text-yellow text-2xl font-marker">Chromato</span>
      </Link>
      <div className="flex flex-col gap-y-12 justify-center items-center mt-24 lg:mt-16">
        <Link to={'/dashboard'}>
          <MdDashboard className="cursor-pointer" size={24} />
        </Link>

        <Link to="/item-management" data-tooltip="Manage Items">
          <MdOutlineProductionQuantityLimits
            className="cursor-pointer"
            size={24}
          />
        </Link>
        <Link to="/user-management" data-tooltip="Manage Users">
          <AiOutlineUser className="cursor-pointer" size={24} />
        </Link>
      </div>
    </section>
  );
}
