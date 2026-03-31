"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { CSSProperties } from "react";

type MenuId = "products" | "solutions" | "developers" | "company";

type MenuSection = {
  title: string;
  items: string[];
};

type MenuItem = {
  id: MenuId;
  label: string;
};

const MENU_ITEMS: MenuItem[] = [
  { id: "products", label: "Products" },
  { id: "solutions", label: "Solutions" },
  { id: "developers", label: "Developers" },
  { id: "company", label: "Company" },
];

const MENU_CONTENT: Record<MenuId, MenuSection[]> = {
  products: [
    {
      title: "Platform",
      items: ["Animation Engine", "Layout System", "Gesture Control", "Scroll Effects"],
    },
    { title: "Components", items: ["Accordion", "Tabs", "Dialog", "Tooltip"] },
    { title: "Tools", items: ["DevTools", "Inspector", "Performance"] },
  ],
  solutions: [
    { title: "By Team", items: ["Enterprise", "Startup", "Agency", "Freelancer"] },
    { title: "Use Cases", items: ["Web Apps", "E-commerce", "Marketing", "Documentation"] },
    { title: "Resources", items: ["Case Studies", "Templates", "Integrations"] },
  ],
  developers: [
    { title: "Get Started", items: ["Quick Start", "Installation", "Migration", "Examples"] },
    { title: "Reference", items: ["API Docs", "Components", "Hooks", "Utilities"] },
    { title: "Community", items: ["Discord", "GitHub", "Stack Overflow", "Blog"] },
  ],
  company: [
    { title: "About", items: ["Our Story", "Team", "Careers", "Press"] },
    { title: "Connect", items: ["Contact", "Partners", "Events"] },
    { title: "Legal", items: ["Privacy", "Terms", "Security"] },
  ],
};

const STYLE: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#121b1c",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 40,
  },
  wrap: {
    position: "relative",
    width: 560,
    maxWidth: "calc(100vw - 32px)",
    paddingBottom: 8,
  },
  nav: {
    display: "flex",
    gap: 2,
    padding: 6,
    backgroundColor: "#0e1616",
    border: "1px solid #1d2628",
    borderRadius: 12,
  },
  navButton: {
    position: "relative",
    flex: 1,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Inter, system-ui, sans-serif",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "color 0.2s",
    color: "#898d8e",
  },
  navButtonLabel: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    inset: 2,
    borderRadius: 8,
    backgroundColor: "rgba(131, 230, 247, 0.06)",
  },
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#0e1616",
    border: "1px solid #1d2628",
    borderRadius: 12,
    padding: 24,
    transformOrigin: "top center",
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
  },
  panelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  columnHeading: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#898d8e",
    padding: "0 10px 12px",
  },
  rowLink: {
    fontSize: 14,
    color: "#fff",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default function HomePage() {
  const [activeId, setActiveId] = useState<MenuId | null>(null);
  const [direction, setDirection] = useState(0);

  return (
    <div style={STYLE.page}>
      <div
        style={STYLE.wrap}
        onMouseLeave={() => {
          setDirection(0);
          setActiveId(null);
        }}
      >
        <nav style={STYLE.nav}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => {
                if (activeId !== null && activeId !== item.id) {
                  const prevIndex = MENU_ITEMS.findIndex((entry) => entry.id === activeId);
                  setDirection(
                    MENU_ITEMS.findIndex((entry) => entry.id === item.id) > prevIndex ? 1 : -1,
                  );
                } else {
                  setDirection(0);
                }
                setActiveId(item.id);
              }}
              style={{
                ...STYLE.navButton,
                color: activeId === item.id ? "#fff" : "#898d8e",
              }}
            >
              {activeId === item.id ? (
                <motion.div
                  layoutId="indicator"
                  style={STYLE.indicator}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              ) : null}
              <span style={STYLE.navButtonLabel}>
                {item.label}
                <motion.svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  style={{ marginLeft: 6 }}
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </button>
          ))}
        </nav>

        <AnimatePresence>
          {activeId ? (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 500, damping: 35 },
              }}
              exit={{
                opacity: 0,
                y: -8,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              style={STYLE.panel}
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeId}
                  custom={direction}
                  variants={{
                    enter: (customDirection: number) => ({
                      opacity: 0,
                      x: customDirection ? customDirection * 40 : 0,
                    }),
                    center: { opacity: 1, x: 0 },
                    exit: (customDirection: number) => ({
                      opacity: 0,
                      x: customDirection ? -(customDirection * 40) : 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={STYLE.panelGrid}
                >
                  {MENU_CONTENT[activeId].map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: direction ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        delay: index * 0.04,
                      }}
                    >
                      <div style={STYLE.columnHeading}>{section.title}</div>
                      {section.items.map((entry) => (
                        <div key={entry} className="mega-menu-link" style={STYLE.rowLink}>
                          {entry}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <style>{`
        .mega-menu-link {
          transition: background-color 0.15s;
        }
        .mega-menu-link:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
