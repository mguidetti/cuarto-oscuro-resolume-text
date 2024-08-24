class Resolume {
  constructor(address, port) {
    this.baseUrl = `http://${address}:${port}/api/v1`;
  }

  async handleResponse(response) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    } else {
      return response;
    }
  }

  async getSourcePresets(sourceName) {
    const response = await fetch(`${this.baseUrl}/sources`);
    const handledResponse = await this.handleResponse(response);
    const data = await handledResponse.json();
    const textBlockSource = data.video.find((obj) => obj.name === sourceName);
    const presets = textBlockSource.presets;

    return presets;
  }

  async createTextBlock(layerIndex, clipIndex, preset) {
    const sourceName = `source:///video/Text Block${
      preset !== "" ? `/${preset}` : ""
    }`;

    const response = await fetch(
      `${this.baseUrl}/composition/layers/${layerIndex}/clips/${clipIndex}/open`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: encodeURI(sourceName),
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

async function populatePresets(resolume, selectElement) {
  selectElement.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Default";
  selectElement.appendChild(defaultOption);

  const presets = await resolume.getSourcePresets("Text Block");
  presets.forEach((preset) => {
    const newOption = document.createElement("option");
    newOption.value = preset.name;
    newOption.text = preset.name;
    selectElement.appendChild(newOption);
  });
}

async function submitForm(event, resolume) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  await resolume.createTextBlock(data.layer, data.clip, data.preset);
  await resolume.updateTextBlock(data.layer, data.clip, data.message);

  const clipInput = document.getElementById("clip-input");
  const messageInput = document.getElementById("message-input");

  clipInput.value++;
  messageInput.value = null;
  messageInput.focus();
}

// Globl resolume scope
var resolume

function initResolume() {
  const address = document.getElementById("address-input").value;
  const port = document.getElementById("port-input").value;

  resolume = new Resolume(address, port);
}

function setup() {
  const presetSelectInput = document.querySelector("select[name='preset']");

  initResolume()
  populatePresets(resolume, presetSelectInput);

  document
    .getElementById("message-form")
    .addEventListener("submit", (event) => submitForm(event, resolume));
  document
    .getElementById("preset-refresh-button")
    .addEventListener("click", () => populatePresets(resolume, presetSelectInput));
}

setup();

document
  .getElementById("reconnect-button")
  .addEventListener("click", () => initResolume)
