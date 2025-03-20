import ip from 'ip';

/** 
* Function to check if the client's IP address belongs to the local network.
    * @param { string } clientIPAddress - The IP address of the client connecting to the server.
 * @returns { boolean } - Returns true if the client is within the local network, otherwise false.
 */
export function isClientInLocalNetwork(clientIPAddress) {
    // Get the server's local IP (e.g., "192.168.1.10")
    const serverIPAddress = ip.address();

    // Extract the network prefix (e.g., "192.168.1") from the server IP.
    const serverNetworkPrefix = serverIPAddress.substring(0, serverIPAddress.lastIndexOf('.'));

    return clientIPAddress.startsWith(serverNetworkPrefix);
}