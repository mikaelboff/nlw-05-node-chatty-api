let socket_admin_id = null;
let emailUser = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", event => {
  socket = io();

  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;
  const text = document.getElementById("txt_help").value;

  emailUser = email;

  socket.on("connect", () => {
    const params = { email, text };

    socket.emit("client_first_access", params, (callback, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(callback);
      }
    });
  });

  socket.on("client_list_all_messages", messages => {
    const template_client = document.getElementById("message-user-template")
      .innerHTML;

    const template_admin = document.getElementById("admin-template").innerHTML;

    messages.forEach(message => {
      let rendered = null;

      if (message.admin_id === null) {
        rendered = Mustache.render(template_client, {
          message: message.text,
          email
        });
      } else {
        rendered = Mustache.render(template_admin, {
          message_admin: message.text
        });
      }

      document.getElementById("messages").innerHTML += rendered;
    });

    const divMessages = document.getElementById("messages");

    if (divMessages.children.length) {
      divMessages.children[divMessages.children.length - 1].scrollIntoView();
    }
  });

  socket.on("admin_send_to_client", message => {
    socket_admin_id = message.socket_id;

    const template_admin = document.getElementById("admin-template").innerHTML;

    rendered = Mustache.render(template_admin, {
      message_admin: message.text
    });

    document.getElementById("messages").innerHTML += rendered;

    const divMessages = document.getElementById("messages");

    if (divMessages.children.length) {
      divMessages.children[divMessages.children.length - 1].scrollIntoView();
    }
  });
});

document
  .querySelector("#send_message_button")
  .addEventListener("click", event => {
    const text = document.getElementById("message_user");

    const params = { text: text.value, socket_admin_id };

    socket.emit("client_send_to_admin", params);

    const template_client = document.getElementById("message-user-template")
      .innerHTML;

    rendered = Mustache.render(template_client, {
      message: text.value,
      email: emailUser
    });

    text.value = "";

    document.getElementById("messages").innerHTML += rendered;

    const divMessages = document.getElementById("messages");

    if (divMessages.children.length) {
      divMessages.children[divMessages.children.length - 1].scrollIntoView();
    }
  });
