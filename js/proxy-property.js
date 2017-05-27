/**
 * Created by fangzhen on 2017/5/27.
 */
let person = {
    name: 'lili',
    age: '3',
    sex: '男',
    identify: 'student',
    graduate: 'senior',
    _r:'删除测试'
}

let proxy = new Proxy(person, {
    //拦截get
    get (target, key){
        if (key != 'name')
            return target[key]
    },//拦截set
    set(target, key, value, proxy){
        if (key == 'age') {
            return target[key]
        } else {
            return false;
        }
    },
    // 拦截delete
    deleteProperty(target, key){
        if (key.indexOf('_') != -1) {
            delete target[key];
            return true;
        } else {
            return target[key]
        }
    },
    // 拦截key in object操作
    has(target, key){
        if (key != 'sex') {
            return target[key];
        } else {
            return false;
        }
    },
    // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
        return Object.keys(target).filter(item => item != 'time')
    }
})

console.log('person age', proxy.age);
console.log('person name', proxy.name);
console.log('person sex', proxy.sex);

/*Set 测试*/
console.log(`------------------set测试-----------------`);
proxy.age = 10;
proxy.name = '哈哈';
proxy.sex = '女';

console.log('person age', proxy.age);
console.log('person name', proxy.name);
console.log('person sex', proxy.sex);

console.log(`--------------has测试(遍历)-----------------`);
for (let key in proxy) {
    console.log('proxy的key为' + key);
}
console.log('has', 'sex' in proxy, 'age' in proxy);

console.log(`--------------delete测试-----------------`);
delete proxy.name;
delete proxy._r;
console.info('delete name&_r', proxy);

console.log('ownKeys',Object.keys(monitor));




