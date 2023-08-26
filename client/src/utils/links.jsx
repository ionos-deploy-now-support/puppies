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
  },
  {
    text: 'litters',
    path: 'litters',
    icon: <GiDogHouse />,
  },
  {
    text: 'clients',
    path: 'clients',
    icon: <BsPeople />,
  },
  {
    text: 'add client',
    path: 'client-add',
    icon: <BsPeople />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default links;
