// src/app/components/dashboard/NavigationBar.js
'use client';

import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth, useOrganization } from '@clerk/nextjs';

export default function NavigationBar({ activeRoute, onNavigate }) {
  const { membership } = useOrganization();
  const [navItems, setNavItems] = useState([
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
    },
    {
      id: 'scope-builder',
      label: 'Scope Builder',
      icon: '📄',
    },
    {
      id: 'productions',
      label: 'Productions',
      icon: '🎬',
    },
    {
      id: 'merchandise',
      label: 'Merchandise',
      icon: '🛍️',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ]);

  // Check if the user has admin privileges
  const hasAdminRole =
    membership?.role === 'org:admin' ||
    membership?.role === 'org:owner' ||
    membership?.role === 'admin' ||
    membership?.role === 'owner';

  // Update nav items based on admin status
  useEffect(() => {
    console.log('Admin role check in NavigationBar:', {
      membershipRole: membership?.role,
      hasAdminRole,
    });

    if (hasAdminRole) {
      // Add admin tab if user is an admin
      setNavItems((prev) => {
        if (!prev.some((item) => item.id === 'admin')) {
          return [
            ...prev,
            {
              id: 'admin',
              label: 'Admin',
              icon: '🛡️',
            },
          ];
        }
        return prev;
      });
    } else {
      // Remove admin tab if user is not an admin
      setNavItems((prev) =>
        prev.filter((item) => item.id !== 'admin')
      );

      // If currently on admin route but lost access, redirect to home
      if (activeRoute === 'admin') {
        onNavigate('home');
      }
    }
  }, [hasAdminRole, membership?.role, activeRoute, onNavigate]);

  return (
    <div className="w-20 md:w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavItem
                id={item.id}
                label={item.label}
                icon={item.icon}
                active={activeRoute === item.id}
                onClick={() => onNavigate(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Individual navigation item component
function NavItem({ id, label, icon, active, onClick, customStyle }) {
  // Calculate styles based on active state
  const activeStyles = {
    backgroundColor:
      'rgba(var(--primary-color-rgb, 37, 99, 235), 0.1)',
    color: 'var(--primary-color, #2563EB)',
  };

  const inactiveStyles = {
    color: '#4B5563', // Gray-600
    backgroundColor: 'transparent',
  };

  const buttonStyles = active ? activeStyles : inactiveStyles;

  return (
    <div className="relative">
      {' '}
      {/* Add a parent container for positioning context */}
      {/* Active indicator - positioned absolutely relative to the parent div */}
      {active && (
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-2 bg-primary rounded-l-full"
          style={{
            backgroundColor: 'var(--primary-color, #2563EB)',
          }}
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
      <Button
        className={`w-full h-12 transition-all flex items-center ${
          active ? 'bg-opacity-10' : 'hover:bg-gray-100'
        } ${customStyle || ''}`}
        onClick={onClick}
        variant="light"
        style={buttonStyles}
      >
        <div className="flex items-center w-full">
          <div className="flex md:min-w-[24px] justify-center">
            <span className="text-xl">{icon}</span>
          </div>
          <span
            className={`hidden md:block ml-3 ${
              active ? 'font-medium' : ''
            }`}
            style={{
              color: active
                ? 'var(--primary-color, #2563EB)'
                : '#4B5563',
            }}
          >
            {label}
          </span>
        </div>
      </Button>
    </div>
  );
}
