import { Initializable } from "./initializable";

export class Route {

    public readonly name: string;
    public readonly displayName: string;
    public readonly default: boolean;
    public readonly tsObject: Initializable | undefined;

    public constructor (name: string, displayName: string,
        tsObject: Initializable | undefined = undefined,
        defaultRoute: boolean = false) {

        this.name = name;
        this.displayName = displayName;

        this.tsObject = tsObject;
        this.default = defaultRoute;
    }

    public isActiveRoute(hashedPath: string): boolean {
        return hashedPath.replace('#', '') === this.name;
    }
}
