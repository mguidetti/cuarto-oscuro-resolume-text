async function sendForm(event) {
  event.preventDefault();

  const address = document.getElementById("address-input").value;
  const port = document.getElementById("port-input").value;
  const baseApiUrl = `http://${address}:${port}/api/v1`;

  const form = event.target;
  const layer = document.getElementById("layer-input").value;
  const message = document.getElementById("message-input").value;
  const responseElement = document.getElementById("response");

  // const body = {
  //   name: {
  //     value: message,
  //   },
  //   video: {
  //     effects: [
  //       {
  //         name: "Blow",
  //         params: {
  //           Text: {
  //             value: "Derrp!!",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

  // const response = await fetch(
  //   `${baseApiUrl}/composition/layers/${layer}/clips/2`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   }
  // );

  const body = {
    type: "TextBlock",
    parameters: {
      text: "Your Text Here",
      fontSize: 48,
      color: "#FFFFFF",
    },
  };

  const response = await fetch(
    `${baseApiUrl}/composition/layers/${layer}/clips/2/open`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "source:///video/Text\ Block",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  console.log("Response", response);
}

document.getElementById("message-form").addEventListener("submit", sendForm);
