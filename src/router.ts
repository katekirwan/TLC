import * as $ from 'jquery';
import { Route } from './route';

declare global {
    interface Window {
        applicationObject: any;
        contactObject: any;
    }
}

export class Router {

    #navigationContainer: JQuery<HTMLElement>;
    #routes: Route[];
    #rootElem: HTMLElement;

    // Content loaded from the server is cached here.
    #cachedContent: { [key: string]: string } = {};

    public constructor(routes: Route[]) {
        this.#routes = routes;
        var root = document.getElementById('app');
        if (!root) {
            throw 'error: cannot find main app element';
        }
        this.#rootElem = root;
    }

    // Builds the navigation elements.
    // Starts listening for hashchange events.
    public init(navSelector: string) {
        
        // Save the navigation container.
        const navContainer = $(navSelector);
        if (!navContainer) {
            throw `error: cannot find navigation container with selector ${navSelector}`;
        }
        this.#navigationContainer = navContainer;

        navContainer.empty();
        this.#routes.forEach((r) => {

            // Add the nav.
            const nav = $(`<a href='#${r.name}'>${r.displayName}</a>`)
            navContainer.append(nav);
        });
        // Now add the burger menu bit.
        const burger = $('<a href="javascript:void(0);" class="icon"></a>');
        burger.on("click", () => this.onClickBurger());
        burger.append($('<i class="fa fa-bars"></i>'));
        navContainer.append(burger);

        // Now watch for the page location changing.
        window.addEventListener('hashchange', (e) => {
            this.hasChanged();
        });
        this.hasChanged();
    }

    // Shows/hides the burger menu.
    private onClickBurger() {
        var x = document.getElementById("topnav");
        if (x) {
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
    }

    // Called when the location hash has changed.
    // Loads the content for the route.
    public hasChanged() {
        if (window.location.hash.length > 0) {
            for (var i = 0, length = this.#routes.length; i < length; i++) {
                var route = this.#routes[i];
                if (route.isActiveRoute(window.location.hash.substring(1))) {
                    this.goToRoute(route);
                    return;
                }
            }
        } else {
            for (var i = 0, length = this.#routes.length; i < length; i++) {
                var route = this.#routes[i];
                if (route.default) {
                    this.goToRoute(route);
                    return;
                }
            }
        }
    }

    public goToRoute(route: Route) {

        // Do we already have this content in the cache?
        var cachedContent = this.#cachedContent[route.name];
        if (cachedContent) {

            // Just grab the contents from the cache.
            this.selectRoute(route, cachedContent);
        } else {

            // Grab the contents from the server.
            var url = `views/${route.name}.html`;

            console.log(`Loading content from ${url}`);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {

                    // Put the response into the cache for next time.
                    this.#cachedContent[route.name] = xhttp.responseText;

                    this.selectRoute(route, xhttp.responseText);
                }
            }
            xhttp.open('GET', url, true);
            xhttp.send();
        }
    }

    private selectRoute(route: Route, content: string): void {
        // Find the nav links.
        const links = this.#navigationContainer.find("a");

        // Remove the active class.
        links.removeClass("active");

        // Find the selected route.
        const active = this.#navigationContainer.find(`a[href='#${route.name}']`);

        // Add the active class.
        active.addClass("active");

        // Load the content into the DOM.
        this.#rootElem.innerHTML = content;

        // If there is code for this page, initialize it.
        if (route.tsObject) {
            route.tsObject.init();
        }

        // To load a script file dynamically:
        // https://www.educative.io/answers/how-to-dynamically-load-a-js-file-in-javascript
    }
}