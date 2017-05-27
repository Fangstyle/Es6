'use strict'
/**
 * proxy代理，（代理模式）
 * 是一种对对象的保护模式，对象不直接暴露给用户，而是暴露给代理，用户与代理相互操作，
 * 抽象出的代理层，使业务与保护对象分离开来，实现解耦
 *
 */

{
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy){
                if (target.hasOwnProperty(key)) {
                    let temp = this._validator[key];
                    if (!!temp(value)) {
                        return Reflect.set(target, key, value, proxy)
                    } else {
                        throw Error(`${key} can't set to ${value}`)
                    }
                } else {
                    throw Error(`${key} is undefined!`)
                }
            }
        })
    }

    const personValidator = {
        name(val){
            return typeof val == 'string'
        },
        age(val){
            return typeof val == 'number' && val > 18
        }
    }
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            return validator(this, personValidator);
        }
    }

    let person = new Person('lili', 30);
    console.info(person);

    person.age = 19;
    console.info(person);

}