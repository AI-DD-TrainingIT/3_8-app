import { renderAnchor } from "@/client/shared/dom.utils";
import { navigate } from "@/client/shared/navigation.utils";
import { ThemeToggle } from "./toggle-theme.component";

const html = String.raw;
customElements.define("app-theme-toggle", ThemeToggle);

/**
 * A semantic header web component with navigation
 */
export class Header extends HTMLElement {
	#appName = "Full stack Blueprint";
	#links = [
		{ href: "#tools", text: "Tools" },
		{ href: "#assets", text: "My Assets" },
		{ href: "#assets/add", text: "Add Asset" },
		{ href: "#auth", text: "Auth" },
	];
	#template = html`
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <a href="#home"><strong>${this.#appName}</strong></a>
          </li>
        </ul>
        <ul>
          ${this.#renderLinks()}
          <li>
            <app-theme-toggle></app-theme-toggle>
          </li>
        </ul>
      </nav>
    </header>
  `;
	constructor() {
		super();
		this.innerHTML = this.#template;
		navigate(window.location.hash);
	}

	connectedCallback() {
		const anchors = Array.from(this.querySelectorAll<HTMLAnchorElement>("a"));
		for (const anchor of anchors) {
			anchor.addEventListener("click", (event: Event) => {
				event.preventDefault();
				const href = anchor.getAttribute("href");
				navigate(href);
			});
		}
	}

	#renderLinks() {
		const links = this.#links.map(
			(link) => html`<li>${renderAnchor(link.href, link.text)}</li>`,
		);
		return links.join("");
	}
}
