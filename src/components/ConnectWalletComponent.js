import {Chip} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import {useWeb3React} from "@web3-react/core";
import Button from "@mui/material/Button";
import {Injected, WalletConnectConfig} from "../constants/WalletConnectConfig";

export function ConnectWalletComponent() {
  const { activate, deactivate,active, account } = useWeb3React();
  console.log(active,account);
  const walletButtons = (<div><Button variant="outlined" onClick={()=>{
    activate(WalletConnectConfig).then(r =>  console.log(r)).catch(e=>console.log(e))}
  }>WalletConnect</Button><br/><Button color={"secondary"} onClick={()=>{
    activate(Injected).then(r =>  console.log(r)).catch(e=>console.log(e))}
  }>Metamask</Button></div>)
  const connectedChip = <Chip onClick={deactivate} variant="outlined" color="success" icon={<FaceIcon />} label={"Connected @"+account?.substring(0,6)+"..."}/>;
  const disconnectedChip = <Chip variant="outlined" color="warning" icon={<FaceIcon />} label={"Connected @"+account?.substring(0,6)+"..."}/>;
  return account ? (active?connectedChip : disconnectedChip) : walletButtons;
}
