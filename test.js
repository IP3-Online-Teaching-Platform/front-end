var json = [
    { "id": 105, "name": "FIAT",    "active": true, "parentId": "1" },
    { "id": 106, "name": "AUDI",    "active": true, "parentId": "1" },
    { "id": 117, "name": "BMW",     "active": true, "parentId": "1" },
    { "id": 109, "name": "RENAULT", "active": true, "parentId": "1" }
  ];
  
  json.sort(function(a, b){
    return a.id - b.id;
});
  
  console.log(json);