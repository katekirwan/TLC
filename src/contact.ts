import { Initializable } from "./initializable";
import { EmailClient, EmailMessage } from '@azure/communication-email';
import { DefaultAzureCredential } from "@azure/identity";

export class Contact implements Initializable {

    // Need to figure out how to bundle the client library with the TS code.
    // https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md

    public init() {

        // Find the submit button.
        const btn = $("#submitData");
        btn.on("click", async () => await this.onSubmit());
    }

    public async onSubmit(): Promise<void> {
        // How to send an e-mail from Azure:
        // https://learn.microsoft.com/en-us/javascript/api/overview/azure/communication-email-readme?view=azure-node-latest

        try {
            const endPoint = `endpoint=httpso://katekirwancomms.unitedstates.communication.azure.com/;accesskey=kEcC+FOm5m0reBz6M2H04Oj56Urh5yhaUkbApV4XLceijoGYqSRnIA3iFDqlktcc5Fb+V995RxuRy1g/MU4Nmw==`;
            const credential = new DefaultAzureCredential();
            const client = new EmailClient(endPoint, credential);

            const message: EmailMessage = {
                senderAddress: "donotreply@KateKirwan.com",
                content: {
                    subject: "This is a test",
                    plainText: "This is a body"
                },
                recipients: {
                    to: [
                        {
                            address: "strange.limey@gmail.com",
                            displayName: "Michael Stone"
                        }
                    ]
                }
            };

            const poller = await client.beginSend(message);
            const response = await poller.pollUntilDone();

            alert("Sent E-mail");
        } catch (e) {
            alert("error");
        }

    }
}