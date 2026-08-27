---
title: Default module
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# Default module

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Archive_Files_Taxpayer_Services/TaxPayers

## POST Create_TaxPayer

POST /api/tax-payers

> Body Parameters

```yaml
{}

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get_All_Individuals_TaxPayers

GET /api/tax-payers

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Find_TaxPayer_By_Id

GET /api/tax-payers/2

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Updated_TaxPayer

POST /api/tax-payers/2

> Body Parameters

```yaml
tradeName: مركز الخير
_method: PUT

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» tradeName|body|string| no |none|
|» _method|body|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Find_TaxPayer_By_UserID

GET /tax-payer-by-userId/4

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete_TaxPayer

DELETE /api/tax-payers/4

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET All_TaxPayers

GET /api/get-tax-payers-with-special-info

> Body Parameters

```yaml
{}

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Create_File_To_Existing_TaxPayer

POST /api/tax-payers/create-file-to-existing-taxPayer

> Body Parameters

```yaml
fileId: "3"
tradeName: سوبر ماركت حمزة
commercialRecord: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
activityLicense: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
tradePict: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
insuranceCard: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
propertyDocPict: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
fileType: CharitableCompany
regionId: "1"
districtId: "2"
byLawsCopy: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» fileId|body|string| no |none|
|» tradeName|body|string| no |none|
|» commercialRecord|body|string(binary)| no |none|
|» activityLicense|body|string(binary)| no |none|
|» tradePict|body|string(binary)| no |none|
|» insuranceCard|body|string(binary)| no |none|
|» propertyDocPict|body|string(binary)| no |none|
|» fileType|body|string| no |none|
|» regionId|body|string| no |none|
|» districtId|body|string| no |none|
|» byLawsCopy|body|string(binary)| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get_All_TaxPayers_With_Source

GET /api/get-tax-payers-with-source

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

