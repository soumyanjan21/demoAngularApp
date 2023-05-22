const testPromise = new Promise((resolve => resolve(1))) ;

testPromise.then(data=>{
    console.log(data)
    
}).catch(err=> );
