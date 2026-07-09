import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handle = createMiddleware(routing);

export { handle as proxy };

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
