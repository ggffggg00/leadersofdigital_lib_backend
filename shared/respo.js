 function error(res, msg){
    res.statusCode = 400;
    res.send({
        status: "error",
        msg: msg
    })
}

 function success(res, data){
    res.statusCode = 200;
    res.send({
        status: "ok",
        data: data
    })
}

export default {
    error,
    success
}