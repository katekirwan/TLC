import { Router } from './modules/router';
import { Route } from './modules/route';
import { Contact } from './modules/contact';

export class app {

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