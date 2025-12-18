# Module 7: Object Oriented TypeScript

---

## 7-1 Class and Object

1. `Class` is a Blueprint or Template that allows the creation of multiple `Objects`.
2. Setting the value inside the `constructor` by `this.name= name` It is a long process, but it is allowed in TypeScript.

```tsx
// OOP - class ==> object
class Animal {
  name: string;
  species: string;
  sound: string;

  constructor(name: string, species: string, sound: string) {
    this.name = name;
    this.species = species;
    this.sound = sound;
  }
  // Whenn there is a function inside a class or object, it is called a method.
  makeSound() {
    console.log(`${this.name} is making sound ${this.sound}`);
  }
}
```

3. In TypeScript, properties can be declared directly inside the constructor. By using `public/private/protected` .

```tsx
// Parameter Properties
class Animal {
  constructor(
    public name: string,
    public species: string,
    public sound: string
  ) {}
  makeSound() {
    console.log(`${this.name} is making sound ${this.sound}`);
  }
}
// Careating Object from the Animal Class==>
const dog = new Animal("Dogesh", "dog", "gheo ghew");
const cat = new Animal("Cat bhai", "cat", "mew mew");

console.log(dog.sound);
// console.log(dog.makeSound());  // If you enter it like this, it will return undefined.
dog.makeSound();
```

## 7-2: Inheritance, the 1st pillar of OOP

1. Creating a Class for Use in Inheritance

```tsx
class Person {
  name: string; // common
  age: number; // common
  address: string; // common

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  // common
  getSleep(numOfHours: number) {
    console.log(`${this.name} ghumay ${numOfHours} ghonta`);
  }
}
```

2. Student–এর আলাদা কিছু লাগছে না । তাই Person –এর সব কিছু Student–এ চলে আসে।
3. সব properties automatically inherited হয়েছে।

```tsx
class Student extends Person {}

const student1 = new Student("Mr. Rafi", 25, "BD");
student1.getSleep(15);
```

1. The Teacher class has its own property, which is why we call the constructor and use `super()` for existing property.

```tsx
class Teacher extends Person {
  designation: string; // Own Property

  constructor(name: string, age: number, address: string, designation: string) {
    // super(name, age, address) কেবল ParentClass–এর constructor কে call করছে। এটা Parent     –এর property গুলো initialize করতে লাগে।
    super(name, age, address); //
    this.designation = designation;
  }

  // Own Method
  takeClass(numOfClass: number) {
    console.log(`${this.name} ${numOfClass} ghonta class ney`);
  }
}
const teacher1 = new Teacher("Mr. Mahmud", 40, "MDPUR", "Senior Teacher");

teacher1.takeClass(4);
teacher1.getSleep(9);
```

## 7-3: Type guard using typeof and in

1. `in` operator **property-based type guard**
2. `in` is used to check whether an `object` has any properties.

```tsx
// type guard ==>

// in typeof
const add = (num1: number | string, num2: number | string) => {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};
//
console.log(add(2, 2));
add("2", 2);
add("2", "2");

// in guard
type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: "Admin";
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`This ${user.name} and his role is : ${user.role}`);
  } else {
    console.log(`${user.name}`);
  }
};

getUserInfo({ name: "Normal", role: "Admin" });
```

## 7-4: Type guard using instance of

1. যে কোনো class থেকে তৈরি object = ঐ class এর instance ⇒ ( Car design to Huge Car making)
2. `instanceof` হলো একটি _operator_ যা চেক করে: একটি object কি কোনো নির্দিষ্ট class থেকে তৈরি (instance) হয়েছে কিনা।

```tsx
// Parent Class
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  getSleep(numOfHours: number) {
    console.log(`${this.name} doinik ${numOfHours} ghonta ghumay`);
  }
}
// Inheritance
class Student extends Person {
  constructor(name: string) {
    super(name);
  }

  doStudy(numOfHours: number) {
    console.log(`${this.name} doinik ${numOfHours} hours Pore`);
  }
}
// Another Inheritance
class Teacher extends Person {
  constructor(name: string) {
    super(name);
  }

  takeClass(numOfHours: number) {
    console.log(`${this.name} ${numOfHours} ti class ney`);
  }
}
// function with conditon
const getUserInfo = (user: Person) => {
  if (user instanceof Student) {
    user.doStudy(10);
  } else if (user instanceof Teacher) {
    user.takeClass(5);
  } else {
    user.getSleep(15);
  }
};
// Instance
const student1 = new Student("Mr. Student");
const teacher1 = new Teacher("Mr. Teacher");
const person1 = new Person("Mr. Person");

getUserInfo(student1);
getUserInfo(teacher1);
getUserInfo(person1);
```

### Function Guard

1. Code can be simplified by using `function guards.`

```tsx
// function guard
const isStudent = (user: Person) => {
  return user instanceof Student; // true | false
};

const isTeacher = (user: Person) => {
  return user instanceof Teacher; // user is Teacher
};

const getUserInfo = (user: Person) => {
  if (isStudent(user)) {
    user.doStudy(10);
  } else if (isTeacher(user)) {
    user.takeClass(5);
  } else {
    user.getSleep(15);
  }
};

// Instance
const student1 = new Student("Mr. Student");
const teacher1 = new Teacher("Mr. Teacher");
const person1 = new Person("Mr. Person");

getUserInfo(student1);
getUserInfo(teacher1);
getUserInfo(person1);
```

## 7-5: Access Modifiers

1. `public` যেটা public — সেটা class এর ভেতর, বাইরে, object থেকে—সব জায়গা থেকে access করা যাবে।
2. `private` হলে শুধুমাত্র class-এর ভিতর থেকে access করা যাবে; child class থেকেও করা যাবে না।
3. `protected` class এর ভিতর access করা যায় । child class থেকেও access করা যায়, কিন্তু class এর বাইরে object দিয়ে access করা যায় না।

