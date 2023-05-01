import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const REGION = "ap-northeast-1";

export const retrieveSecrets = async (secretsId) => {
    let response;

    const client = new SecretsManagerClient({ region: REGION });
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
