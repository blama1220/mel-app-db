adb reverse tcp:5001 tcp:5001
exp://192.168.86.105:19000



---Diagrama
https://dbdiagram.io/d


//// -- LEVEL 1
//// -- Schemas, Tables and References

// Creating tables
// You can define the tables with full schema names

// If schema name is omitted, it will default to "public" schema.
Table users as U {
  id int [pk]
  name varchar
  password varchar
  work varchar
  location varchar
  gender varchar
  states array
  list array
  created_at timestamp
}

Table UserMovie {
  id int [pk]
  state varchar
  movieId int 
 }
 
Table Entertainment {
  id int [pk]
  title varchar
  genres array
  type varchar
  year int
  episodes int
  date varchar
  rating varchar
  img varchar
}

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one; <> many-to-many
// Ref: U.country_code > countries.code  
// Ref: ecommerce.merchants.country_code > countries.code

//----------------------------------------------//

Ref: UserMovie.id >  U.states
Ref: Entertainment.id - UserMovie.id  