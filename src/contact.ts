import * as $ from 'jquery';
import { Initializable } from "./initializable";
import { EmailClient, EmailMessage } from '@azure/communication-email';
import { ClientSecretCredential } from "@azure/identity";

export class Contact implements Initializable {

    // Need to figure out how to bundle the client library with the TS code.
    // https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md

    public init() {

        // Find the submit button.
        const btn = $("#submitData");
        btn.on("click", async () => await this.onSubmit());
    }

    public async onSubmit(): Promise<void> {
        // Background threads:
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

        // How to send an e-mail from Azure:
        // https://learn.microsoft.com/en-us/javascript/api/overview/azure/communication-email-readme?view=azure-node-latest

        try {

            const tenantID = "87c54900-8315-45f0-9e70-fae4d431cfdf";
            const clientID = "91b6a9fa-b5c6-4523-a1bd-19940b75367b"
            const secret = "91b6a9fa-b5c6-4523-a1bd-19940b75367b";

            const endPoint = `endpoint=httpso://katekirwancomms.unitedstates.communication.azure.com/;accesskey=kEcC+FOm5m0reBz6M2H04Oj56Urh5yhaUkbApV4XLceijoGYqSRnIA3iFDqlktcc5Fb+V995RxuRy1g/MU4Nmw==`;
            const credential = new ClientSecretCredential(tenantID, clientID, secret);
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
            if (response.error) {
                alert(response.error);
            }

            alert("Sent E-mail");
        } catch (e:any) {
            alert(e.message);
        }

    }
}