```tsx
class BankAccount {
  public readonly userId: number;
  public userName: string;
  private userBalance: number; // example dekhanor jonno 2 vabe likha hoisa
  protected userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  addBalance(balance: number) {
    this.userBalance = this.userBalance + balance;
  }
}
// child class ==>
class StudentAccount extends BankAccount {
  test() {
    this.userBalance = this.userBalance;
  }
}

const mezbaVaiAccount = new BankAccount(111, "Mezba", 200);

mezbaVaiAccount.addBalance(30);
console.log(mezbaVaiAccount); // { userId: 111, userName: 'Mezba', userBalance: 230 }
```

## 7-6: Getter and Setter

1. A setter is a method that helps `set/update` The value of a property.
2. Getter is a method that helps us to read the value of the set property.
3. এই getter–টাও তুমি function হিসেবে না লিখে property-এর মতো use করতে পারো, Pure OOP concept

```tsx
class BankAccount {
  public readonly userId: number;
  public userName: string;
  private userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  // Using Setter
  set addBalance(amount: number) {
    this.userBalance = this.userBalance + amount;
  }
  // getter method
  get getBalance() {
    return this.userBalance;
  }
}

const mezbaVaiAccount = new BankAccount(111, "Mezba", 200);

mezbaVaiAccount.addBalance = 100;
console.log(mezbaVaiAccount); // The output is the same as before.
```

## 7-7: Static in TypeScript

1. `Static` means that all instances of the class share the same copy. No matter how many objects you create, everyone will see and change the same count.
2. If we don't use `static` Then, Different instances will have different counts for this.

```tsx
class Counter {
  static count: number = 0;

  static increment() {
    return (Counter.count = Counter.count + 1);
  }
  decrement() {
    return (Counter.count = Counter.count - 1);
  }
}
console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.increment()); // 1 2 3
```

## 7-8: Polymorphism, the 2nd pillar of OOP

1. OOP-এর 2nd pillar হলো **Polymorphism**, যার মানে: একই মেথড আলাদা ক্লাসে আলাদা ভাবে কাজ করবে।
2. Polymorphismএকই নামের ফাংশন, কিন্তু কে কল করছে তার ওপর ভিন্ন কাজ করে

```tsx
class Person {
  getSleep() {
    console.log(`I sleep for 8 hours`);
  }
}
class Student extends Person {
  getSleep() {
    console.log(`I am a student and I sleep 7 hours`);
  }
}
class NextDeveloper extends Person {
  getSleep() {
    console.log(`I am a next level developer , I sleep for 6 hours`);
  }
}
// Call function
const getSleepingHours = (param: Person) => {
  param.getSleep();
};

const person1 = new Person();
const person2 = new Student();
const person3 = new NextDeveloper();

getSleepingHours(person1); // I sleep for 8 hours
getSleepingHours(person2); // I am a student and I sleep 7 hours
getSleepingHours(person3); // I am a next level developer , I sleep for 6 hours

// Another Example ===>
class Shape {
  getArea(): number {
    return 0;
  }
}
class Circle extends Shape {
  // Area: pi*r*r
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
// Call Function
const getArea = (param: Shape) => {
  console.log(param.getArea());
};

const shape1 = new Shape();
const shape2 = new Circle(15);
getArea(shape2); // 706.8583470577034
```

## 7-9: Abstraction, the 3rd pillar of OOP

1. Abstraction means "=It'll show only what needs to be shown. It'll hide the rest!”
2. There are two ways to do abstraction in TypeScript: ⇒ 1. interface 2. abstract class.
3. When we Use Insterface method ⇒ যখন একটা জিনিসের একাধিক ভিন্ন ভিন্ন version থাকবে, যখন multiple inheritance দরকার।

```tsx
// Idea ==> Abstraction Method with Interface
interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}
// implementation
class MusicPlayer implements MediaPlayer {
  play() {
    console.log(`Playing Music....`);
  }
  pause() {
    console.log(`Music paused...`);
  }
  stop() {
    console.log(`Music stooped ....`);
  }
}
const myPlayer1 = new MusicPlayer();
myPlayer1.play(); // Playing Music.....
```

1. An instance can never be created from an abstract class.
2. When we use abstract class method ⇒ যখন subclass-কে _common property_ বা **constructor** দিতে হবে, যখন multiple inheritance দরকার নেই।

```tsx
// Idea ==> Abstraction Method with abstract class method =>
abstract class MediaPlayer {
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}
// Implementation
class RafisPlayer extends MediaPlayer {
  play(): void {
    console.log(`Music playing..`);
  }
  pause(): void {
    console.log(`Music Paused`);
  }
  stop(): void {
    console.log(`Music stooped`);
  }
}
const myPlayer1 = new RafisPlayer();
myPlayer1.play(); // Music Playing.
```

## 7-10: Encapsulation, the 4th pillar of OOP

1. Encapsulation = ডেটাকে লুকিয়ে রেখে সুরক্ষিত রাখা
2. Encapsulation মানে হলো:
   - ডেটাকে (property) বাইরে থেকে direct access করতে না দেয়া
   - শুধু method-এর মাধ্যমে update করা
   - এতে class-এর data safe থাকে
3. TypeScript-এ Encapsulation মূলত করা হয় _access modifiers_ দিয়ে:
   - `public` → সবাই access করতে পারে
   - `private` → শুধুমাত্র class এর ভিতরে
   - `protected` → class + child class এ access করা যায়
   - `readonly` → শুধু পড়া যায়, মান পরিবর্তন করা যায় না
