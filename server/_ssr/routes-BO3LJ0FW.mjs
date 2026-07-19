import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-BqoqJNkg.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useDesignLogos, t as getCachedDesignLogosSync } from "./useDesignLogos-CZgCCNKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BO3LJ0FW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteNaVeiaLogo({ variant = "light", className = "h-8", style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full items-center justify-center text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/__l5e/assets-v1/1fd3a225-8a60-432b-ae11-987226535a4b/cliente-na-veia.png",
			alt: "Cliente na Veia",
			className,
			style: {
				display: "block",
				maxHeight: "100%",
				width: "auto",
				margin: "0 auto",
				objectFit: "contain",
				...style
			},
			referrerPolicy: "no-referrer"
		})
	});
}
function LoadingScreen({ message = "Carregando o ambiente..." }) {
	const { data: logosQuery } = useDesignLogos();
	const cachedLogos = getCachedDesignLogosSync();
	const logos = logosQuery || cachedLogos;
	const customLoadingLogo = logos?.loading_logo;
	const loadingSize = logos?.loading_logo_size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vibra-loading-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vibra-grid-layer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vibra-loading-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vibra-pulse vibra-loading-logo-wrap",
					children: customLoadingLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: customLoadingLogo,
						alt: "Logo Carregando",
						className: loadingSize ? "" : "h-12 w-auto object-contain",
						style: loadingSize ? {
							height: `${loadingSize}px`,
							width: "auto",
							objectFit: "contain"
						} : void 0,
						referrerPolicy: "no-referrer"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteNaVeiaLogo, { className: "h-12 w-auto" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vibra-loading-track",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vibra-loading-bar" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "vibra-loading-message",
					children: message
				})
			]
		})]
	});
}
function Gate() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const t = setTimeout(async () => {
			const { data } = await supabase.auth.getSession();
			navigate({
				to: data.session ? "/executivo" : "/auth",
				replace: true
			});
		}, 600);
		return () => clearTimeout(t);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
}
//#endregion
export { Gate as component };
