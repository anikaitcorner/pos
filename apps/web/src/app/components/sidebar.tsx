import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TbBrandTabler } from "react-icons/tb";
import { navigation } from "./nav";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export const Sidebar: React.FC = React.memo(() => {
  const [activeSubMenu, setActiveSubmenu] = useState<number | null>(null);

  const handleSubmenu = useCallback(
    (i: number | null) => {
      if (activeSubMenu !== null) {
        if (activeSubMenu === i) {
          setActiveSubmenu(null);
        } else {
          setActiveSubmenu(i);
        }
      } else {
        setActiveSubmenu(i);
      }
    },
    [activeSubMenu]
  );

  const MotionLink = motion(Link);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarVariants = {
    initial: { width: 80, opacity: 0, x: "-300" },
    animate: {
      width: 250,
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      width: 80,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const titleVariant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={cn("px-6 border-r border-slate-700 py-4 relative")}
        variants={sidebarVariants}
        initial="initial"
        animate={isSidebarOpen ? "animate" : "exit"}
      >
        <div
          className="absolute top-1/2 -right-2 text-3xl cursor-pointer"
          onClick={() => {
            setIsSidebarOpen((prev) => !prev);
          }}
        >
          {isSidebarOpen ? <HiChevronLeft /> : <HiChevronRight />}
        </div>
        <Link to="/" className="flex gap-x-2 items-center">
          <TbBrandTabler className="text-3xl" />
          {isSidebarOpen && (
            <motion.h2
              variants={titleVariant}
              initial="initial"
              animate={isSidebarOpen ? "animate" : "exit"}
              className="font-semibold"
            >
              Codernex
            </motion.h2>
          )}
        </Link>
        <Separator className="my-2" />
        <nav>
          <ul className="space-y-4">
            {navigation.map((item, i) => {
              return (
                <div key={i}>
                  <div
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      handleSubmenu(i);
                      setIsSidebarOpen(true);
                    }}
                  >
                    <div className="flex gap-x-2">
                      <item.icon className="text-xl" />
                      {isSidebarOpen && (
                        <p className="font-semibold">{item.title}</p>
                      )}
                    </div>
                    <span>
                      {isSidebarOpen &&
                        item.submenu.length &&
                        (activeSubMenu === i ? (
                          <HiChevronDown />
                        ) : (
                          <HiChevronRight />
                        ))}
                    </span>
                  </div>

                  <AnimatePresence>
                    {item.submenu && isSidebarOpen && activeSubMenu === i ? (
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                          transition: {
                            delay: 0.1,
                            duration: 0.7,
                            ease: "easeIn",
                          },
                        }}
                        exit={{
                          transition: {
                            ease: "easeOut",
                          },
                        }}
                        className="ml-7 flex flex-col space-y-3"
                      >
                        {item.submenu.map((sub, index) => {
                          return (
                            <div className="mt-2" key={index}>
                              <Link to={sub.href}>{sub.title}</Link>
                            </div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      ""
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </ul>
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
});
