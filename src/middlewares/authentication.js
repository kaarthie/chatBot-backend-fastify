async function authenticate(request,reply,done){
    if(request.isAuthenticated()){
        console.log(`hello,${request.user.userId}`)
    }
    else{
        console.log('not authenticated')
    }
    done();

}

export {authenticate};