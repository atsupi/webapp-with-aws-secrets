import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import * as dotenv from 'dotenv';

const REGION = "ap-northeast-1";

export const retrieveSecrets = async (secretsId) => {
    let response;

    dotenv.config();
    const clientParams = {
        region: REGION,
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey
        }
    }
    const client = new SecretsManagerClient(clientParams);
    const params = {
        SecretId: secretsId,
        VersionStage: "AWSCURRENT",
    }
    const command = new GetSecretValueCommand(params);
    try {
        response = await client.send(command);
    } catch (err) {
        throw err;
    }

    const secret = response.SecretString;
    return JSON.parse(secret);
}
