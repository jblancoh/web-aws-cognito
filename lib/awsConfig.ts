import { Amplify } from 'aws-amplify';

const awsConfig = {
    Auth: {
        Cognito: {
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID,
        }
    }
};

Amplify.configure(awsConfig as any);

export default awsConfig; 