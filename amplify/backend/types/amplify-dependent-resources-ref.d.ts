export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "originateclient84cf992c": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "originateclientdev": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "plaid": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "zoho": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "ocdefi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "s330286d4d": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "plaid": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "newinvoicenotification": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "zoho": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "ocdefi": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "analytics": {
        "originatetest": {
            "Region": "string",
            "Id": "string",
            "appName": "string"
        }
    }
}