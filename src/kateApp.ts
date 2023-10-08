import { Router } from './router';
import { Route } from './route';
import { Contact } from './contact';

export class kateApp {

    #router: Router;

    public init(navID: string) {

        const contact = new Contact();
        
        // Set up the routes.
        this.#router = new Router([
            new Route('home', 'Home', undefined, true),            
            new Route('how', 'How it Works'),
            new Route('contact', 'Contact Us', contact),
        ]);

        // Start listening.
        this.#router.init(navID);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const k = new kateApp();
    k.init("#topnav");
});
