Add School:
Method: POST
URL: [http://localhost:3000/api/addSchool](https://school-managment-api.vercel.app/api/addSchool)
Body: Raw JSON:
{
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 40.712776,
    "longitude": -74.005974
}

List Schools:
Method: GET
URL: [http://localhost:3000/api/listSchools?latitude=40.712776&longitude=-74.005974
](https://school-managment-api.vercel.app/api/listSchools?latitude=40.712776&longitude=-74.005974)

