import Logo from "../assets/pp_logo.png"
function Spinner() {
  return (
    <div className='spinner'>
      <h1>AI is loading tasks for your project...</h1>  
      <img src={Logo} alt="spinner"></img>
    </div>
 )
}

export default Spinner