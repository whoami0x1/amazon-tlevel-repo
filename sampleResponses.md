This file contins sample responses for the various APIs. This will help with frontend as without AWS credentials you wont know the format data is returned in.

## /api/eoi/list
```json
{
    "EOIs": [
        {
            "course": {"S": "finance-tlevel"},
            "userID": {"S": "705c89dc-5051-70f2-41b7-aec0e221809f"},
            "createdAt": {"S": "2026-06-22T13:25:27.695Z"},
            "details": {"S": "Testing Details"},
            "email": {"S": "test@test.com"},
            "ID": {"S": "b693a5c8-d0fb-46cf-a971-568039f1b411"},
            "name": {"S": "Test"}
        }
    ]
}
```

## /api/s3/getFiles
```json
{
    "files": [
        {
            "key": "Placeholder-PDF.pdf",
            "size": 13170,
            "modified": "2026-06-22T12:24:20.000Z",
            "url": "https://t-level-page-bucket.s3.eu-north-1.amazonaws.com/Placeholder-PDF.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQM7ZIJK6RHEA6F5G%2F20260622%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260622T132909Z&X-Amz-Expires=300&X-Amz-Signature=e0960cce68f89559c45c465078240fcb775b5bb1d0ff86ee57c853160f4bce34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        },
        {
            "key": "sampleFile.txt",
            "size": 38,
            "modified": "2026-06-18T10:42:37.000Z",
            "url": "https://t-level-page-bucket.s3.eu-north-1.amazonaws.com/sampleFile.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQM7ZIJK6RHEA6F5G%2F20260622%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260622T132909Z&X-Amz-Expires=300&X-Amz-Signature=7c5121e7de73e60d53f9fd8edd2e3c4830a4e15af5a7f0e1f96e24978610d4d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        }
    ]
}
```