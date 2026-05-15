import i18n from "@/i18n";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const currentLang = i18n.language.startsWith("id") ? "ID" : "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border shadow-sm outline-none hover:bg-white transition-colors text-sm font-medium text-slate-700">
        <Globe className="w-4 h-4 text-slate-500" />
        {currentLang}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl min-w-[150px]">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")} className="cursor-pointer">
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("id")} className="cursor-pointer">
          Bahasa Indonesia (ID)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
