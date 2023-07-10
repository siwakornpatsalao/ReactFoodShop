import * as React from 'react';
import {motion} from 'framer-motion';
import '../components/LeftTab.module.css'
import { NavLink } from 'react-router-dom';
import Link from 'next/link';

const routes =[
    {
        path:"/orders",
        name:"Order",
    },
    {
        path:"/menus",
        name:"Menu",
    },
    {
        path:"/addons",
        name:"Addon",
    },
]

export default function LeftTab() {
  return (
    <div className='main-container'>
        <motion.div animate={{width: "200px"}} className="sidebar">
            <section className="routes">
                {routes.map((route)=>(
                    <Link to={route.path} key={route.name}>
                        <div className='link_text'>{route.name}</div>
                    </Link>
                ))}
            </section>
        </motion.div>
    </div>
  );
}

/*
<Link href="./orders">
          <Button color="inherit">Order</Button>
        </Link>
        <Link href="./menus">
          <Button color="inherit">Menu</Button>
        </Link>
        <Link href="./addons">
          <Button color="inherit">Addon</Button>
        </Link>
*/