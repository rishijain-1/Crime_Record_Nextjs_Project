"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const activeLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();


  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: locale})
    });
  };

  return (
    <label className="relative block border-2 rounded-lg border-white">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={activeLocale}
        className="block w-full appearance-none bg-gray-800 text-white py-2 pl-3 pr-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-700 transition-colors"
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
      {/* Dropdown arrow */}
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </label>
  );
}
