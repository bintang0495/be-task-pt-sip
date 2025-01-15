# Poli API Spec

## Add Poli 

Endpoint: POST /api/v1/poli

Headers :
- Authorization: token

Request Body: 
```json
{
  "mode": "instance",
  "name": "Ruang Poli Bedah",
  "status": "active",
  "telecom": [
    {
      "use": "work",
      "value": "+621500567",
      "system": "phone"
    },
    {
      "use": "work",
      "value": "pkm-satusehat@dto.kemkes.go.id",
      "system": "email"
    },
    {
      "use": "work",
      "value": "dto.kemkes.go.id",
      "system": "url"
    }
  ],
  "position": {
    "altitude": 0,
    "latitude": 106.8323988539394,
    "longitude": -6.23115426275766
  },
  "identifier": [
    {
      "value": "INT",
      "system": "http://sys-ids.kemkes.go.id/location/100026305"
    }
  ],
  "description": "Ruang Poli Bedah",
  "physicalType": {
    "coding": [
      {
        "code": "ro",
        "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
        "display": "Room"
      }
    ]
  },
  "resourceType": "Location",
  "managingOrganization": {
    "reference": "Organization/100026305"
  }
}
```

Response Body:

```json
{
    "poli": {
        "id": 1,
        "resource_type": "Location",
        "status": "active",
        "name": "Ruang Poli Bedah",
        "description": "Ruang Poli Bedah",
        "mode": "instance",
        "longitude": -6.23115426275766,
        "latitude": 106.8323988539394,
        "altitude": 0,
        "reference_organization": "Organization/100026305",
        "physical_type": {
            "coding": [
                {
                    "code": "ro",
                    "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                    "display": "Room"
                }
            ]
        }
    },
    "telecom": [
        {
            "system": "phone",
            "value": "+621500567",
            "use": "work"
        },
        {
            "system": "email",
            "value": "pkm-satusehat@dto.kemkes.go.id",
            "use": "work"
        },
        {
            "system": "url",
            "value": "dto.kemkes.go.id",
            "use": "work"
        }
    ],
    "identifier": [
        {
            "system": "http://sys-ids.kemkes.go.id/location/100026305",
            "value": "INT"
        }
    ]
}
```

## Create Perawat

Endpoint: POST /api/v1/perawat

Request Body(success):

```json
{
  "name": "Rojak",
  "poli_id": 1
}
```

Response Body (success):
```json
{
    "id": 3,
    "name": "Rojak",
    "poli_id": 1
}
```

Request Body (error):

```json
{
  "name": "Rojak",
  "poli_id": 5
}
```

Response Body (error):
```json
{
    "message": "Perawat dengan Poli Id 5 tidak ditemukan.",
    "error": "Not Found",
    "statusCode": 404
}
```

## Get Perawat

Query Params:
- page: number, default 1
- count: number, default 10

Response Body:
```json
{
    "data": [
        {
            "id": 1,
            "name": "Bintang",
            "poli_id": 1,
            "poli": {
                "id": 1,
                "resource_type": "Location",
                "status": "active",
                "name": "Ruang Poli Bedah",
                "description": "Ruang Poli Bedah",
                "mode": "instance",
                "longitude": -6.23115426275766,
                "latitude": 106.8323988539394,
                "altitude": 0,
                "reference_organization": "Organization/100026305",
                "physical_type": {
                    "coding": [
                        {
                            "code": "ro",
                            "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                            "display": "Room"
                        }
                    ]
                },
                "telecoms": [
                    {
                        "id": 1,
                        "system": "phone",
                        "value": "+621500567",
                        "use": "work",
                        "poli_id": 1
                    },
                    {
                        "id": 2,
                        "system": "email",
                        "value": "pkm-satusehat@dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 1
                    },
                    {
                        "id": 3,
                        "system": "url",
                        "value": "dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 1
                    }
                ],
                "identifiers": [
                    {
                        "id": 1,
                        "system": "http://sys-ids.kemkes.go.id/location/100026305",
                        "value": "INT",
                        "poli_id": 1
                    }
                ]
            }
        },
        {
            "id": 2,
            "name": "Rojak",
            "poli_id": 2,
            "poli": {
                "id": 2,
                "resource_type": "Location",
                "status": "active",
                "name": "Ruang Poli Bedah",
                "description": "Ruang Poli Bedah",
                "mode": "instance",
                "longitude": -6.23115426275766,
                "latitude": 106.8323988539394,
                "altitude": 0,
                "reference_organization": "Organization/100026305",
                "physical_type": {
                    "coding": [
                        {
                            "code": "ro",
                            "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                            "display": "Room"
                        }
                    ]
                },
                "telecoms": [
                    {
                        "id": 4,
                        "system": "phone",
                        "value": "+621500567",
                        "use": "work",
                        "poli_id": 2
                    },
                    {
                        "id": 5,
                        "system": "email",
                        "value": "pkm-satusehat@dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 2
                    },
                    {
                        "id": 6,
                        "system": "url",
                        "value": "dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 2
                    }
                ],
                "identifiers": [
                    {
                        "id": 2,
                        "system": "http://sys-ids.kemkes.go.id/location/100026305",
                        "value": "INT",
                        "poli_id": 2
                    }
                ]
            }
        },
        {
            "id": 3,
            "name": "Rojak",
            "poli_id": 1,
            "poli": {
                "id": 1,
                "resource_type": "Location",
                "status": "active",
                "name": "Ruang Poli Bedah",
                "description": "Ruang Poli Bedah",
                "mode": "instance",
                "longitude": -6.23115426275766,
                "latitude": 106.8323988539394,
                "altitude": 0,
                "reference_organization": "Organization/100026305",
                "physical_type": {
                    "coding": [
                        {
                            "code": "ro",
                            "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
                            "display": "Room"
                        }
                    ]
                },
                "telecoms": [
                    {
                        "id": 1,
                        "system": "phone",
                        "value": "+621500567",
                        "use": "work",
                        "poli_id": 1
                    },
                    {
                        "id": 2,
                        "system": "email",
                        "value": "pkm-satusehat@dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 1
                    },
                    {
                        "id": 3,
                        "system": "url",
                        "value": "dto.kemkes.go.id",
                        "use": "work",
                        "poli_id": 1
                    }
                ],
                "identifiers": [
                    {
                        "id": 1,
                        "system": "http://sys-ids.kemkes.go.id/location/100026305",
                        "value": "INT",
                        "poli_id": 1
                    }
                ]
            }
        }
    ],
    "meta": {
        "totalCount": 3,
        "totalPages": 1,
        "currentPage": 1,
        "pageSize": 10
    }
}
```