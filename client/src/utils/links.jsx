import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { GiDogHouse } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';

const links = [
  {
    text: 'puppies',
    path: '.',
    icon: <FaDog />,
    adminOnly: true
  },
  {
    text: 'litters',
    path: 'litters',
    icon: <GiDogHouse />,
    adminOnly: true
  },
  {
    text: 'clients',
    path: 'clients',
    icon: <BsPeople />,
    adminOnly: true
  },
  {
    text: 'add client',
    path: 'client-add',
    icon: <BsPeople />,
    adminOnly: true
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
    adminOnly: true
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
    adminOnly: false
  }
];

export default links;
