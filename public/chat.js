//Jquery DOM events
$(document).ready(()=>{
    //Connect to default route localhost:3000 in our case
    var socket = io.connect('/');
    //On click button event, get name/msg value, and emit the name/msg to id 'chat' txt area. 
    $("#btn-send").click((event)=>{
        event.preventDefault();
        //Store name from field using Jquery
        let n = $("#txt-name").val();
        //Store msg from field using Jquery
        let msg = $("#txt-message").val();
        //Store message object in 'chat' event and emit
        socket.emit('chat', {name: n, message: msg})
        //Clear input text field on submit
        $("#txt-message").val("");
    });

    //On keypress event, emit name value typing
    $('#txt-message').keypress((event)=>{
        //Get name stored in txt-name field
        let n = $("#txt-name").val();
        //Emit the name to typing event
        socket.emit('typing', {name: n});
    })
    
    //Socket.on(event, callback) -> listening for socket "chat" events
    socket.on("chat", (data) => {
        //Append the name and message associated with 'chat' event.
        $("#chat-container").append("<p><strong>"+data.name+":</strong>&nbsp;"+data.message+"</p>");
        //Clear name is typing once message is appended
        $("#chat-typing").val("");
    })

    //In the chat-typing message
    socket.on("typing", (data) => {
        $("#chat-typing").val(data.name+" is typing...");
    })
});
    