# Cuarto Oscuro – Resolume Text

## Setup

1. Run Resolume on host machine and enable webserver. Instructions here: https://resolume.com/support/en/restapi#getting-started
2. Open this `index.html` in a browser on client machine.
2. Copy host machine's Resolume's webserver IP address and port into config dialog.

## Usage

Messages sent will create a Text Block source clip on the host's Resolume instance on the layer specified by the Layer Index and Clip Index options. When a message is sent, the clip index value will advance by 1 and the next clip will be create on that index. 

Text Block presets can be created on the host's Resolume instance to control styling and this client can select those presets for the initial styling of the created clips. 

Click refresh to update the list of available Text Block presets from the host machine. 


## TODO 

- Better error handling and msssages