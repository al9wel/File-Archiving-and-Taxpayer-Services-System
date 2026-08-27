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

# Archive_Files_Taxpayer_Services/Files

## POST Create_File

POST /api/files

> Body Parameters

```yaml
inventoryNumber: "1122"
taxNumber: "1152"
docsCount: "45"
userId: "2"
departmentId: "1"
fileStatusId: "1"
activityTypeId: "1"
paymentTypeId: "1"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» inventoryNumber|body|string| no |none|
|» taxNumber|body|string| no |none|
|» docsCount|body|string| no |none|
|» userId|body|string| no |none|
|» departmentId|body|string| no |none|
|» fileStatusId|body|string| no |none|
|» activityTypeId|body|string| no |none|
|» paymentTypeId|body|string| no |none|

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

## GET Get_All_Files

GET /api/files

> Body Parameters

```yaml
{}

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|search|query|string| no |none|
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

## GET Get_Files_By_Id

GET /api/files/1

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

## DELETE Delete_File

DELETE /api/files/1

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

## PUT Update_File

PUT /api/files/1

> Body Parameters

```yaml
departmentId: "1"
note: ملاحظة للملف

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» departmentId|body|string| no |none|
|» note|body|string| no |none|

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

## POST Create-File-With-User

POST /api/files/create-file-with-user

> Body Parameters

```yaml
firstName: الشريف
lastName: باوزير
idCard: file://C:\Users\Asiana\Desktop\ABDULLAH BAWAZIR LARAVEL-BACKEND.pdf
phone: "774771772"
image: file://C:\Users\Asiana\Pictures\Bawazir(1).png
role: Tax_Payer
departmentID: "1"
inventoryNumber: "124"
docsCount: "55"
departmentId: "1"
fileStatusId: "1"
activityTypeId: "1"
paymentTypeId: "1"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Accept|header|string| no |none|
|body|body|object| yes |none|
|» firstName|body|string| no |none|
|» lastName|body|string| no |none|
|» idCard|body|string(binary)| no |none|
|» phone|body|string| no |none|
|» image|body|string(binary)| no |none|
|» role|body|string| no |none|
|» departmentID|body|string| no |none|
|» inventoryNumber|body|string| no |none|
|» docsCount|body|string| no |none|
|» departmentId|body|string| no |none|
|» fileStatusId|body|string| no |none|
|» activityTypeId|body|string| no |none|
|» paymentTypeId|body|string| no |none|

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

