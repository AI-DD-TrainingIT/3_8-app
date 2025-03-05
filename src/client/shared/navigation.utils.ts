import { AssetsAddPage } from "@/client/app/assets/assets-add.page";
import { AssetsPage } from "@/client/app/assets/assets.page";
import { AuthPage } from "@/client/app/auth/auth.page";
import { HomePage } from "@/client/app/home/home.page";
import { ToolsPage } from "@/client/app/tools/tools.page";

customElements.define("app-tools-page", ToolsPage);
customElements.define("app-home-page", HomePage);
customElements.define("app-auth-page", AuthPage);
customElements.define("app-assets-page", AssetsPage);
customElements.define("app-assets-add-page", AssetsAddPage);

export const navigate = (path: string | null) => {
	const pageComponent = path
		? path.replace("#", "").replace(/\//g, "-")
		: "home";
	const pageSelector = `<app-${pageComponent}-page></app-${pageComponent}-page>`;
	const routerOutlet = document.getElementById("router-outlet");
	if (!routerOutlet) return;
	routerOutlet.innerHTML = pageSelector;
};
