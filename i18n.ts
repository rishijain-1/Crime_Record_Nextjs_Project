import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales=["en", "hi"];
export default getRequestConfig(async({locale})=>{
    if(!locales.includes(locale as any)) notFound();
    const messages = await import(`/messages/${locale}.json`);
    return {
        messages: messages.default,
        locale: locale,
    };
});