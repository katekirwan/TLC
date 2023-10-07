import { Initializable } from "./initializable";

export class Contact implements Initializable {

    #blib: string = "";

    public init() {

        // Find the submit button.
        const btn = $("#submitData");
        btn.on("click", () => this.onSubmit());
    }

    public onSubmit(): void {
        // How to send an e-mail from Azure:
        // https://learn.microsoft.com/en-us/javascript/api/overview/azure/communication-email-readme?view=azure-node-latest
        alert("Submitting Form Data");
    }
}