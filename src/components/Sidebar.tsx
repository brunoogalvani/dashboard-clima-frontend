import { useState } from "react";
import { Home, Cloud, Wind, Flame, Map, Menu, X } from "lucide-react";

interface SidebarProps {
  onSelect: (page: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const links = [
    { icon: Home, label: "Dashboard" },
    { icon: Cloud, label: "Clima" },
    { icon: Wind, label: "Qualidade do Ar" },
    { icon: Flame, label: "Incêndios" },
    { icon: Map, label: "Mapa" },
  ];

  return (
    <div
      className={`${open ? "w-64" : "w-20"} h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-cyan-800 text-white flex flex-col transition-all duration-500 hover:scale-[1.01] hover:brightness-110 hover:shadow-emerald-500/20 ease-in-out shadow-[0_0_25px_-5px_rgba(0,0,0,0.4)] backdrop-blur-md border-r border-emerald-500/20`}
    >
      {/* Header + Toggle */}
      <div className={`${open? "border-b border-white/10" : ""} flex flex-col items-center py-5 relative`}>
        <button
          onClick={() => setOpen(!open)}
          className={`${open ? "right-1" : ""} absolute top-3 p-2 rounded-lg bg-transparent hover:bg-white/10 transition-all text-white focus:outline-none focus:ring-0`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {open && (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <h1 className="text-lg font-semibold tracking-wide select-none">PIMA</h1>
          </div>
        )}
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-1 mt-6 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.label;

          return (
            <button
              key={link.label}
              onClick={() => {
                setActive(link.label);
                onSelect(link.label);
              }}
              className={`group flex items-center gap-4 rounded-xl p-3 relative w-full text-left overflow-hidden transition-all duration-300 focus:outline-none focus:ring-0 ${isActive ? "bg-gradient-to-r from-emerald-600/40 to-cyan-600/30 text-white shadow-lg shadow-emerald-900/40" : "hover:bg-white/10 text-white/80 hover:text-white"}`}
            >
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              )}

              <div
                className={`flex items-center justify-center rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-400/25 p-2 shadow-inner shadow-emerald-700/30"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                <Icon size={20} />
              </div>

              {open && (
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" : "text-gray-200"
                  }`}
                >
                  {link.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="mt-auto mb-5 px-4 text-center text-[11px] text-white/60 select-none border-t border-white/10 pt-3">
        {open ? (
          <>
            <p>© {new Date().getFullYear()} PIMA</p>
            <p className="italic text-white/50">TESTEEEE</p>
          </>
        ) : (
          <p className="text-xs">©</p>
        )}
      </div>
    </div>
  );
}
