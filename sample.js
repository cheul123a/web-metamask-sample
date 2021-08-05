

const ethEnabled = async () => {
    const connectText = document.getElementById("connectText");
    if (window.ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts'});
      
      connectText.innerText="Metamask connected"
      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [window.ethereum.selectedAddress, "latest"],
    });
    web3 = new Web3(window.ethereum);
    console.log(web3)
      stringBlanace = String(parseInt(balance, 16));
      let integer = stringBlanace.substring(0,stringBlanace.length-18);
      let decimal = stringBlanace.substring(stringBlanace.length-18);

      document.getElementById("balance").innerText = integer + "." + decimal;
      return true;
    }
    connectText.innerText="you dont have Metamask"
    return false;
}



const transferETH = async () => {
    const txhash = document.getElementById("txhash");
    const txStatus = document.getElementById("txStatus");
    const transactionParameters = {
        to: '0x7Eb5E8D4176E236E001384499b809DA872Ee07F2', // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: "0x2386F26FC10000", // Only required to send ether to the recipient from the initiating external account.
      };

      web3.eth.sendTransaction({
        from: window.ethereum.selectedAddress,
        to: "0x7Eb5E8D4176E236E001384499b809DA872Ee07F2",
        value: "0x2386F26FC10000"
     }).then((res)=>{
       console.log(res)
     })

      // const txHash = await ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [transactionParameters],
      // });
      

      txhash.innerText=txHash
      txStatus.innerHTML= `
      <div>status: <span id="statusText">PENDING</span> <button style="margin-left: 20px;" onclick="checkTx('${txHash}')">refresh</button></div>
      `
      checkTx(txHash)
}


const checkTx = async (tx) =>{
    const txstatus = await ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [tx],
    });

    if(txstatus.blockNumber !== null){
        document.getElementById("statusText").innerText= "DONE";
    }

    console.log(txstatus)
}