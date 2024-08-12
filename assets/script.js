class Resolume {
  constructor(address, port) {
    this.baseUrl = `http://${address}:${port}/api/v1`;
  }

  handleResponse(response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log(response);
      return response;
    }
  }

  async createTextBlock(layerIndex, clipIndex) {
    const response = await fetch(
      `${this.baseUrl}/composition/layers/${layerIndex}/clips/${clipIndex}/open`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "source:///video/Text%20Block",
      }
    );

    this.handleResponse(response);
  }

  async updateTextBlock(layerIndex, clipIndex, message) {
    const body = {
      name: {
        value: message,
      },
      video: {
        sourceparams: {
          Text: {
            value: message,
          },
        },
      },
    };

    const response = await fetch(
      `${this.baseUrl}/composition/layers/${layerIndex}/clips/${clipIndex}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    this.handleResponse(response);
  }
}

async function submitForm(event, resolume) {
  event.preventDefault();

  const layerInput = document.getElementById("layer-input");
  const clipInput = document.getElementById("clip-input");
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  await resolume.createTextBlock(layerInput.value, clipInput.value);
  await resolume.updateTextBlock(layerInput.value, clipInput.value, message);

  clipInput.value++ 
}

function setup() {
  const address = document.getElementById("address-input").value;
  const port = document.getElementById("port-input").value;
  const resolume = new Resolume(address, port);

  document
    .getElementById("message-form")
    .addEventListener("submit", (event) => submitForm(event, resolume));
}

setup();