'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const style = {
  title: 'mx-4 text-sm font-semibold tracking-wide',
  section: 'font-bold mb-4 pl-6 text-slate-500/80 uppercase text-xs tracking-widest',
  link: 'flex items-center justify-start my-1 p-3.5 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-500 rounded-xl transition-all duration-200 group',
  active: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border-l-4 border-amber-500 rounded-l-none',
};

export function SidebarItems() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('owner');

  const menu = isAdmin 
    ? [
        {
          section: 'Admin Panel',
          content: [
            {
              title: 'Dashboard',
              icon: (
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
              ),
              link: '/admin/dashboard',
            },
            {
              title: 'Bookings',
              icon: (
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              link: '/admin/bookings',
            },
            {
              title: 'Documents',
              icon: (
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              link: '/admin/documents',
            },
            {
              title: 'Clients & Users',
              icon: (
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              link: '/admin/users',
            },
          ],
        },
      ]
    : [
        {
          section: 'Client Portal',
          content: [
            {
              title: 'Dashboard',
              icon: (
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              link: '/dashboard',
            },
          ],
        },
      ];

  return (
    <ul className="mt-8 space-y-6 pl-0">
      {menu.map(({ section, content }) => (
        <li key={section}>
          <div className="mb-4">
            <div className={style.section}>{section}</div>
            <div className="space-y-1">
              {content.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link href={item.link} key={item.title} className="block">
                    <span className={`${style.link} ${isActive ? style.active : ''}`}>
                      <span className={isActive ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-500'}>
                        {item.icon}
                      </span>
                      <span className={style.title}>{item.title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
