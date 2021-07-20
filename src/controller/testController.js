
export function roboxTest(request, response) {
    response.json({ name: `Juan`, age: './15' });
};

export function notification(request, response){
    let body =  request.body;
    return response.json({
        name: body.name
    });
}
