import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaMemory, FaMedapps, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import styles from '../components/LeftTab.module.css';

const routes = [
  {
    path: "/orders",
    name: "Order",
    icon: <FaHome />
  },
  {
    path: "/menus",
    name: "Menu",
    icon: <FaMemory />
  },
  {
    path: "/addons",
    name: "Addon",
    icon: <FaMedapps />
  },
];

export default function LeftTab() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={styles.sidebar}
      >
        <div className={styles.top_section}>
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={styles.logo}
              >
                FoodShop
              </motion.h1>
            )}
          </AnimatePresence>

          <div className={styles.bars}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        <section className={styles.routes}>
          {routes.map((route) => (
            <Link
              activeClassName={styles.active}
              href={route.path}
              key={route.name}
              className={styles.link}
            >
              <div className={styles.icon}>{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className={styles.link_text}
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </section>
      </motion.div>
    </div>
  );
}
