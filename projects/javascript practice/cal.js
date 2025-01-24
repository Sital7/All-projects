function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
  }
  
  const person1 = new Person("John", "Doe", 30, "blue");
  console.log(person1);